// Stanford CS336: Language Modeling from Scratch - Course Data & 21-Week Study Plan
// Tailored for 3 sessions/week (2 weekdays + 1 weekend day), 2 hours per session (6 hours/week)

const CS336_DATA = {
  course: {
    title: "Stanford CS336: Language Modeling from Scratch",
    offering: "Spring 2026",
    institution: "Stanford University",
    instructors: [
      { name: "Tatsunori Hashimoto", url: "https://thashim.github.io/" },
      { name: "Percy Liang", url: "https://cs.stanford.edu/~pliang/" }
    ],
    tas: [
      { name: "Herman Brunborg", url: "https://brunborg.com" },
      { name: "Marcel Rød", url: "https://marcel.roed.me" },
      { name: "Steven Cao", url: "https://stevenxcao.github.io/" }
    ],
    officialUrl: "https://cs336.stanford.edu/",
    youtubePlaylistUrl: "https://www.youtube.com/watch?v=JuoVZkPBiKk&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
    lecturesRepoUrl: "https://github.com/stanford-cs336/lectures",
    totalLectures: 19,
    totalAssignments: 5,
    estimatedTotalHours: 126,
    weeklyCommitmentHours: 6,
    sessionsPerWeek: 3,
    hoursPerSession: 2
  },

  lectures: [
    {
      id: "lec-01",
      number: 1,
      date: "Mon March 30",
      title: "Overview, Tokenization",
      speaker: "Percy Liang",
      duration: "1h 19m",
      estimatedHours: 2.0,
      youtubeId: "JuoVZkPBiKk",
      youtubeUrl: "https://www.youtube.com/watch?v=JuoVZkPBiKk&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_01.py trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_01", type: "trace" }
      ],
      topics: [
        "Course philosophy & building LMs from scratch",
        "Language modeling formulation & autoregression",
        "Byte-Pair Encoding (BPE) algorithm",
        "Tokenization trade-offs, vocab size, byte fallback",
        "Handling whitespace, unicode, and regex splitting"
      ],
      keyTakeaways: "Understand how text transforms into token IDs and how byte-level BPE ensures any utf-8 string can be encoded without out-of-vocabulary tokens."
    },
    {
      id: "lec-02",
      number: 2,
      date: "Wed April 1",
      title: "PyTorch (einops), Resource Accounting",
      speaker: "Percy Liang",
      duration: "1h 17m",
      estimatedHours: 2.0,
      youtubeId: "kuYAsz7zspQ",
      youtubeUrl: "https://www.youtube.com/watch?v=kuYAsz7zspQ&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_02.py trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_02", type: "trace" },
        { title: "recording version trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_02_recording", type: "trace" }
      ],
      topics: [
        "Expressive PyTorch tensor operations with einops",
        "Resource accounting: counting FLOPs analytically",
        "Memory footprint: weights, activations, optimizer states",
        "Arithmetic intensity (FLOPs / memory byte transferred)",
        "Memory-bound vs Compute-bound operations"
      ],
      keyTakeaways: "Learn to calculate theoretical runtime and memory bottlenecks before writing code; distinguish between bandwidth-limited and compute-limited transformer layers."
    },
    {
      id: "lec-03",
      number: 3,
      date: "Mon April 6",
      title: "Architectures, Hyperparameters",
      speaker: "Tatsunori Hashimoto",
      duration: "1h 29m",
      estimatedHours: 2.0,
      youtubeId: "lVynu4bo1rY",
      youtubeUrl: "https://www.youtube.com/watch?v=lVynu4bo1rY&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_03.pdf", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_03.pdf", type: "pdf" }
      ],
      topics: [
        "Modern Decoder-Only Transformer architecture",
        "Pre-LN vs Post-LN stability",
        "RMSNorm vs LayerNorm",
        "Positional embeddings: Absolute, Learned, RoPE (Rotary Positional Embeddings)",
        "Feed-Forward Variants: GELU, SwiGLU, and width/depth ratios",
        "Weight initialization and learning rate schedules"
      ],
      keyTakeaways: "Master the standard modern LLaMA-style transformer architecture and understand the rationale behind RMSNorm, RoPE, and SwiGLU."
    },
    {
      id: "lec-04",
      number: 4,
      date: "Wed April 8",
      title: "Attention Alternatives & Mixture of Experts",
      speaker: "Tatsunori Hashimoto",
      duration: "1h 26m",
      estimatedHours: 2.0,
      youtubeId: "cKSwj_qZ8Jg",
      youtubeUrl: "https://www.youtube.com/watch?v=cKSwj_qZ8Jg&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_04.pdf", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_04.pdf", type: "pdf" }
      ],
      topics: [
        "Quadratic bottleneck of full self-attention",
        "Multi-Query Attention (MQA) & Grouped-Query Attention (GQA)",
        "Linear attention & State Space Models (SSMs/Mamba overview)",
        "Mixture of Experts (MoE): top-k routing, expert capacity",
        "Load balancing loss and routing stability"
      ],
      keyTakeaways: "Learn how GQA reduces KV cache during inference and how MoE scales parameter count without proportionally increasing FLOPs."
    },
    {
      id: "lec-05",
      number: 5,
      date: "Mon April 13",
      title: "Hardware Systems: GPUs & TPUs",
      speaker: "Tatsunori Hashimoto",
      duration: "1h 18m",
      estimatedHours: 2.0,
      youtubeId: "izZba4UA7iY",
      youtubeUrl: "https://www.youtube.com/watch?v=izZba4UA7iY&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_05.pdf", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_05.pdf", type: "pdf" }
      ],
      topics: [
        "GPU architecture: Streaming Multiprocessors (SMs), Warp scheduling",
        "Memory hierarchy: HBM, L2 Cache, Shared Memory (SRAM), Registers",
        "Tensor Cores & systolic matrix multiply units",
        "TPU design comparisons (Matrix Multiply Units, v5e/v5p)",
        "Memory bandwidth limits vs peak TFLOPs (Roofline model)"
      ],
      keyTakeaways: "Gain mechanical sympathy with modern accelerators to understand why SRAM data reuse is the secret to high GPU efficiency."
    },
    {
      id: "lec-06",
      number: 6,
      date: "Wed April 15",
      title: "Kernels & Triton",
      speaker: "Percy Liang",
      duration: "1h 26m",
      estimatedHours: 2.0,
      youtubeId: "xnDHaNUvHBg",
      youtubeUrl: "https://www.youtube.com/watch?v=xnDHaNUvHBg&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_06.py trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_06", type: "trace" }
      ],
      topics: [
        "Why standard PyTorch operations trigger excessive HBM reads/writes",
        "Kernel fusion concepts",
        "OpenAI Triton programming model: block-level programming",
        "Triton pointers, masks, loads, and dot products",
        "FlashAttention algorithm: online softmax trick and tiling in SRAM"
      ],
      keyTakeaways: "Understand how FlashAttention avoids materializing the $N \\times N$ attention matrix in HBM and how to write custom GPU kernels using Triton."
    },
    {
      id: "lec-07",
      number: 7,
      date: "Mon April 20",
      title: "Distributed Training: Parallelism (Part 1)",
      speaker: "Percy Liang",
      duration: "1h 21m",
      estimatedHours: 2.0,
      youtubeId: "SzpOcwdIL0Y",
      youtubeUrl: "https://www.youtube.com/watch?v=SzpOcwdIL0Y&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_07.py trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_07", type: "trace" }
      ],
      topics: [
        "Limits of single-GPU memory and compute",
        "Collective communications: All-Reduce, All-Gather, Reduce-Scatter",
        "Data Parallelism (DP) vs Distributed Data Parallel (DDP)",
        "Gradient bucketing and overlapping communication with backward pass",
        "Gradient accumulation and effective batch sizes"
      ],
      keyTakeaways: "Learn the core primitives of distributed training and how PyTorch DDP overlaps all-reduce communication with backprop."
    },
    {
      id: "lec-08",
      number: 8,
      date: "Wed April 22",
      title: "Distributed Training: Parallelism (Part 2)",
      speaker: "Tatsunori Hashimoto",
      duration: "1h 20m",
      estimatedHours: 2.0,
      youtubeId: "6-cXp-aOmdg",
      youtubeUrl: "https://www.youtube.com/watch?v=6-cXp-aOmdg&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_08.pdf", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_08.pdf", type: "pdf" }
      ],
      topics: [
        "ZeRO memory optimizations (ZeRO-1, ZeRO-2, ZeRO-3) & FSDP",
        "Tensor Parallelism (Megatron-LM style column & row linear)",
        "Pipeline Parallelism (1F1B scheduling, bubble overhead)",
        "Sequence Parallelism and 3D / 4D parallelism tradeoffs",
        "Interconnect topologies: NVLink, NVSwitch vs InfiniBand / Ethernet"
      ],
      keyTakeaways: "Master the full spectrum of parallelism strategies needed to train models exceeding the memory of any single device."
    },
    {
      id: "lec-09",
      number: 9,
      date: "Mon April 27",
      title: "Empirical Scaling Laws (Part 1)",
      speaker: "Tatsunori Hashimoto",
      duration: "1h 18m",
      estimatedHours: 2.0,
      youtubeId: "Q15rhEWZPQ4",
      youtubeUrl: "https://www.youtube.com/watch?v=Q15rhEWZPQ4&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_09.pdf", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_09.pdf", type: "pdf" }
      ],
      topics: [
        "Why scaling laws matter: predictability in ML engineering",
        "Power laws in compute, data, and parameters: $L(N, D) \\approx (N_c/N)^\\alpha + (D_c/D)^\\beta$",
        "Kaplan et al. (OpenAI 2020) vs Chinchilla / Hoffmann et al. (DeepMind 2022)",
        "Fitting loss curves and empirical power-law parameters",
        "Compute-optimal frontier derivation"
      ],
      keyTakeaways: "Understand how to predict model perplexity across orders of magnitude of compute and avoid undertraining models."
    },
    {
      id: "lec-10",
      number: 10,
      date: "Wed April 29",
      title: "Inference Systems & Serving",
      speaker: "Percy Liang",
      duration: "1h 25m",
      estimatedHours: 2.0,
      youtubeId: "EfM546A79aM",
      youtubeUrl: "https://www.youtube.com/watch?v=EfM546A79aM&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_10.py trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_10", type: "trace" }
      ],
      topics: [
        "Prefill phase vs Decode phase characteristics",
        "KV Cache sizing and memory fragmentation (PagedAttention / vLLM)",
        "Continuous / In-flight batching",
        "Decoding algorithms: greedy, temperature, top-k, top-p, speculative decoding",
        "Quantization: FP8, INT8/INT4 weight-only vs activation quantization"
      ],
      keyTakeaways: "Learn how inference differs fundamentally from training, why decode is memory-bound, and how vLLM style serving achieves high throughput."
    },
    {
      id: "lec-11",
      number: 11,
      date: "Mon May 4",
      title: "Scaling Laws & Downstream Emergence (Part 2)",
      speaker: "Tatsunori Hashimoto",
      duration: "1h 17m",
      estimatedHours: 2.0,
      youtubeId: "vTfEyOyzV9E",
      youtubeUrl: "https://www.youtube.com/watch?v=vTfEyOyzV9E&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_11.pdf", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_11.pdf", type: "pdf" }
      ],
      topics: [
        "Downstream task performance scaling vs cross-entropy loss",
        "Smooth loss vs discontinuous metrics (accuracy, pass@k)",
        "Are emergent abilities real or an artifact of non-linear metrics?",
        "Post-Chinchilla scaling: overtraining regimes (LLaMA, LLaMA 3 15T tokens)",
        "Test-time compute scaling preview"
      ],
      keyTakeaways: "Analyze why pretraining loss smoothly scales with power laws while benchmark accuracy can exhibit abrupt threshold jumps."
    },
    {
      id: "lec-12",
      number: 12,
      date: "Wed May 6",
      title: "Model Evaluation",
      speaker: "Percy Liang",
      duration: "1h 18m",
      estimatedHours: 2.0,
      youtubeId: "JpAxdTWQJxM",
      youtubeUrl: "https://www.youtube.com/watch?v=JpAxdTWQJxM&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_12.py trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_12", type: "trace" }
      ],
      topics: [
        "Evaluation methodologies: Perplexity, Exact Match, Multiple Choice",
        "Benchmark contamination and data leakage detection",
        "Holistic Evaluation of Language Models (HELM)",
        "Chatbot Arena and LLM-as-a-Judge biases",
        "Calibration, uncertainty estimation, and robustness"
      ],
      keyTakeaways: "Understand how to rigorously measure model capability and avoid deceptive evaluation traps such as train-set leakage."
    },
    {
      id: "lec-13",
      number: 13,
      date: "Mon May 11",
      title: "Pretraining Data: Sources & Architecture",
      speaker: "Percy Liang",
      duration: "1h 22m",
      estimatedHours: 2.0,
      youtubeId: "-qm0ln33G24",
      youtubeUrl: "https://www.youtube.com/watch?v=-qm0ln33G24&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_13.py trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_13", type: "trace" }
      ],
      topics: [
        "Data composition in modern LMs (Common Crawl, Wikipedia, GitHub, Books, ArXiv)",
        "Common Crawl ecosystem: WARC, WET, WARC-response formats",
        "Extracting readable text from HTML markup",
        "Storage formats for terabyte-scale corpora (JSONL, Parquet, Arrow, memory-mapped tokens)",
        "Tokenization at scale: distributed multiprocessing tokenizers"
      ],
      keyTakeaways: "Learn how modern trillion-token pretraining corpora are harvested and structured from web-scale dumps."
    },
    {
      id: "lec-14",
      number: 14,
      date: "Wed May 13",
      title: "Pretraining Data: Filtering & Deduplication",
      speaker: "Percy Liang",
      duration: "1h 25m",
      estimatedHours: 2.0,
      youtubeId: "5sxHosTLPF8",
      youtubeUrl: "https://www.youtube.com/watch?v=5sxHosTLPF8&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_14.py trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_14", type: "trace" }
      ],
      topics: [
        "Language identification using FastText",
        "Quality filtering heuristics: Gopher, C4, RefinedWeb rules",
        "Perplexity-based filtering with small reference models",
        "Deduplication: Exact deduplication vs Fuzzy deduplication (MinHash LSH)",
        "Synthetic data generation and data mixing proportions"
      ],
      keyTakeaways: "Discover why data filtering and deduplication often deliver higher capability gains than model architecture tweaks."
    },
    {
      id: "lec-15",
      number: 15,
      date: "Mon May 18",
      title: "Post-Training: Supervised Fine-Tuning & RLHF",
      speaker: "Tatsunori Hashimoto",
      duration: "1h 20m",
      estimatedHours: 2.0,
      youtubeId: "2oH6PWPrYFo",
      youtubeUrl: "https://www.youtube.com/watch?v=2oH6PWPrYFo&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_15.pdf", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_15.pdf", type: "pdf" }
      ],
      topics: [
        "The post-training paradigm: turning raw next-token predictors into assistants",
        "Supervised Fine-Tuning (SFT) data curation and prompt masking",
        "Reward Modeling: Bradley-Terry preference pairs",
        "PPO (Proximal Policy Optimization) for RLHF",
        "Direct Preference Optimization (DPO): closed-form policy optimization without reward models"
      ],
      keyTakeaways: "Master the alignment pipeline from SFT to RLHF and DPO, and understand how preference loss prevents reward hacking."
    },
    {
      id: "lec-16",
      number: 16,
      date: "Wed May 20",
      title: "Post-Training: Reasoning & RLVR",
      speaker: "Tatsunori Hashimoto",
      duration: "1h 16m",
      estimatedHours: 2.0,
      youtubeId: "dIFAi87Ws4E",
      youtubeUrl: "https://www.youtube.com/watch?v=dIFAi87Ws4E&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_16.pdf", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_16.pdf", type: "pdf" }
      ],
      topics: [
        "Reinforcement Learning with Verifiable Rewards (RLVR)",
        "Reasoning benchmarks: GSM8K, MATH, LeetCode / HumanEval",
        "Chain-of-Thought (CoT) emergence via rule-based ground-truth rewards",
        "Group Relative Policy Optimization (GRPO) & DeepSeek-R1 style training",
        "Length penalty, exploration tricks, and self-correction behavior"
      ],
      keyTakeaways: "Understand how frontier reasoning models train on math and code without human labelers by using verifiable unit test and answer checkers."
    },
    {
      id: "lec-17",
      number: 17,
      date: "Wed May 27",
      title: "Multimodal Alignment",
      speaker: "Percy Liang",
      duration: "1h 18m",
      estimatedHours: 2.0,
      youtubeId: "26FtD08ZpOU",
      youtubeUrl: "https://www.youtube.com/watch?v=26FtD08ZpOU&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [
        { title: "lecture_17.py trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_17", type: "trace" }
      ],
      topics: [
        "Vision-Language Architectures: CLIP encoders, projection layers, Perceiver resamplers",
        "Tokenizing images: patch tokens vs vector-quantized codes",
        "Interleaved multimodal pretraining (text + image sequences)",
        "Instruction tuning for multimodal assistants (LLaVA architecture)",
        "Multimodal benchmarks and vision hallucination challenges"
      ],
      keyTakeaways: "Learn how vision tokens are projected into the language model's embedding space to enable native visual reasoning."
    },
    {
      id: "lec-18",
      number: 18,
      date: "Mon June 1",
      title: "Guest Lecture: Formal Reasoning & LLMs",
      speaker: "Daniel Selsam",
      duration: "1h 15m",
      estimatedHours: 2.0,
      youtubeId: null,
      youtubeUrl: null,
      materials: [],
      topics: [
        "Interactive Theorem Proving (Lean 4)",
        "Bridging informal mathematical prose with formal proof assistants",
        "Auto-formalization and proof search using LLMs",
        "Synthetic data generation for formal mathematics",
        "The future of verifiable reasoning and agentic problem solving"
      ],
      keyTakeaways: "Explore how formal systems like Lean provide zero-hallucination verification loops for AI reasoning."
    },
    {
      id: "lec-19",
      number: 19,
      date: "Wed June 3",
      title: "Guest Lecture: Sub-Quadratic Architectures & State Space Models",
      speaker: "Dan Fu",
      duration: "1h 12m",
      estimatedHours: 2.0,
      youtubeId: "9EEm4iMAF5s",
      youtubeUrl: "https://www.youtube.com/watch?v=9EEm4iMAF5s&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV",
      materials: [],
      topics: [
        "Beyond attention: Long-context bottlenecks and sub-quadratic modeling",
        "FlashFFTConv, H3, and Monarch matrices",
        "Mamba and Selective State Space Models",
        "Hybrid Attention-SSM architectures (Jamba / RecurrentGemma)",
        "Associative scan hardware implementation & future directions"
      ],
      keyTakeaways: "Understand how sub-quadratic architectures scale to multi-million token contexts with constant-time inference memory."
    }
  ],

  assignments: [
    {
      id: "assign-1",
      number: 1,
      title: "Assignment 1: Basics",
      tagline: "Build a Transformer & Tokenizer from scratch and train an LM",
      estimatedHours: 20,
      repoUrl: "https://github.com/stanford-cs336/assignment1-basics/tree/main",
      pdfUrl: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf",
      computeRequirements: "CPU sufficient for unit tests; single modest GPU (T4 / A10G / RTX 3090 / Modal free tier) for training run",
      deliverables: [
        "Custom Byte-Pair Encoding (BPE) tokenizer from scratch",
        "LLaMA-style Transformer components: RMSNorm, RoPE, SwiGLU",
        "Multi-Head Attention & Grouped Query Attention (GQA)",
        "AdamW optimizer from scratch with Cosine Warmup",
        "Full pretraining script, checkpointing, and validation loss evaluation"
      ],
      milestones: [
        {
          id: "a1-m1",
          name: "BPE Tokenizer Implementation",
          hours: 5.0,
          desc: "Implement byte-level BPE vocabulary learner, merge rule store, regex splitting pattern, and encode/decode functions."
        },
        {
          id: "a1-m2",
          name: "Transformer Architecture & Layers",
          hours: 6.0,
          desc: "Implement RMSNorm, RoPE rotational embeddings, SwiGLU MLP, and causal Multi-Head Attention layer in PyTorch."
        },
        {
          id: "a1-m3",
          name: "AdamW Optimizer & LR Schedule",
          hours: 3.0,
          desc: "Implement AdamW update rule from scratch (weight decay decouple, first/second moments) and cosine decay with linear warmup."
        },
        {
          id: "a1-m4",
          name: "Training Loop & Pretraining Run",
          hours: 6.0,
          desc: "Assemble transformer blocks, compute cross-entropy loss, log metrics, save checkpoints, and train a minimal LM to target validation perplexity."
        }
      ]
    },
    {
      id: "assign-2",
      number: 2,
      title: "Assignment 2: Systems",
      tagline: "Profile, write Triton FlashAttention-2, and build DDP distributed training",
      estimatedHours: 22,
      repoUrl: "https://github.com/stanford-cs336/assignment2-systems/tree/main",
      pdfUrl: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf",
      computeRequirements: "NVIDIA GPU with compute capability >= 8.0 (Ampere/Ada/Hopper; A10G, A100, H100 via Modal or cloud)",
      deliverables: [
        "PyTorch Profiler trace and roofline analysis report",
        "OpenAI Triton implementation of FlashAttention-2 forward & backward pass",
        "Distributed Data Parallel (DDP) ring all-reduce implementation from scratch",
        "Multi-GPU distributed training benchmark"
      ],
      milestones: [
        {
          id: "a2-m1",
          name: "Profiling & Memory Accounting",
          hours: 4.0,
          desc: "Profile Assignment 1 layers using torch.profiler, calculate theoretical FLOPs vs measured TFLOPs, analyze HBM memory traffic."
        },
        {
          id: "a2-m2",
          name: "Triton Fundamentals & Softmax",
          hours: 4.0,
          desc: "Learn Triton programming primitives (tl.load, tl.store, block pointers) and implement fused softmax and layernorm."
        },
        {
          id: "a2-m3",
          name: "Triton FlashAttention-2 Kernel",
          hours: 8.0,
          desc: "Implement tiled FlashAttention-2 forward pass in Triton with online softmax accumulation in SRAM; verify against standard PyTorch attention."
        },
        {
          id: "a2-m4",
          name: "Distributed Data Parallel (DDP)",
          hours: 6.0,
          desc: "Implement custom DDP wrapper using torch.distributed, implement gradient bucketing, all-reduce synchronization, and test multi-GPU scaling."
        }
      ]
    },
    {
      id: "assign-3",
      number: 3,
      title: "Assignment 3: Scaling",
      tagline: "Empirical power laws, component ablations, and compute-optimal frontier fitting",
      estimatedHours: 10,
      repoUrl: "https://github.com/stanford-cs336/assignment3-scaling/tree/main",
      pdfUrl: "https://github.com/stanford-cs336/assignment3-scaling/blob/main/cs336_assignment3_scaling.pdf",
      computeRequirements: "Lightweight; utilizes pre-run training API and local Python analysis / SciPy optimization",
      deliverables: [
        "Exact FLOP formulas for transformer forward and backward passes",
        "Component ablation experiments analysis",
        "Nonlinear least-squares fitting of Chinchilla power-law parameters",
        "Compute allocation recommendations for target compute budgets ($10^{19}, 10^{20}, 10^{21}$ FLOPs)"
      ],
      milestones: [
        {
          id: "a3-m1",
          name: "FLOPs & Parameter Accounting",
          hours: 3.0,
          desc: "Derive precise formulas for FLOPs per token as a function of vocabulary, hidden dimension, layers, heads, and context length."
        },
        {
          id: "a3-m2",
          name: "Fitting Scaling Power Laws",
          hours: 4.0,
          desc: "Query the course scaling API, collect loss curves across model sizes, fit Chinchilla power law exponents (\\alpha, \\beta, E)."
        },
        {
          id: "a3-m3",
          name: "Compute Allocation & Optimization",
          hours: 3.0,
          desc: "Calculate optimal ratio of tokens to parameters under fixed compute budgets; write report projecting compute requirements."
        }
      ]
    },
    {
      id: "assign-4",
      number: 4,
      title: "Assignment 4: Data",
      tagline: "Process Common Crawl dumps, quality filtering, and MinHash LSH deduplication",
      estimatedHours: 14,
      repoUrl: "https://github.com/stanford-cs336/assignment4-data/tree/main",
      pdfUrl: "https://github.com/stanford-cs336/assignment4-data/blob/main/cs336_assignment4_data.pdf",
      computeRequirements: "Multi-core CPU and disk space (10-50GB); runs smoothly on local Mac",
      deliverables: [
        "Raw Common Crawl WARC/WET extractor pipeline",
        "Language identification filter with FastText",
        "Gopher / C4 heuristic quality filter suite",
        "MinHash LSH fuzzy document deduplication implementation"
      ],
      milestones: [
        {
          id: "a4-m1",
          name: "Web Dump Extraction & Parsing",
          hours: 3.0,
          desc: "Parse Common Crawl WET format files, extract clean text from raw HTML, strip boilerplate and navigation elements."
        },
        {
          id: "a4-m2",
          name: "Language ID & Quality Heuristics",
          hours: 4.0,
          desc: "Filter documents using FastText LID-176 and implement Gopher/C4 quality filters (word length, symbol-to-word ratio, ellipsis filters)."
        },
        {
          id: "a4-m3",
          name: "MinHash LSH Deduplication",
          hours: 5.0,
          desc: "Implement 5-gram shingling, hash functions, MinHash signatures, and Locality Sensitive Hashing (LSH) bands to eliminate duplicate web documents."
        },
        {
          id: "a4-m4",
          name: "Pipeline Benchmark & Pretraining Dataset",
          hours: 2.0,
          desc: "Benchmark throughput (documents/sec), analyze filtering drop rates, and assemble tokenized binary pretraining dataset."
        }
      ]
    },
    {
      id: "assign-5",
      number: 5,
      title: "Assignment 5: Alignment and Reasoning RL",
      tagline: "Supervised Fine-Tuning (SFT) and Reinforcement Learning with Verifiable Rewards (RLVR)",
      estimatedHours: 18,
      repoUrl: "https://github.com/stanford-cs336/assignment5-alignment/tree/main",
      pdfUrl: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2026_assignment5_alignment.pdf",
      supplementPdfUrl: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2025_assignment5_supplement_safety_rlhf.pdf",
      computeRequirements: "Single GPU (e.g. A10G / L4 / A100 via Modal or cloud provider)",
      deliverables: [
        "SFT trainer for instruction tuning and GSM8K reasoning data",
        "Ground-truth math verifier and reward function",
        "Policy gradient / GRPO / PPO algorithm for reasoning RL",
        "Evaluation of reasoning steps, accuracy, and test-time rollout scaling",
        "(Optional Part 2) DPO safety alignment"
      ],
      milestones: [
        {
          id: "a5-m1",
          name: "Reasoning SFT Baseline",
          hours: 4.0,
          desc: "Format math reasoning datasets (GSM8K/MATH), implement prompt masking, and fine-tune base model to establish Chain-of-Thought baseline."
        },
        {
          id: "a5-m2",
          name: "Rule-Based Verifiers & Rollout Generation",
          hours: 4.0,
          desc: "Build rule-based answer parsers and equivalence checkers to provide binary reward signals without reward models."
        },
        {
          id: "a5-m3",
          name: "Policy Gradient / GRPO Implementation",
          hours: 6.0,
          desc: "Implement policy gradient with advantage estimation (Group Relative Policy Optimization or PPO), log-prob ratio clipping, and KL divergence penalty."
        },
        {
          id: "a5-m4",
          name: "Reasoning Evaluation & Scaling Analysis",
          hours: 4.0,
          desc: "Evaluate accuracy gains, observe emergence of self-reflection tokens, compare pass@1 vs pass@k, and summarize findings."
        }
      ]
    }
  ],

  studyPlan: [
    {
      week: 1,
      title: "Module 1: Foundations & Tokenization",
      focus: "Lecture 1, Tokenizer Deep Dive, and Assignment 1 Kickoff",
      sessions: [
        {
          id: "w1-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 1: Overview & Tokenization",
          description: "Watch Lecture 1 video (1h 19m). Review lecture_01.py trace and notes on byte-level BPE.",
          links: [
            { text: "L1 Video", url: "https://www.youtube.com/watch?v=JuoVZkPBiKk&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L1 Code Trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_01" }
          ],
          assignmentRef: null
        },
        {
          id: "w1-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 1: Environment & Tokenizer Vocab",
          description: "Clone assignment1-basics repo. Set up virtual environment, dependencies, and start implementing BPE vocabulary learning.",
          links: [
            { text: "A1 GitHub Repo", url: "https://github.com/stanford-cs336/assignment1-basics/tree/main" },
            { text: "A1 PDF Spec", url: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf" }
          ],
          assignmentRef: "a1-m1"
        },
        {
          id: "w1-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 1: BPE Merge Rules & Regex Splitting",
          description: "Implement regex token splitting (GPT-2/GPT-4 style), iterative merge rule application, and byte fallback.",
          links: [
            { text: "A1 PDF Spec", url: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf" }
          ],
          assignmentRef: "a1-m1"
        }
      ]
    },
    {
      week: 2,
      title: "Module 1: Tokenizer Completion & Resource Accounting",
      focus: "Lecture 2, BPE Unit Tests, and Resource Math",
      sessions: [
        {
          id: "w2-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 2: PyTorch (einops) & Resource Accounting",
          description: "Watch Lecture 2 (1h 17m). Work through FLOPs and memory calculations for transformer layers.",
          links: [
            { text: "L2 Video", url: "https://www.youtube.com/watch?v=kuYAsz7zspQ&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L2 Code Trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_02" }
          ],
          assignmentRef: null
        },
        {
          id: "w2-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 1: BPE Encode/Decode & Unit Tests",
          description: "Complete encode() and decode() with special tokens. Run test suite to verify BPE tokenizer matches test vectors.",
          links: [
            { text: "A1 GitHub Repo", url: "https://github.com/stanford-cs336/assignment1-basics/tree/main" }
          ],
          assignmentRef: "a1-m1"
        },
        {
          id: "w2-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 1: Tokenize Corpus & Save Vocab",
          description: "Train BPE on TinyStories / tinyshakespeare. Save tokenizer files and serialize token IDs to binary format.",
          links: [
            { text: "A1 PDF Spec", url: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf" }
          ],
          assignmentRef: "a1-m1"
        }
      ]
    },
    {
      week: 3,
      title: "Module 1: Transformer Architecture",
      focus: "Lecture 3, RMSNorm, RoPE, and SwiGLU",
      sessions: [
        {
          id: "w3-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 3: Modern Architectures & Hyperparameters",
          description: "Watch Lecture 3 (1h 29m). Study lecture_03.pdf on Pre-LN, RMSNorm, RoPE, and SwiGLU.",
          links: [
            { text: "L3 Video", url: "https://www.youtube.com/watch?v=lVynu4bo1rY&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L3 Slides PDF", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_03.pdf" }
          ],
          assignmentRef: null
        },
        {
          id: "w3-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 1: RMSNorm & RoPE Implementation",
          description: "Implement RMSNorm with learnable gain. Implement Rotary Position Embeddings (RoPE) complex vector rotations.",
          links: [
            { text: "A1 PDF Spec", url: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf" }
          ],
          assignmentRef: "a1-m2"
        },
        {
          id: "w3-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 1: SwiGLU & Multi-Head Attention",
          description: "Implement SwiGLU feedforward network and causal Multi-Head Self-Attention with KV projection.",
          links: [
            { text: "A1 PDF Spec", url: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf" }
          ],
          assignmentRef: "a1-m2"
        }
      ]
    },
    {
      week: 4,
      title: "Module 1: Attention Alternatives & Transformer Assembly",
      focus: "Lecture 4, Transformer Blocks, and AdamW",
      sessions: [
        {
          id: "w4-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 4: Attention Alternatives & MoE",
          description: "Watch Lecture 4 (1h 26m). Understand Grouped-Query Attention (GQA) and sparse mixture of experts.",
          links: [
            { text: "L4 Video", url: "https://www.youtube.com/watch?v=cKSwj_qZ8Jg&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L4 Slides PDF", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_04.pdf" }
          ],
          assignmentRef: null
        },
        {
          id: "w4-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 1: Transformer Block & Full LM",
          description: "Stack attention and MLP layers into residual transformer blocks. Implement weight tying, output projection, and cross-entropy loss.",
          links: [
            { text: "A1 PDF Spec", url: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf" }
          ],
          assignmentRef: "a1-m2"
        },
        {
          id: "w4-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 1: AdamW Optimizer Implementation",
          description: "Implement AdamW from scratch. Verify decoupled weight decay and gradient clipping by norm.",
          links: [
            { text: "A1 PDF Spec", url: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf" }
          ],
          assignmentRef: "a1-m3"
        }
      ]
    },
    {
      week: 5,
      title: "Module 1: LM Pretraining & Completion of A1",
      focus: "Cosine Warmup, Pretraining Run, and Generation",
      sessions: [
        {
          id: "w5-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Assignment 1: LR Schedule & Training Loop",
          description: "Implement Cosine Decay schedule with linear warmup. Assemble dataloader, training step, and metric logging.",
          links: [
            { text: "A1 PDF Spec", url: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf" }
          ],
          assignmentRef: "a1-m4"
        },
        {
          id: "w5-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 1: Full Pretraining Run",
          description: "Execute pretraining run (local GPU or Modal cloud). Monitor training loss curve and gradient norms.",
          links: [
            { text: "A1 GitHub Repo", url: "https://github.com/stanford-cs336/assignment1-basics/tree/main" }
          ],
          assignmentRef: "a1-m4"
        },
        {
          id: "w5-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 1: Evaluation & Text Generation",
          description: "Compute validation perplexity, implement autoregressive greedy/temperature generation, verify milestone completion.",
          links: [
            { text: "A1 PDF Spec", url: "https://github.com/stanford-cs336/assignment1-basics/blob/main/cs336_assignment1_basics.pdf" }
          ],
          assignmentRef: "a1-m4"
        }
      ]
    },
    {
      week: 6,
      title: "Module 2: Hardware Architecture & PyTorch Profiling",
      focus: "Lecture 5, GPU Architecture, and Assignment 2 Setup",
      sessions: [
        {
          id: "w6-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 5: Hardware Systems (GPUs & TPUs)",
          description: "Watch Lecture 5 (1h 18m). Study GPU SMs, warp execution, and HBM vs SRAM memory bandwidth.",
          links: [
            { text: "L5 Video", url: "https://www.youtube.com/watch?v=izZba4UA7iY&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L5 Slides PDF", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_05.pdf" }
          ],
          assignmentRef: null
        },
        {
          id: "w6-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 2: Setup & PyTorch Profiler",
          description: "Clone assignment2-systems repo. Set up torch.profiler and measure execution time and memory of A1 layers.",
          links: [
            { text: "A2 GitHub Repo", url: "https://github.com/stanford-cs336/assignment2-systems/tree/main" },
            { text: "A2 PDF Spec", url: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf" }
          ],
          assignmentRef: "a2-m1"
        },
        {
          id: "w6-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 2: Roofline Model & Memory Traffic",
          description: "Construct roofline curves for attention and MLP forward/backward passes. Identify memory-bound operations.",
          links: [
            { text: "A2 PDF Spec", url: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf" }
          ],
          assignmentRef: "a2-m1"
        }
      ]
    },
    {
      week: 7,
      title: "Module 2: GPU Kernels & OpenAI Triton",
      focus: "Lecture 6, Triton Basics, and Fused Softmax",
      sessions: [
        {
          id: "w7-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 6: Kernels & Triton",
          description: "Watch Lecture 6 (1h 26m). Study lecture_06.py and Triton's SPMD block-based programming model.",
          links: [
            { text: "L6 Video", url: "https://www.youtube.com/watch?v=xnDHaNUvHBg&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L6 Code Trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_06" }
          ],
          assignmentRef: null
        },
        {
          id: "w7-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 2: Triton Vector Operations",
          description: "Implement custom vector addition and vector dropout kernels in Triton. Master tl.program_id and memory masking.",
          links: [
            { text: "A2 PDF Spec", url: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf" }
          ],
          assignmentRef: "a2-m2"
        },
        {
          id: "w7-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 2: Triton Fused Softmax",
          description: "Implement numerically stable fused row-wise softmax in Triton. Benchmark against PyTorch torch.nn.functional.softmax.",
          links: [
            { text: "A2 PDF Spec", url: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf" }
          ],
          assignmentRef: "a2-m2"
        }
      ]
    },
    {
      week: 8,
      title: "Module 2: FlashAttention-2 in Triton",
      focus: "Tiled Attention & Online Softmax in SRAM",
      sessions: [
        {
          id: "w8-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Assignment 2: FlashAttention-2 Forward (Part 1)",
          description: "Derive online softmax rescaling factor. Set up Q, K, V block iteration loops in Triton SRAM.",
          links: [
            { text: "A2 PDF Spec", url: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf" }
          ],
          assignmentRef: "a2-m3"
        },
        {
          id: "w8-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 2: FlashAttention-2 Forward (Part 2)",
          description: "Implement causal masking inside the Triton inner loop. Complete output accumulator write-back.",
          links: [
            { text: "A2 PDF Spec", url: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf" }
          ],
          assignmentRef: "a2-m3"
        },
        {
          id: "w8-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 2: FlashAttention-2 Verification & Benchmarking",
          description: "Test numerical accuracy against PyTorch attention. Benchmark speedup across sequence lengths 512, 1024, 2048, 4096.",
          links: [
            { text: "A2 GitHub Repo", url: "https://github.com/stanford-cs336/assignment2-systems/tree/main" }
          ],
          assignmentRef: "a2-m3"
        }
      ]
    },
    {
      week: 9,
      title: "Module 2: Distributed Data Parallelism",
      focus: "Lectures 7 & 8, All-Reduce, and DDP from Scratch",
      sessions: [
        {
          id: "w9-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 7: Parallelism (Part 1)",
          description: "Watch Lecture 7 (1h 21m). Review collective operations and gradient bucketing in lecture_07.py.",
          links: [
            { text: "L7 Video", url: "https://www.youtube.com/watch?v=SzpOcwdIL0Y&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L7 Code Trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_07" }
          ],
          assignmentRef: null
        },
        {
          id: "w9-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Lecture 8: Parallelism (Part 2 - FSDP & Tensor Parallel)",
          description: "Watch Lecture 8 (1h 20m). Study ZeRO stages 1-3, FSDP, and Megatron tensor parallelism.",
          links: [
            { text: "L8 Video", url: "https://www.youtube.com/watch?v=6-cXp-aOmdg&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L8 Slides PDF", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_08.pdf" }
          ],
          assignmentRef: null
        },
        {
          id: "w9-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 2: Custom DDP Implementation",
          description: "Implement DDP class with torch.distributed. Broadcast parameters at init and hook into autograd backward pass for all-reduce.",
          links: [
            { text: "A2 PDF Spec", url: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf" }
          ],
          assignmentRef: "a2-m4"
        }
      ]
    },
    {
      week: 10,
      title: "Module 2: Distributed Benchmarking & A2 Wrap-up",
      focus: "Gradient Bucketing, Scaling Curves, and A2 Completion",
      sessions: [
        {
          id: "w10-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Assignment 2: Gradient Bucketing Optimization",
          description: "Implement gradient bucket contiguous buffers to overlap communication with computation during backprop.",
          links: [
            { text: "A2 PDF Spec", url: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf" }
          ],
          assignmentRef: "a2-m4"
        },
        {
          id: "w10-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 2: Multi-GPU Benchmark Run",
          description: "Run 2-GPU / 4-GPU distributed training benchmark. Measure throughput (tokens/sec) vs single GPU.",
          links: [
            { text: "A2 GitHub Repo", url: "https://github.com/stanford-cs336/assignment2-systems/tree/main" }
          ],
          assignmentRef: "a2-m4"
        },
        {
          id: "w10-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Systems Synthesis & A2 Final Report",
          description: "Synthesize profiling traces, Triton kernel speedups, and DDP scaling numbers into Assignment 2 final submission report.",
          links: [
            { text: "A2 PDF Spec", url: "https://github.com/stanford-cs336/assignment2-systems/blob/main/cs336_assignment2_systems.pdf" }
          ],
          assignmentRef: "a2-m4"
        }
      ]
    },
    {
      week: 11,
      title: "Module 3: Scaling Laws & Inference",
      focus: "Lectures 9 & 10, FLOP Counting, and Assignment 3 Start",
      sessions: [
        {
          id: "w11-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 9: Empirical Scaling Laws (Part 1)",
          description: "Watch Lecture 9 (1h 18m). Study Kaplan vs Chinchilla power law formulations and optimal compute allocation.",
          links: [
            { text: "L9 Video", url: "https://www.youtube.com/watch?v=Q15rhEWZPQ4&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L9 Slides PDF", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_09.pdf" }
          ],
          assignmentRef: null
        },
        {
          id: "w11-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Lecture 10: Inference Systems & Serving",
          description: "Watch Lecture 10 (1h 25m). Learn KV cache memory management, PagedAttention, and continuous batching in lecture_10.py.",
          links: [
            { text: "L10 Video", url: "https://www.youtube.com/watch?v=EfM546A79aM&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L10 Code Trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_10" }
          ],
          assignmentRef: null
        },
        {
          id: "w11-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 3: FLOPs & Parameter Equations",
          description: "Clone assignment3-scaling repo. Derive exact parameter and FLOP equations for transformer variants.",
          links: [
            { text: "A3 GitHub Repo", url: "https://github.com/stanford-cs336/assignment3-scaling/tree/main" },
            { text: "A3 PDF Spec", url: "https://github.com/stanford-cs336/assignment3-scaling/blob/main/cs336_assignment3_scaling.pdf" }
          ],
          assignmentRef: "a3-m1"
        }
      ]
    },
    {
      week: 12,
      title: "Module 3: Fitting Power Laws & Optimal Compute",
      focus: "Lecture 11, Scaling API, and Chinchilla Exponents",
      sessions: [
        {
          id: "w12-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 11: Scaling Laws & Emergence (Part 2)",
          description: "Watch Lecture 11 (1h 17m). Study downstream task scaling, metric non-linearities, and overtraining.",
          links: [
            { text: "L11 Video", url: "https://www.youtube.com/watch?v=vTfEyOyzV9E&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L11 Slides PDF", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_011.pdf" }
          ],
          assignmentRef: null
        },
        {
          id: "w12-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 3: Querying Scaling API & Loss Fitting",
          description: "Collect training run losses from the course API. Implement non-linear least squares fit with SciPy.",
          links: [
            { text: "A3 PDF Spec", url: "https://github.com/stanford-cs336/assignment3-scaling/blob/main/cs336_assignment3_scaling.pdf" }
          ],
          assignmentRef: "a3-m2"
        },
        {
          id: "w12-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 3: Compute Frontier & Projections",
          description: "Derive compute-optimal model size and token budget for frontier compute targets. Complete A3 report.",
          links: [
            { text: "A3 GitHub Repo", url: "https://github.com/stanford-cs336/assignment3-scaling/tree/main" }
          ],
          assignmentRef: "a3-m3"
        }
      ]
    },
    {
      week: 13,
      title: "Module 4: Pretraining Data Engineering",
      focus: "Lectures 12 & 13, Evaluation, and Common Crawl Extraction",
      sessions: [
        {
          id: "w13-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 12: Model Evaluation & Benchmarks",
          description: "Watch Lecture 12 (1h 18m). Study HELM, contamination checks, and log-likelihood evaluation in lecture_12.py.",
          links: [
            { text: "L12 Video", url: "https://www.youtube.com/watch?v=JpAxdTWQJxM&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L12 Code Trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_12" }
          ],
          assignmentRef: null
        },
        {
          id: "w13-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Lecture 13: Data Sources & Common Crawl Architecture",
          description: "Watch Lecture 13 (1h 22m). Learn WARC file formats and web data pipelines in lecture_13.py.",
          links: [
            { text: "L13 Video", url: "https://www.youtube.com/watch?v=-qm0ln33G24&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L13 Code Trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_13" }
          ],
          assignmentRef: null
        },
        {
          id: "w13-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 4: Setup & WARC/WET Text Extraction",
          description: "Clone assignment4-data repo. Implement streaming WARC/WET parser and HTML text extraction.",
          links: [
            { text: "A4 GitHub Repo", url: "https://github.com/stanford-cs336/assignment4-data/tree/main" },
            { text: "A4 PDF Spec", url: "https://github.com/stanford-cs336/assignment4-data/blob/main/cs336_assignment4_data.pdf" }
          ],
          assignmentRef: "a4-m1"
        }
      ]
    },
    {
      week: 14,
      title: "Module 4: Filtering & Deduplication",
      focus: "Lecture 14, Language ID, and Quality Heuristics",
      sessions: [
        {
          id: "w14-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 14: Filtering, Deduplication & Synthetic Data",
          description: "Watch Lecture 14 (1h 25m). Study FastText LID, Gopher heuristic filters, and MinHash LSH in lecture_14.py.",
          links: [
            { text: "L14 Video", url: "https://www.youtube.com/watch?v=5sxHosTLPF8&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L14 Code Trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_14" }
          ],
          assignmentRef: null
        },
        {
          id: "w14-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 4: FastText Language Identification",
          description: "Integrate FastText LID-176 model to classify document languages; filter non-English documents with confidence thresholds.",
          links: [
            { text: "A4 PDF Spec", url: "https://github.com/stanford-cs336/assignment4-data/blob/main/cs336_assignment4_data.pdf" }
          ],
          assignmentRef: "a4-m2"
        },
        {
          id: "w14-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 4: Gopher & C4 Quality Filters",
          description: "Implement document filters: word count, mean word length, symbol-to-word ratio, bullet point repetition, and curly bracket filters.",
          links: [
            { text: "A4 PDF Spec", url: "https://github.com/stanford-cs336/assignment4-data/blob/main/cs336_assignment4_data.pdf" }
          ],
          assignmentRef: "a4-m2"
        }
      ]
    },
    {
      week: 15,
      title: "Module 4: MinHash LSH Deduplication & Dataset Creation",
      focus: "Fuzzy Deduplication and A4 Completion",
      sessions: [
        {
          id: "w15-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Assignment 4: MinHash Shingling & Hash Signatures",
          description: "Implement n-gram shingling, universal hashing, and compute MinHash signature vectors for web documents.",
          links: [
            { text: "A4 PDF Spec", url: "https://github.com/stanford-cs336/assignment4-data/blob/main/cs336_assignment4_data.pdf" }
          ],
          assignmentRef: "a4-m3"
        },
        {
          id: "w15-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 4: LSH Bands & Duplicate Clustering",
          description: "Implement LSH band hashing, find near-duplicate candidate pairs, apply connected components to drop duplicates.",
          links: [
            { text: "A4 PDF Spec", url: "https://github.com/stanford-cs336/assignment4-data/blob/main/cs336_assignment4_data.pdf" }
          ],
          assignmentRef: "a4-m3"
        },
        {
          id: "w15-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 4: Pipeline Benchmark & Dataset Packaging",
          description: "Benchmark end-to-end extraction pipeline throughput (docs/sec), verify clean corpus stats, finish Assignment 4.",
          links: [
            { text: "A4 GitHub Repo", url: "https://github.com/stanford-cs336/assignment4-data/tree/main" }
          ],
          assignmentRef: "a4-m4"
        }
      ]
    },
    {
      week: 16,
      title: "Module 5: Post-Training, SFT & Preference Alignment",
      focus: "Lecture 15, SFT Setup, and Assignment 5 Kickoff",
      sessions: [
        {
          id: "w16-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 15: Post-Training (SFT, RLHF & DPO)",
          description: "Watch Lecture 15 (1h 20m). Study prompt masking, reward modeling, PPO, and DPO in lecture_15.pdf.",
          links: [
            { text: "L15 Video", url: "https://www.youtube.com/watch?v=2oH6PWPrYFo&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L15 Slides PDF", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_15.pdf" }
          ],
          assignmentRef: null
        },
        {
          id: "w16-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 5: Setup & Reasoning SFT Dataset",
          description: "Clone assignment5-alignment repo. Set up GSM8K math dataset, format Chain-of-Thought prompts, and implement loss masking.",
          links: [
            { text: "A5 GitHub Repo", url: "https://github.com/stanford-cs336/assignment5-alignment/tree/main" },
            { text: "A5 PDF Spec", url: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2026_assignment5_alignment.pdf" }
          ],
          assignmentRef: "a5-m1"
        },
        {
          id: "w16-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 5: SFT Training & Baseline Evaluation",
          description: "Train SFT model on math reasoning traces. Evaluate GSM8K pass@1 accuracy to set the pre-RL baseline.",
          links: [
            { text: "A5 PDF Spec", url: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2026_assignment5_alignment.pdf" }
          ],
          assignmentRef: "a5-m1"
        }
      ]
    },
    {
      week: 17,
      title: "Module 5: Reasoning RL & Verifiable Rewards (RLVR)",
      focus: "Lecture 16, Math Verifiers, and Rollout Samplers",
      sessions: [
        {
          id: "w17-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 16: Post-Training - RLVR & Reasoning Models",
          description: "Watch Lecture 16 (1h 16m). Study test-time compute, rule-based verifiers, and GRPO in lecture_16.pdf.",
          links: [
            { text: "L16 Video", url: "https://www.youtube.com/watch?v=dIFAi87Ws4E&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L16 Slides PDF", url: "https://github.com/stanford-cs336/lectures/blob/main/lecture_16.pdf" }
          ],
          assignmentRef: null
        },
        {
          id: "w17-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 5: Rule-Based Math Verifiers",
          description: "Implement answer extraction regexes and numeric/symbolic equivalence checkers to score reasoning outputs.",
          links: [
            { text: "A5 PDF Spec", url: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2026_assignment5_alignment.pdf" }
          ],
          assignmentRef: "a5-m2"
        },
        {
          id: "w17-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 5: Rollout Generator & Log-Prob Tracking",
          description: "Implement parallel autoregressive rollout sampling and compute per-token action log-probabilities under the policy.",
          links: [
            { text: "A5 PDF Spec", url: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2026_assignment5_alignment.pdf" }
          ],
          assignmentRef: "a5-m2"
        }
      ]
    },
    {
      week: 18,
      title: "Module 5: Policy Gradient & GRPO Implementation",
      focus: "Objective Formulation, KL Penalty, and Clipped Losses",
      sessions: [
        {
          id: "w18-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Assignment 5: Group Advantage Estimation",
          description: "Implement Group Relative Policy Optimization (GRPO) advantage normalization: compute mean and std reward per prompt group.",
          links: [
            { text: "A5 PDF Spec", url: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2026_assignment5_alignment.pdf" }
          ],
          assignmentRef: "a5-m3"
        },
        {
          id: "w18-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 5: Clipped Surrogate Objective & KL Penalty",
          description: "Implement probability ratio clipping (1 - \\epsilon, 1 + \\epsilon) and reference model KL penalty to prevent policy drift.",
          links: [
            { text: "A5 PDF Spec", url: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2026_assignment5_alignment.pdf" }
          ],
          assignmentRef: "a5-m3"
        },
        {
          id: "w18-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 5: RL Training Run & Loss Monitoring",
          description: "Launch RLVR training loop. Monitor reward trajectory, average reasoning length, and KL divergence across iterations.",
          links: [
            { text: "A5 GitHub Repo", url: "https://github.com/stanford-cs336/assignment5-alignment/tree/main" }
          ],
          assignmentRef: "a5-m3"
        }
      ]
    },
    {
      week: 19,
      title: "Module 5: Reasoning Emergence & Multimodal Alignment",
      focus: "Lecture 17, Self-Reflection Emergence, and A5 Wrap-up",
      sessions: [
        {
          id: "w19-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 17: Multimodal Alignment",
          description: "Watch Lecture 17 (1h 18m). Study vision encoder projections and multimodal token interleaving in lecture_17.py.",
          links: [
            { text: "L17 Video", url: "https://www.youtube.com/watch?v=26FtD08ZpOU&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" },
            { text: "L17 Code Trace", url: "https://cs336.stanford.edu/lectures/?trace=lecture_17" }
          ],
          assignmentRef: null
        },
        {
          id: "w19-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Assignment 5: Reasoning Analysis & Self-Reflection",
          description: "Inspect generated CoT traces: identify emergent backtrack tokens (e.g. 'Wait, let me double check'), compute pass@k curves.",
          links: [
            { text: "A5 PDF Spec", url: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2026_assignment5_alignment.pdf" }
          ],
          assignmentRef: "a5-m4"
        },
        {
          id: "w19-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Assignment 5: Final Evaluation & Report",
          description: "Finalize benchmark comparison between Base, SFT, and RLVR models. Complete Assignment 5 submission report.",
          links: [
            { text: "A5 GitHub Repo", url: "https://github.com/stanford-cs336/assignment5-alignment/tree/main" }
          ],
          assignmentRef: "a5-m4"
        }
      ]
    },
    {
      week: 20,
      title: "Module 6: Frontier Paradigms & Formal Verification",
      focus: "Lectures 18 & 19 (Daniel Selsam & Dan Fu Guest Lectures)",
      sessions: [
        {
          id: "w20-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Lecture 18: Formal Reasoning with Lean 4",
          description: "Study Lecture 18 content: formal proof verification, auto-formalization, and theorem proving LLMs (Daniel Selsam).",
          links: [
            { text: "Course Schedule", url: "https://cs336.stanford.edu/#schedule" }
          ],
          assignmentRef: null
        },
        {
          id: "w20-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Lecture 19: Sub-Quadratic Architectures & SSMs",
          description: "Watch Lecture 19 (1h 12m). Study Dan Fu's lecture on FlashFFTConv, Monarch matrices, and Mamba state space models.",
          links: [
            { text: "L19 Video (Dan Fu)", url: "https://www.youtube.com/watch?v=9EEm4iMAF5s&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV" }
          ],
          assignmentRef: null
        },
        {
          id: "w20-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Optional: Assignment 5 Supplement (DPO Safety)",
          description: "Explore the optional DPO safety alignment supplement: implement Bradley-Terry preference loss on safety pairs.",
          links: [
            { text: "A5 Safety Supplement PDF", url: "https://github.com/stanford-cs336/assignment5-alignment/blob/main/cs336_spring2025_assignment5_supplement_safety_rlhf.pdf" }
          ],
          assignmentRef: null
        }
      ]
    },
    {
      week: 21,
      title: "Module 6: Capstone Synthesis & Course Mastery",
      focus: "Portfolio Assembly, Retrospective, and LM from Scratch Showcase",
      sessions: [
        {
          id: "w21-s1",
          type: "weekday",
          dayName: "Weekday 1",
          hours: 2,
          topic: "Capstone: End-to-End System Audit",
          description: "Audit your full pipeline: Tokenizer -> Architecture -> Profiler/Triton -> Scaling -> Data Pipeline -> Alignment/RLVR.",
          links: [
            { text: "CS336 Course Site", url: "https://cs336.stanford.edu/" }
          ],
          assignmentRef: null
        },
        {
          id: "w21-s2",
          type: "weekday",
          dayName: "Weekday 2",
          hours: 2,
          topic: "Capstone: GitHub Portfolio & Code Showcase",
          description: "Organize your implementation repos, polish READMEs, include profiling plots, training loss graphs, and benchmark results.",
          links: [
            { text: "GitHub Profile", url: "https://github.com/zyy-martin" }
          ],
          assignmentRef: null
        },
        {
          id: "w21-s3",
          type: "weekend",
          dayName: "Weekend Day",
          hours: 2,
          topic: "Course Retrospective & Future Research Roadmap",
          description: "Review course journey. Log final study reflection and map out next research or systems engineering goals!",
          links: [
            { text: "CS336 Course Site", url: "https://cs336.stanford.edu/" }
          ],
          assignmentRef: null
        }
      ]
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CS336_DATA;
}
