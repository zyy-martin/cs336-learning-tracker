// Stanford CS336 Interactive Learning Tracker - Application Logic

let state = {
  version: "1.0",
  startDate: "2026-09-18",
  targetWeeks: 21,
  weeklyHoursTarget: 6,
  completedLectures: [],
  completedMilestones: [],
  completedSessions: [],
  lectureNotes: {},
  assignmentNotes: {},
  sessionLogs: [],
  updatedAt: new Date().toISOString()
};

let currentTab = "schedule";
let scheduleFilter = "all";
let activeNoteTarget = null; // { type: 'lecture' | 'assignment', id: string, title: string }

// Timer state
let timerSeconds = 2 * 60 * 60; // 2 hours default
let timerInterval = null;
let isTimerRunning = false;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  await loadProgress();
  renderAllViews();
  setupTimerUI();
  lucide.createIcons();
});

// -------------------------------------------------------------
// Data Persistence (Server API + localStorage Fallback)
// -------------------------------------------------------------

async function loadProgress() {
  try {
    const res = await fetch("/api/progress");
    if (res.ok) {
      const data = await res.json();
      state = { ...state, ...data };
      localStorage.setItem("cs336_progress_backup", JSON.stringify(state));
      updateSyncStatus(true, "Loaded from progress.json");
      return;
    }
  } catch (err) {
    console.warn("Could not load from /api/progress, checking localStorage:", err);
  }

  // Fallback to localStorage
  const localBackup = localStorage.getItem("cs336_progress_backup");
  if (localBackup) {
    try {
      state = { ...state, ...JSON.parse(localBackup) };
      updateSyncStatus(true, "Loaded from localStorage");
    } catch (e) {
      console.error("Failed to parse local backup", e);
    }
  }
}

async function saveProgress(showToastMsg = "Saved to progress.json") {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem("cs336_progress_backup", JSON.stringify(state));

  try {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
    if (res.ok) {
      updateSyncStatus(true, "Saved to progress.json");
    } else {
      updateSyncStatus(false, "Saved locally (server error)");
    }
  } catch (err) {
    console.warn("Could not save to /api/progress:", err);
    updateSyncStatus(false, "Saved locally only");
  }

  updateStats();
  if (showToastMsg) {
    showToast(showToastMsg);
  }
}

function updateSyncStatus(isSynced, text) {
  const syncStatus = document.getElementById("sync-status");
  if (!syncStatus) return;
  if (isSynced) {
    syncStatus.className = "flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800";
    syncStatus.innerHTML = `<i data-lucide="check-circle" class="w-3.5 h-3.5"></i><span class="font-medium">${text}</span>`;
  } else {
    syncStatus.className = "flex items-center space-x-1.5 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800";
    syncStatus.innerHTML = `<i data-lucide="alert-circle" class="w-3.5 h-3.5"></i><span class="font-medium">${text}</span>`;
  }
  lucide.createIcons();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0");
  }, 2500);
}

// -------------------------------------------------------------
// Overall Statistics & Progress Calculations
// -------------------------------------------------------------

function updateStats() {
  const totalLectures = CS336_DATA.lectures.length;
  const completedLecCount = (state.completedLectures || []).length;

  const totalMilestones = CS336_DATA.assignments.reduce((sum, a) => sum + a.milestones.length, 0);
  const completedMilestoneCount = (state.completedMilestones || []).length;

  // Calculate total hours invested based on completed sessions + manual logged hours
  const sessionHours = (state.completedSessions || []).length * 2.0;
  const loggedTimeHours = (state.sessionLogs || []).reduce((acc, log) => acc + (log.durationMinutes || 0) / 60, 0);
  const hoursDone = Math.max(sessionHours, loggedTimeHours);

  // Overall completion based on 63 total sessions (21 weeks * 3 sessions)
  const totalSessions = 21 * 3;
  const completedSessionsCount = (state.completedSessions || []).length;
  const overallPercent = Math.min(100, Math.round((completedSessionsCount / totalSessions) * 100));

  // Update DOM elements
  const percentEl = document.getElementById("stat-overall-percent");
  const barEl = document.getElementById("stat-overall-bar");
  const hoursEl = document.getElementById("stat-hours-done");
  const lecCountEl = document.getElementById("stat-lectures-done");
  const lecBarEl = document.getElementById("stat-lectures-bar");
  const assignCountEl = document.getElementById("stat-assignments-done");
  const assignBarEl = document.getElementById("stat-assignments-bar");

  if (percentEl) percentEl.textContent = `${overallPercent}%`;
  if (barEl) barEl.style.width = `${overallPercent}%`;
  if (hoursEl) hoursEl.textContent = `${hoursDone.toFixed(1)}`;

  if (lecCountEl) lecCountEl.textContent = `${completedLecCount}`;
  if (lecBarEl) lecBarEl.style.width = `${Math.round((completedLecCount / totalLectures) * 100)}%`;

  // Count assignments where all milestones are completed
  const fullyCompletedAssignments = CS336_DATA.assignments.filter(a =>
    a.milestones.every(m => (state.completedMilestones || []).includes(m.id))
  ).length;

  if (assignCountEl) assignCountEl.textContent = `${fullyCompletedAssignments}`;
  if (assignBarEl) assignBarEl.style.width = `${Math.round((completedMilestoneCount / totalMilestones) * 100)}%`;
}

// -------------------------------------------------------------
// Tabs Navigation
// -------------------------------------------------------------

function switchTab(tabId) {
  currentTab = tabId;

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.className = "tab-btn active flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold bg-rose-50 dark:bg-rose-950/60 text-stanford-cardinal dark:text-rose-300 transition";
    } else {
      btn.className = "tab-btn flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition";
    }
  });

  // Toggle content sections
  document.querySelectorAll(".tab-content").forEach(sec => {
    sec.classList.add("hidden");
  });
  const targetSection = document.getElementById(`tab-${tabId}`);
  if (targetSection) {
    targetSection.classList.remove("hidden");
  }

  // Refresh dynamic contents on switch
  if (tabId === "notes") renderAggregatedNotes();
  if (tabId === "timer") renderSessionLogs();

  lucide.createIcons();
}

// -------------------------------------------------------------
// TAB 1: Weekly Study Roadmap (21 Weeks, 3 Sessions/Week)
// -------------------------------------------------------------

function renderSchedule() {
  const container = document.getElementById("schedule-container");
  if (!container) return;

  const weeks = CS336_DATA.studyPlan;
  let html = "";
  let visibleCount = 0;

  weeks.forEach((w) => {
    const isWeekCompleted = w.sessions.every(s => (state.completedSessions || []).includes(s.id));
    
    // Apply filter
    if (scheduleFilter === "completed" && !isWeekCompleted) return;
    if (scheduleFilter === "pending" && isWeekCompleted) return;
    visibleCount++;

    const completedInWeek = w.sessions.filter(s => (state.completedSessions || []).includes(s.id)).length;
    const weekPercent = Math.round((completedInWeek / w.sessions.length) * 100);

    html += `
      <div class="bg-white dark:bg-slate-800 rounded-2xl border ${isWeekCompleted ? 'border-emerald-300 dark:border-emerald-800' : 'border-slate-200 dark:border-slate-700'} shadow-sm overflow-hidden transition">
        <!-- Week Header Accordion -->
        <div onclick="toggleWeekAccordion(${w.week})" class="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition">
          <div class="flex items-center space-x-3 sm:space-x-4 flex-1 pr-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${isWeekCompleted ? 'bg-emerald-500 text-white' : 'bg-rose-100 dark:bg-rose-950/60 text-stanford-cardinal dark:text-rose-300'}">
              ${isWeekCompleted ? '<i data-lucide="check" class="w-5 h-5"></i>' : `W${w.week}`}
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="font-bold text-base text-slate-900 dark:text-white">Week ${w.week}: ${escapeHtml(w.title)}</h3>
                <span class="text-xs px-2 py-0.5 rounded-full ${isWeekCompleted ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}">
                  ${completedInWeek}/${w.sessions.length} done
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${escapeHtml(w.focus)}</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="hidden sm:block text-right">
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">6 Hours</span>
              <div class="w-24 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-1 overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full transition-all duration-300" style="width: ${weekPercent}%"></div>
              </div>
            </div>
            <i data-lucide="chevron-down" id="week-chevron-${w.week}" class="w-5 h-5 text-slate-400 transform transition-transform duration-200"></i>
          </div>
        </div>

        <!-- Sessions Container -->
        <div id="week-content-${w.week}" class="border-t border-slate-100 dark:border-slate-700/60 divide-y divide-slate-100 dark:divide-slate-700/60 bg-slate-50/50 dark:bg-slate-900/30">
          ${w.sessions.map((session, idx) => {
            const isDone = (state.completedSessions || []).includes(session.id);
            return `
              <div class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${isDone ? 'bg-emerald-50/30 dark:bg-emerald-950/10' : ''}">
                <div class="flex items-start space-x-3 flex-1">
                  <!-- Checkbox -->
                  <button onclick="toggleSession('${session.id}')" class="mt-1 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition ${isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600 hover:border-stanford-cardinal bg-white dark:bg-slate-800'}">
                    ${isDone ? '<i data-lucide="check" class="w-4 h-4"></i>' : ''}
                  </button>

                  <div class="flex-1">
                    <div class="flex flex-wrap items-center gap-2">
                      <span class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${session.type === 'weekend' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'}">
                        ${session.dayName} (2 hrs)
                      </span>
                      <h4 class="font-bold text-sm ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}">
                        ${escapeHtml(session.topic)}
                      </h4>
                    </div>
                    <p class="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      ${escapeHtml(session.description)}
                    </p>

                    <!-- Links & Actions -->
                    <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      ${session.links.map(l => `
                        <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-stanford-cardinal dark:hover:text-rose-400 hover:border-stanford-cardinal transition">
                          <span>${escapeHtml(l.text)}</span>
                          <i data-lucide="external-link" class="w-3 h-3"></i>
                        </a>
                      `).join('')}

                      ${getVideoForSession(session) ? `
                        <button onclick="openVideoModal('${getVideoForSession(session).youtubeId}', '${escapeHtml(getVideoForSession(session).title)}')" class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/50 text-stanford-cardinal dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-medium hover:bg-rose-100 transition">
                          <i data-lucide="play" class="w-3 h-3"></i>
                          <span>Watch Video</span>
                        </button>
                      ` : ''}

                      <button onclick="openQuickNotes('session', '${session.id}', '${escapeHtml(session.topic)}')" class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                        <i data-lucide="file-text" class="w-3 h-3"></i>
                        <span>${state.lectureNotes[session.id] ? 'Edit Notes' : 'Add Notes'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Session status pill -->
                <div class="text-right sm:self-center">
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${isDone ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200/70 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}">
                    ${isDone ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  const counterEl = document.getElementById("schedule-counter");
  if (counterEl) counterEl.textContent = `Showing ${visibleCount} of ${weeks.length} weeks`;
  lucide.createIcons();
}

function getVideoForSession(session) {
  const match = session.links.find(l => l.text.includes("Video"));
  if (!match) return null;
  const lectureMatch = session.topic.match(/Lecture\s+(\d+)/i);
  if (!lectureMatch) return null;
  const lecNum = parseInt(lectureMatch[1], 10);
  return CS336_DATA.lectures.find(l => l.number === lecNum);
}

function toggleWeekAccordion(weekNum) {
  const content = document.getElementById(`week-content-${weekNum}`);
  const chevron = document.getElementById(`week-chevron-${weekNum}`);
  if (!content) return;

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    if (chevron) chevron.style.transform = "rotate(0deg)";
  } else {
    content.classList.add("hidden");
    if (chevron) chevron.style.transform = "rotate(-90deg)";
  }
}

function toggleAllWeeks(expand) {
  CS336_DATA.studyPlan.forEach(w => {
    const content = document.getElementById(`week-content-${w.week}`);
    const chevron = document.getElementById(`week-chevron-${w.week}`);
    if (content) {
      if (expand) {
        content.classList.remove("hidden");
        if (chevron) chevron.style.transform = "rotate(0deg)";
      } else {
        content.classList.add("hidden");
        if (chevron) chevron.style.transform = "rotate(-90deg)";
      }
    }
  });
}

function filterSchedule(filter) {
  scheduleFilter = filter;
  document.querySelectorAll(".schedule-filter-btn").forEach(btn => {
    if (btn.dataset.filter === filter) {
      btn.className = "schedule-filter-btn px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white";
    } else {
      btn.className = "schedule-filter-btn px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700";
    }
  });
  renderSchedule();
}

function toggleSession(sessionId) {
  if (!state.completedSessions) state.completedSessions = [];
  const idx = state.completedSessions.indexOf(sessionId);
  if (idx > -1) {
    state.completedSessions.splice(idx, 1);
  } else {
    state.completedSessions.push(sessionId);
  }
  saveProgress("Updated weekly session status");
  renderSchedule();
}

// -------------------------------------------------------------
// TAB 2: Lectures Hub (19 Lectures)
// -------------------------------------------------------------

function renderLectures() {
  const container = document.getElementById("lectures-grid");
  if (!container) return;

  const searchQuery = (document.getElementById("lecture-search")?.value || "").toLowerCase().trim();

  const filteredLectures = CS336_DATA.lectures.filter(lec => {
    if (!searchQuery) return true;
    return (
      lec.title.toLowerCase().includes(searchQuery) ||
      lec.speaker.toLowerCase().includes(searchQuery) ||
      lec.topics.some(t => t.toLowerCase().includes(searchQuery))
    );
  });

  if (filteredLectures.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2"></i>
        <p class="text-sm">No lectures found matching "${escapeHtml(searchQuery)}"</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filteredLectures.map(lec => {
    const isDone = (state.completedLectures || []).includes(lec.id);
    const hasNotes = !!state.lectureNotes[lec.id];

    return `
      <div class="bg-white dark:bg-slate-800 rounded-2xl border ${isDone ? 'border-emerald-300 dark:border-emerald-800' : 'border-slate-200 dark:border-slate-700'} p-5 flex flex-col justify-between shadow-sm card-hover smooth-transition">
        <div>
          <!-- Header Badge & Status -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-stanford-cardinal dark:text-rose-300 font-extrabold text-xs flex items-center justify-center">
                ${lec.number}
              </span>
              <span class="text-xs text-slate-500 dark:text-slate-400">${lec.date}</span>
            </div>
            <button onclick="toggleLecture('${lec.id}')" class="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${isDone ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}">
              <i data-lucide="${isDone ? 'check-circle-2' : 'circle'}" class="w-3.5 h-3.5"></i>
              <span>${isDone ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>

          <!-- Title & Speaker -->
          <h3 class="font-bold text-base mt-3 text-slate-900 dark:text-white leading-snug">
            ${escapeHtml(lec.title)}
          </h3>
          <p class="text-xs text-rose-700 dark:text-rose-400 font-semibold mt-1 flex items-center space-x-1">
            <i data-lucide="user" class="w-3.5 h-3.5"></i>
            <span>${escapeHtml(lec.speaker)}</span>
            <span class="text-slate-400 font-normal ml-2">(${lec.duration})</span>
          </p>

          <!-- Topics List -->
          <div class="mt-3 space-y-1">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Key Concepts:</span>
            <ul class="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              ${lec.topics.slice(0, 3).map(t => `<li class="flex items-start space-x-1.5"><span class="text-stanford-cardinal mt-0.5">•</span><span>${escapeHtml(t)}</span></li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex items-center space-x-2">
            ${lec.youtubeId ? `
              <button onclick="openVideoModal('${lec.youtubeId}', 'Lecture ${lec.number}: ${escapeHtml(lec.title)}')" class="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium flex items-center space-x-1 shadow-sm transition">
                <i data-lucide="play" class="w-3 h-3"></i>
                <span>Watch</span>
              </button>
            ` : ''}

            ${lec.materials.map(m => `
              <a href="${m.url}" target="_blank" rel="noopener noreferrer" class="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium flex items-center space-x-1 transition">
                <span>${m.type === 'pdf' ? 'Slides' : 'Trace'}</span>
                <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            `).join('')}
          </div>

          <button onclick="openQuickNotes('lecture', '${lec.id}', 'Lecture ${lec.number}: ${escapeHtml(lec.title)}')" class="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition" title="Lecture Notes">
            <i data-lucide="file-text" class="w-4 h-4 ${hasNotes ? 'text-stanford-cardinal dark:text-rose-400' : ''}"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function toggleLecture(lecId) {
  if (!state.completedLectures) state.completedLectures = [];
  const idx = state.completedLectures.indexOf(lecId);
  if (idx > -1) {
    state.completedLectures.splice(idx, 1);
  } else {
    state.completedLectures.push(lecId);
  }
  saveProgress("Updated lecture status");
  renderLectures();
}

// -------------------------------------------------------------
// TAB 3: Assignments Hub (5 Coding Assignments)
// -------------------------------------------------------------

function renderAssignments() {
  const container = document.getElementById("assignments-list");
  if (!container) return;

  container.innerHTML = CS336_DATA.assignments.map(a => {
    const completedMilestones = a.milestones.filter(m => (state.completedMilestones || []).includes(m.id)).length;
    const isAllDone = completedMilestones === a.milestones.length;
    const percent = Math.round((completedMilestones / a.milestones.length) * 100);

    return `
      <div class="bg-white dark:bg-slate-800 rounded-2xl border ${isAllDone ? 'border-emerald-300 dark:border-emerald-800' : 'border-slate-200 dark:border-slate-700'} p-6 shadow-sm space-y-5 transition">
        <!-- Top Title & Links -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2">
              <span class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-extrabold text-sm flex items-center justify-center">
                A${a.number}
              </span>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">${escapeHtml(a.title)}</h3>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${isAllDone ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}">
                ${isAllDone ? 'Complete' : `${completedMilestones}/${a.milestones.length} Milestones`}
              </span>
            </div>
            <p class="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">${escapeHtml(a.tagline)}</p>
          </div>

          <!-- Links to GitHub & Handout PDF -->
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <a href="${a.repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold hover:opacity-90 shadow-sm transition">
              <i data-lucide="github" class="w-3.5 h-3.5"></i>
              <span>GitHub Repo</span>
            </a>
            <a href="${a.pdfUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-stanford-cardinal dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-semibold hover:bg-rose-100 transition">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              <span>PDF Handout</span>
            </a>
            ${a.supplementPdfUrl ? `
              <a href="${a.supplementPdfUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 transition">
                <span>Part 2 Supplement</span>
                <i data-lucide="external-link" class="w-3 h-3"></i>
              </a>
            ` : ''}
          </div>
        </div>

        <!-- Compute specs info pill -->
        <div class="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-750 flex items-center justify-between text-xs">
          <div class="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
            <i data-lucide="cpu" class="w-4 h-4 text-amber-500"></i>
            <span><strong>Compute Requirement:</strong> ${escapeHtml(a.computeRequirements)}</span>
          </div>
          <span class="font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">Est. ~${a.estimatedHours} hrs</span>
        </div>

        <!-- Milestones Breakdown Checklist -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Implementation Milestones
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${a.milestones.map(m => {
              const isDone = (state.completedMilestones || []).includes(m.id);
              return `
                <div class="p-3.5 rounded-xl border ${isDone ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' : 'bg-white dark:bg-slate-750 border-slate-200 dark:border-slate-700'} flex items-start space-x-3 transition">
                  <button onclick="toggleMilestone('${m.id}')" class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition ${isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-stanford-cardinal'}">
                    ${isDone ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                  </button>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs ${isDone ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}">
                        ${escapeHtml(m.name)}
                      </span>
                      <span class="text-[11px] font-semibold text-slate-400">${m.hours}h</span>
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      ${escapeHtml(m.desc)}
                    </p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Notes for this assignment -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
          <span class="text-slate-500 dark:text-slate-400">
            ${state.assignmentNotes[a.id] ? 'Notes logged for this assignment' : 'No notes added yet'}
          </span>
          <button onclick="openQuickNotes('assignment', '${a.id}', '${escapeHtml(a.title)}')" class="inline-flex items-center space-x-1 text-stanford-cardinal dark:text-rose-400 font-semibold hover:underline">
            <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            <span>${state.assignmentNotes[a.id] ? 'View / Edit Assignment Notes' : 'Add Assignment Notes'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function toggleMilestone(milestoneId) {
  if (!state.completedMilestones) state.completedMilestones = [];
  const idx = state.completedMilestones.indexOf(milestoneId);
  if (idx > -1) {
    state.completedMilestones.splice(idx, 1);
  } else {
    state.completedMilestones.push(milestoneId);
  }
  saveProgress("Updated assignment milestone");
  renderAssignments();
}

// -------------------------------------------------------------
// TAB 4: Session Focus Timer (2-Hour Blocks)
// -------------------------------------------------------------

function setupTimerUI() {
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;
  const str = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const disp = document.getElementById("timer-display");
  const headerDisp = document.getElementById("header-timer-display");
  if (disp) disp.textContent = str;
  if (headerDisp) headerDisp.textContent = str;
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  document.getElementById("timer-start-btn")?.classList.add("hidden");
  document.getElementById("timer-pause-btn")?.classList.remove("hidden");
  const statusEl = document.getElementById("timer-status-text");
  if (statusEl) statusEl.textContent = "Session In Progress • Stay Focused";

  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      pauseTimer();
      alert("Congratulations! Your study session is complete. Log your progress below!");
    }
  }, 1000);
}

function pauseTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
  document.getElementById("timer-pause-btn")?.classList.add("hidden");
  document.getElementById("timer-start-btn")?.classList.remove("hidden");
  const statusEl = document.getElementById("timer-status-text");
  if (statusEl) statusEl.textContent = "Paused";
}

function resetTimer(minutes = 120) {
  pauseTimer();
  timerSeconds = minutes * 60;
  updateTimerDisplay();
  const statusEl = document.getElementById("timer-status-text");
  if (statusEl) statusEl.textContent = "Ready to Focus";
}

function logCurrentSession() {
  const input = document.getElementById("session-log-input");
  const notes = (input?.value || "").trim();
  if (!notes) {
    alert("Please enter a short summary of what you studied!");
    return;
  }

  if (!state.sessionLogs) state.sessionLogs = [];
  const logEntry = {
    id: `log-${Date.now()}`,
    date: new Date().toLocaleDateString(),
    timestamp: new Date().toISOString(),
    durationMinutes: 120,
    notes: notes
  };
  state.sessionLogs.unshift(logEntry);

  if (input) input.value = "";
  saveProgress("Logged study session");
  renderSessionLogs();
}

function renderSessionLogs() {
  const list = document.getElementById("session-logs-list");
  const countEl = document.getElementById("session-logs-count");
  if (!list) return;

  const logs = state.sessionLogs || [];
  if (countEl) countEl.textContent = `${logs.length} logged`;

  if (logs.length === 0) {
    list.innerHTML = `
      <div class="py-6 text-center text-slate-400 text-xs">
        No sessions logged yet. Hit start above, focus for 2 hours, and record your accomplishments!
      </div>
    `;
    return;
  }

  list.innerHTML = logs.map(l => `
    <div class="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
          +2h
        </span>
        <div>
          <p class="font-semibold text-slate-800 dark:text-slate-200 text-xs">${escapeHtml(l.notes)}</p>
          <span class="text-[10px] text-slate-400">${l.date}</span>
        </div>
      </div>
      <button onclick="deleteSessionLog('${l.id}')" class="p-1 text-slate-400 hover:text-rose-500 transition" title="Delete log">
        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
      </button>
    </div>
  `).join('');

  lucide.createIcons();
}

function deleteSessionLog(logId) {
  if (!confirm("Remove this session log?")) return;
  state.sessionLogs = (state.sessionLogs || []).filter(l => l.id !== logId);
  saveProgress("Session log removed");
  renderSessionLogs();
}

// -------------------------------------------------------------
// TAB 5: Aggregated Notes & Journal
// -------------------------------------------------------------

function renderAggregatedNotes() {
  const container = document.getElementById("notes-aggregated-container");
  if (!container) return;

  const allNotes = [];

  // Lecture notes
  Object.keys(state.lectureNotes || {}).forEach(k => {
    const text = state.lectureNotes[k];
    if (text && text.trim()) {
      const lec = CS336_DATA.lectures.find(l => l.id === k);
      const title = lec ? `Lecture ${lec.number}: ${lec.title}` : `Session Note (${k})`;
      allNotes.push({ id: k, type: "lecture", title, text });
    }
  });

  // Assignment notes
  Object.keys(state.assignmentNotes || {}).forEach(k => {
    const text = state.assignmentNotes[k];
    if (text && text.trim()) {
      const a = CS336_DATA.assignments.find(item => item.id === k);
      const title = a ? a.title : `Assignment Note (${k})`;
      allNotes.push({ id: k, type: "assignment", title, text });
    }
  });

  if (allNotes.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400 text-xs">
        <i data-lucide="book-open" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
        <p>You haven't written any notes yet.</p>
        <p class="mt-1">Click the "Notes" button on any lecture or assignment to jot down equations, takeaways, and code snippets!</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = allNotes.map(n => `
    <div class="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${n.type === 'assignment' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'bg-rose-100 text-stanford-cardinal dark:bg-rose-950 dark:text-rose-300'}">
          ${n.type}
        </span>
        <button onclick="openQuickNotes('${n.type}', '${n.id}', '${escapeHtml(n.title)}')" class="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-semibold flex items-center space-x-1">
          <i data-lucide="edit" class="w-3.5 h-3.5"></i>
          <span>Edit</span>
        </button>
      </div>
      <h4 class="font-bold text-sm text-slate-900 dark:text-white">${escapeHtml(n.title)}</h4>
      <div class="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
        ${escapeHtml(n.text)}
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function exportAllNotesMarkdown() {
  let md = `# Stanford CS336: Language Modeling from Scratch - Study Notes\n\n`;
  md += `*Exported on ${new Date().toLocaleDateString()}*\n\n---\n\n`;

  md += `## Lectures Notes\n\n`;
  CS336_DATA.lectures.forEach(l => {
    const note = state.lectureNotes[l.id];
    if (note && note.trim()) {
      md += `### Lecture ${l.number}: ${l.title} (${l.speaker})\n\n${note.trim()}\n\n---\n\n`;
    }
  });

  md += `## Assignments Notes\n\n`;
  CS336_DATA.assignments.forEach(a => {
    const note = state.assignmentNotes[a.id];
    if (note && note.trim()) {
      md += `### ${a.title}\n\n${note.trim()}\n\n---\n\n`;
    }
  });

  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cs336-study-notes-${new Date().toISOString().split('T')[0]}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

// -------------------------------------------------------------
// Modals (Video Player & Notes Drawer)
// -------------------------------------------------------------

function openVideoModal(videoId, title) {
  const modal = document.getElementById("video-modal");
  const iframe = document.getElementById("video-iframe");
  const titleEl = document.getElementById("video-modal-title");
  const extLink = document.getElementById("video-modal-external-link");

  if (!modal || !iframe) return;

  titleEl.textContent = title;
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  extLink.href = `https://www.youtube.com/watch?v=${videoId}`;

  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeVideoModal() {
  const modal = document.getElementById("video-modal");
  const iframe = document.getElementById("video-iframe");
  if (modal) modal.classList.add("hidden");
  if (iframe) iframe.src = "";
}

function openQuickNotes(type, id, title) {
  activeNoteTarget = { type, id, title };

  const modal = document.getElementById("notes-modal");
  const titleEl = document.getElementById("notes-modal-title");
  const tagEl = document.getElementById("notes-modal-tag");
  const textarea = document.getElementById("notes-modal-textarea");

  if (!modal || !textarea) return;

  titleEl.textContent = title;
  tagEl.textContent = type.toUpperCase();

  if (type === "lecture" || type === "session") {
    textarea.value = state.lectureNotes[id] || "";
  } else if (type === "assignment") {
    textarea.value = state.assignmentNotes[id] || "";
  }

  modal.classList.remove("hidden");
  textarea.focus();
  lucide.createIcons();
}

function closeNotesModal() {
  const modal = document.getElementById("notes-modal");
  if (modal) modal.classList.add("hidden");
  activeNoteTarget = null;
}

function saveCurrentNote() {
  if (!activeNoteTarget) return;
  const textarea = document.getElementById("notes-modal-textarea");
  const content = textarea?.value || "";

  if (activeNoteTarget.type === "lecture" || activeNoteTarget.type === "session") {
    if (!state.lectureNotes) state.lectureNotes = {};
    state.lectureNotes[activeNoteTarget.id] = content;
  } else if (activeNoteTarget.type === "assignment") {
    if (!state.assignmentNotes) state.assignmentNotes = {};
    state.assignmentNotes[activeNoteTarget.id] = content;
  }

  saveProgress("Notes saved to progress.json");
  closeNotesModal();

  if (currentTab === "lectures") renderLectures();
  if (currentTab === "assignments") renderAssignments();
  if (currentTab === "notes") renderAggregatedNotes();
}

// -------------------------------------------------------------
// Settings: Backup & Restore
// -------------------------------------------------------------

function downloadProgressJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `cs336-progress-backup-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importProgressJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (confirm("Restore progress from this file? This will overwrite existing tracking state.")) {
        state = { ...state, ...imported };
        await saveProgress("Progress restored from backup file");
        renderAllViews();
      }
    } catch (err) {
      alert("Invalid JSON file format!");
    }
  };
  reader.readAsText(file);
}

async function confirmResetProgress() {
  if (!confirm("Are you sure you want to reset your CS336 study progress? This will reset checked lessons and milestones to 0.")) {
    return;
  }

  try {
    const res = await fetch("/api/reset", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      state = data.data;
      localStorage.setItem("cs336_progress_backup", JSON.stringify(state));
      renderAllViews();
      showToast("Progress has been reset (backup created)");
    }
  } catch (e) {
    console.error("Reset failed", e);
  }
}

// -------------------------------------------------------------
// Helpers & Initial Render
// -------------------------------------------------------------

function renderAllViews() {
  updateStats();
  renderSchedule();
  renderLectures();
  renderAssignments();
  renderAggregatedNotes();
  renderSessionLogs();
  lucide.createIcons();
}

function initTheme() {
  const isDark = localStorage.getItem("cs336_theme") === "dark" ||
    (!localStorage.getItem("cs336_theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const darkNow = document.documentElement.classList.contains("dark");
    localStorage.setItem("cs336_theme", darkNow ? "dark" : "light");
    lucide.createIcons();
  });
}

function escapeHtml(text) {
  if (!text) return "";
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}
