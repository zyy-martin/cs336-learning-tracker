# Stanford CS336: Language Modeling from Scratch — Interactive Study Hub & Progress Tracker

> **Stanford University • Spring 2026**  
> Instructors: **Percy Liang** & **Tatsunori Hashimoto**  
> Official Course Site: [cs336.stanford.edu](https://cs336.stanford.edu/)  
> Official YouTube Playlist: [CS336 Spring 2026 Playlist](https://www.youtube.com/watch?v=JuoVZkPBiKk&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV)

An interactive, lightweight local web application and structured study roadmap to master Stanford's flagship graduate course **CS336: Language Modeling from Scratch**.

---

## Features

- **Personalized 21-Week Study Roadmap**: Specifically tailored to **6 hours/week** (2 weekdays + 1 weekend day, 2 hours per session).
- **All 19 Lectures Indexed**: Direct links to official YouTube recordings, code traces (`lecture_*.py`), and slide PDFs. Includes an inline video player modal.
- **5 Hands-On Assignments Hub**: Direct links to starter code repositories, PDF specifications, and sub-milestone checklists (BPE tokenizer, RoPE, RMSNorm, Triton FlashAttention-2, DDP, Scaling Laws, Data Engineering, and Reasoning RLVR).
- **2-Hour Focus Timer**: Built-in session countdown timer matched to your 2-hour daily study block with instant session logging.
- **Minimal Local State Tracking (`progress.json`)**: All checkbox states, completion metrics, session logs, and personal notes persist directly to `progress.json` on your machine via a lightweight Python server (and syncs to `localStorage`).
- **Zero Heavy Dependencies**: Runs with standard Python 3 (`python3 server.py`) or directly in any web browser.

---

## Quick Start

### 1. Launch the Local Web App

In your terminal:

```bash
cd /Users/martin/Documents/projects/learn
python3 server.py
```

This starts the lightweight local server and automatically opens:
👉 **`http://localhost:8000`**

*(Alternatively, you can also double-click `index.html` to run locally via `localStorage`.)*

### 2. Save Your Progress to GitHub

Whenever you complete lessons or take notes, progress is saved to `progress.json`. You can commit your study journey to Git:

```bash
git add progress.json
git commit -m "Study log: Completed Week 1 & BPE Tokenizer"
git push
```

---

## 21-Week Study Plan (6 Hours / Week)

Based on your available schedule of **2 weekdays (2h each) + 1 weekend day (2h) = 3 sessions/week (6h/week)**:

| Module | Weeks | Focus Topics & Milestones | Est. Hours |
|---|---|---|---|
| **Module 1: Foundations & Architecture** | Weeks 1 – 5 | Tokenization (BPE), PyTorch einops, RoPE, SwiGLU, Multi-Head / GQA, AdamW, **Assignment 1: Basics** | 30 hrs |
| **Module 2: Systems & GPU Acceleration** | Weeks 6 – 10 | GPU/TPU architecture, PyTorch profiler, OpenAI Triton kernels, FlashAttention-2, DDP, **Assignment 2: Systems** | 30 hrs |
| **Module 3: Empirical Scaling Laws** | Weeks 11 – 12 | Kaplan & Chinchilla power laws, transformer FLOPs, compute-optimal frontiers, **Assignment 3: Scaling** | 12 hrs |
| **Module 4: Pretraining Data Engineering** | Weeks 13 – 15 | Common Crawl WARC/WET, FastText LID, Gopher/C4 quality filters, MinHash LSH deduplication, **Assignment 4: Data** | 18 hrs |
| **Module 5: Post-Training & Reasoning RL** | Weeks 16 – 19 | SFT, Bradley-Terry reward models, Reasoning RL with Verifiable Rewards (RLVR / GRPO), **Assignment 5: Alignment** | 24 hrs |
| **Module 6: Frontier Architectures & Synthesis** | Weeks 20 – 21 | Lean 4 formal reasoning, Sub-quadratic models (SSM/Mamba), Capstone portfolio showcase | 12 hrs |
| **Total** | **21 Weeks** | **19 Lectures + 5 Assignments + Capstone Portfolio** | **126 hrs** |

---

## Lectures Overview

| # | Date | Title | Speaker | Materials | Video |
|---|---|---|---|---|---|
| **1** | Mon Mar 30 | Overview, Tokenization | Percy Liang | [lecture_01.py trace](https://cs336.stanford.edu/lectures/?trace=lecture_01) | [Watch (1h 19m)](https://www.youtube.com/watch?v=JuoVZkPBiKk&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **2** | Wed Apr 1 | PyTorch (einops), Resource Accounting | Percy Liang | [lecture_02.py trace](https://cs336.stanford.edu/lectures/?trace=lecture_02) | [Watch (1h 17m)](https://www.youtube.com/watch?v=kuYAsz7zspQ&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **3** | Mon Apr 6 | Architectures, Hyperparameters | Tatsu Hashimoto | [lecture_03.pdf](https://github.com/stanford-cs336/lectures/blob/main/lecture_03.pdf) | [Watch (1h 29m)](https://www.youtube.com/watch?v=lVynu4bo1rY&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **4** | Wed Apr 8 | Attention Alternatives & MoE | Tatsu Hashimoto | [lecture_04.pdf](https://github.com/stanford-cs336/lectures/blob/main/lecture_04.pdf) | [Watch (1h 26m)](https://www.youtube.com/watch?v=cKSwj_qZ8Jg&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **5** | Mon Apr 13 | Hardware Systems: GPUs & TPUs | Tatsu Hashimoto | [lecture_05.pdf](https://github.com/stanford-cs336/lectures/blob/main/lecture_05.pdf) | [Watch (1h 18m)](https://www.youtube.com/watch?v=izZba4UA7iY&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **6** | Wed Apr 15 | Kernels & Triton | Percy Liang | [lecture_06.py trace](https://cs336.stanford.edu/lectures/?trace=lecture_06) | [Watch (1h 26m)](https://www.youtube.com/watch?v=xnDHaNUvHBg&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **7** | Mon Apr 20 | Distributed Training: Parallelism (Part 1) | Percy Liang | [lecture_07.py trace](https://cs336.stanford.edu/lectures/?trace=lecture_07) | [Watch (1h 21m)](https://www.youtube.com/watch?v=SzpOcwdIL0Y&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **8** | Wed Apr 22 | Distributed Training: Parallelism (Part 2) | Tatsu Hashimoto | [lecture_08.pdf](https://github.com/stanford-cs336/lectures/blob/main/lecture_08.pdf) | [Watch (1h 20m)](https://www.youtube.com/watch?v=6-cXp-aOmdg&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **9** | Mon Apr 27 | Empirical Scaling Laws (Part 1) | Tatsu Hashimoto | [lecture_09.pdf](https://github.com/stanford-cs336/lectures/blob/main/lecture_09.pdf) | [Watch (1h 18m)](https://www.youtube.com/watch?v=Q15rhEWZPQ4&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **10** | Wed Apr 29 | Inference Systems & Serving | Percy Liang | [lecture_10.py trace](https://cs336.stanford.edu/lectures/?trace=lecture_10) | [Watch (1h 25m)](https://www.youtube.com/watch?v=EfM546A79aM&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **11** | Mon May 4 | Scaling Laws & Emergence (Part 2) | Tatsu Hashimoto | [lecture_11.pdf](https://github.com/stanford-cs336/lectures/blob/main/lecture_11.pdf) | [Watch (1h 17m)](https://www.youtube.com/watch?v=vTfEyOyzV9E&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **12** | Wed May 6 | Model Evaluation & HELM | Percy Liang | [lecture_12.py trace](https://cs336.stanford.edu/lectures/?trace=lecture_12) | [Watch (1h 18m)](https://www.youtube.com/watch?v=JpAxdTWQJxM&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **13** | Mon May 11 | Data Sources & Common Crawl | Percy Liang | [lecture_13.py trace](https://cs336.stanford.edu/lectures/?trace=lecture_13) | [Watch (1h 22m)](https://www.youtube.com/watch?v=-qm0ln33G24&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **14** | Wed May 13 | Data Filtering & Deduplication | Percy Liang | [lecture_14.py trace](https://cs336.stanford.edu/lectures/?trace=lecture_14) | [Watch (1h 25m)](https://www.youtube.com/watch?v=5sxHosTLPF8&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **15** | Mon May 18 | Post-Training: SFT & RLHF | Tatsu Hashimoto | [lecture_15.pdf](https://github.com/stanford-cs336/lectures/blob/main/lecture_15.pdf) | [Watch (1h 20m)](https://www.youtube.com/watch?v=2oH6PWPrYFo&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **16** | Wed May 20 | Post-Training: Reasoning & RLVR | Tatsu Hashimoto | [lecture_16.pdf](https://github.com/stanford-cs336/lectures/blob/main/lecture_16.pdf) | [Watch (1h 16m)](https://www.youtube.com/watch?v=dIFAi87Ws4E&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **17** | Wed May 27 | Multimodal Alignment | Percy Liang | [lecture_17.py trace](https://cs336.stanford.edu/lectures/?trace=lecture_17) | [Watch (1h 18m)](https://www.youtube.com/watch?v=26FtD08ZpOU&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |
| **18** | Mon Jun 1 | Guest Lecture: Formal Reasoning (Lean 4) | Daniel Selsam | Formal Verification | *Seminar notes* |
| **19** | Wed Jun 3 | Guest Lecture: Sub-Quadratic & SSMs | Dan Fu | State Space Models | [Watch (1h 12m)](https://www.youtube.com/watch?v=9EEm4iMAF5s&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV) |

---

## Assignments & Hands-on Projects

1. **[Assignment 1: Basics](https://github.com/stanford-cs336/assignment1-basics/tree/main)** ([PDF Handout](https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf))
   - *Deliverables*: Byte-level BPE tokenizer, RMSNorm, RoPE rotational embeddings, SwiGLU feedforward network, Multi-Head Attention, AdamW optimizer from scratch, and full LM pretraining loop.
   - *Est. Time*: ~20 hours
2. **[Assignment 2: Systems](https://github.com/stanford-cs336/assignment2-systems/tree/main)** ([PDF Handout](https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf))
   - *Deliverables*: PyTorch Profiler roofline analysis, custom GPU vector kernels in OpenAI Triton, FlashAttention-2 forward & backward pass, custom Distributed Data Parallel (DDP) all-reduce.
   - *Est. Time*: ~22 hours
3. **[Assignment 3: Scaling](https://github.com/stanford-cs336/assignment3-scaling/tree/main)** ([PDF Handout](https://github.com/stanford-cs336/assignment3-scaling/blob/main/cs336_assignment3_scaling.pdf))
   - *Deliverables*: Exact parameter and FLOP counting equations, training API loss collection, non-linear least squares fitting of Chinchilla power laws, compute allocation projections.
   - *Est. Time*: ~10 hours
4. **[Assignment 4: Data](https://github.com/stanford-cs336/assignment4-data/tree/main)** ([PDF Handout](https://github.com/stanford-cs336/assignment4-data/blob/main/cs336_assignment4_data.pdf))
   - *Deliverables*: Web-scale Common Crawl WARC/WET parser, FastText language filtering, Gopher/C4 quality filters, MinHash LSH fuzzy deduplication pipeline.
   - *Est. Time*: ~14 hours
5. **[Assignment 5: Alignment and Reasoning RL](https://github.com/stanford-cs336/assignment5-alignment/tree/main)** ([PDF Handout](https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2026_assignment5_alignment.pdf) • [Safety Supplement](https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2025_assignment5_supplement_safety_rlhf.pdf))
   - *Deliverables*: SFT on GSM8K math dataset, rule-based verifiable reward function, GRPO / PPO policy gradient reasoning training, test-time compute rollout scaling.
   - *Est. Time*: ~18 hours

---

## Compute & GPU Guidance

- For unit tests, testing correctness, and small debug steps, use your local CPU.
- For model training runs (A1, A5) and GPU kernel benchmarking (A2):
  - **[Modal](https://modal.com)**: Highly recommended; offers $30 monthly free credits, serverless GPU pricing ($6.25/hr for B200 or modest costs for A10G/L4), only billing for actual compute time with zero idle overhead.
  - Alternatives: [RunPod](https://www.runpod.io) (~$0.40/hr for RTX 3090 / A4000), [Lambda Labs](https://lambda.ai).

---

## Local State Schema (`progress.json`)

The state file tracks:
```json
{
  "startDate": "2026-09-18",
  "targetWeeks": 21,
  "weeklyHoursTarget": 6,
  "completedLectures": ["lec-01"],
  "completedMilestones": ["a1-m1"],
  "completedSessions": ["w1-s1"],
  "lectureNotes": {},
  "assignmentNotes": {},
  "sessionLogs": []
}
```

---

*Happy learning! Built for self-study mastery of Large Language Models from first principles.*
