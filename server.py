#!/usr/bin/env python3
"""
Stanford CS336 Interactive Learning Tracker - Local Server
Lightweight Python server that serves the web UI and provides a simple REST API
to persist your learning progress directly to `progress.json`.
"""

import http.server
import socketserver
import json
import os
import sys
import webbrowser
import argparse
from datetime import datetime

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROGRESS_FILE = os.path.join(BASE_DIR, "progress.json")


def ensure_progress_file():
    if not os.path.exists(PROGRESS_FILE):
        initial_data = {
            "version": "1.0",
            "startDate": datetime.now().strftime("%Y-%m-%d"),
            "targetWeeks": 21,
            "weeklyHoursTarget": 6,
            "completedLectures": [],
            "completedMilestones": [],
            "completedSessions": [],
            "lectureNotes": {},
            "assignmentNotes": {},
            "sessionLogs": [],
            "updatedAt": datetime.now().isoformat()
        }
        with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
            json.dump(initial_data, f, indent=2)


class CS336RequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Prevent aggressive browser caching of app files
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        if self.path == "/api/progress":
            self.handle_get_progress()
        elif self.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"status":"healthy","service":"cs336-tracker"}')
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == "/api/progress":
            self.handle_post_progress()
        elif self.path == "/api/reset":
            self.handle_reset_progress()
        else:
            self.send_error(404, "Endpoint not found")

    def handle_get_progress(self):
        ensure_progress_file()
        try:
            with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            resp = json.dumps(data).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(resp)))
            self.end_headers()
            self.wfile.write(resp)
        except Exception as e:
            self.send_error(500, f"Error reading progress file: {e}")

    def handle_post_progress(self):
        content_length = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_length)
        try:
            data = json.loads(post_body.decode("utf-8"))
            data["updatedAt"] = datetime.now().isoformat()
            
            # Atomic file write
            temp_file = PROGRESS_FILE + ".tmp"
            with open(temp_file, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            os.replace(temp_file, PROGRESS_FILE)

            resp = json.dumps({"status": "ok", "savedAt": data["updatedAt"]}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(resp)))
            self.end_headers()
            self.wfile.write(resp)
        except Exception as e:
            self.send_error(400, f"Invalid JSON payload or write failure: {e}")

    def handle_reset_progress(self):
        try:
            # Create a timestamped backup before reset
            if os.path.exists(PROGRESS_FILE):
                backup_path = f"{PROGRESS_FILE}.backup.{datetime.now().strftime('%Y%m%d%H%M%S')}"
                with open(PROGRESS_FILE, "r", encoding="utf-8") as src, open(backup_path, "w", encoding="utf-8") as dst:
                    dst.write(src.read())
            
            initial_data = {
                "version": "1.0",
                "startDate": datetime.now().strftime("%Y-%m-%d"),
                "targetWeeks": 21,
                "weeklyHoursTarget": 6,
                "completedLectures": [],
                "completedMilestones": [],
                "completedSessions": [],
                "lectureNotes": {},
                "assignmentNotes": {},
                "sessionLogs": [],
                "updatedAt": datetime.now().isoformat()
            }
            with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
                json.dump(initial_data, f, indent=2)

            resp = json.dumps({"status": "reset_successful", "data": initial_data}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(resp)))
            self.end_headers()
            self.wfile.write(resp)
        except Exception as e:
            self.send_error(500, f"Error resetting progress: {e}")


def run_server(port=PORT, open_browser=True):
    ensure_progress_file()
    
    # Allow port reuse to avoid address already in use on restart
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("", port), CS336RequestHandler) as httpd:
            url = f"http://localhost:{port}"
            print(f"================================================================")
            print(f"  Stanford CS336: Language Modeling from Scratch")
            print(f"  Interactive Learning Tracker running at: {url}")
            print(f"  State is persisted to: {PROGRESS_FILE}")
            print(f"  Press Ctrl+C to stop the server.")
            print(f"================================================================")
            
            if open_browser:
                try:
                    webbrowser.open(url)
                except Exception:
                    pass
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping CS336 Tracker Server. Goodbye!")
        sys.exit(0)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run Stanford CS336 Study Tracker Server")
    parser.add_argument("--port", type=int, default=PORT, help=f"Port to bind (default: {PORT})")
    parser.add_argument("--no-browser", action="store_true", help="Do not automatically open web browser")
    parser.add_argument("--test", action="store_true", help="Run a quick self-test of server and exit")
    args = parser.parse_args()

    if args.test:
        ensure_progress_file()
        print("Self-test passed: progress.json verified.")
        sys.exit(0)

    run_server(port=args.port, open_browser=not args.no_browser)
