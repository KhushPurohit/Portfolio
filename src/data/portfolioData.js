// Master Portfolio Configuration Data for Khush Purohit

export const personalInfo = {
  name: "Khush Purohit",
  title: "AI & ML Student | Software Engineer",
  subtitles: [
    "AI & ML Student",
    "Software Engineer",
    "Web Developer",
    "Digital Twin Developer"
  ],
  bio: "AI & ML student passionate about software and web development. Enthusiastic about building intelligent projects, learning modern technologies, and solving real-world problems through practical experience.",
  resumeUrl: "/Khush_Purohit_Resume.pdf",
  socials: {
    github: "https://github.com/KhushPurohit",
    linkedin: "https://www.linkedin.com/in/khush-purohit-b8b5722b4?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    email: "khushpurohit441027@gmail.com",
    phone: "9316441027",
    location: "Ahmedabad, Gujarat"
  }
};

export const aboutCards = [
  {
    id: 1,
    title: "GLS University Undergraduate",
    description: "Bachelor of Technology, Computer Science & Engineering (2023-2027) at Faculty of Engineering & Technology.",
    metric: "CGPA: 9.13",
  },
  {
    id: 2,
    title: "AI / ML Specialization",
    description: "Enthusiastic about Artificial Intelligence, Machine Learning, NLP, Text Analysis, and Deep Learning.",
    metric: "Model Training",
  },
  {
    id: 3,
    title: "Full Stack Development",
    description: "Building responsive frontend experiences with React.js alongside lightweight backend services in Node.js and Flask.",
    metric: "MERN & Flask",
  },
  {
    id: 4,
    title: "Cloud Threat Detection",
    description: "Working on adaptive threat detection and anomaly modeling in cloud architectures using adaptive digital twins.",
    metric: "AWS & Security",
  }
];

export const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    skills: [
      { name: "Python", level: 92, experience: "2+ Years", desc: "Scientific computing, data modeling, Flask backends.", projects: ["CO2 Digital Twin", "Threat Detection"] },
      { name: "Java", level: 85, experience: "2 Years", desc: "Object-oriented programming, systems development.", projects: ["Fundamentals of Java"] },
      { name: "C/C++", level: 80, experience: "2 Years", desc: "Algorithmic thinking, data structures, performance optimization.", projects: ["LeetCode Problem Solving"] },
      { name: "JavaScript", level: 88, experience: "2 Years", desc: "Modern ES6+, interactive web dashboard interfaces.", projects: ["CO2 Digital Twin", "React Apps"] },
      { name: "PHP", level: 75, experience: "1 Year", desc: "Basic backend scripting and web endpoints.", projects: ["Web Applications"] }
    ]
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    skills: [
      { name: "React.js", level: 90, experience: "2 Years", desc: "Building stateful client applications and modular UIs.", projects: ["AetherOS", "CO2 Digital Twin"] },
      { name: "Node.js", level: 85, experience: "2 Years", desc: "Asynchronous backend runtimes and REST API endpoints.", projects: ["Full Stack Systems"] },
      { name: "Flask", level: 88, experience: "1.5 Years", desc: "Microservices, ML inference APIs, recommender backends.", projects: ["OpenDK", "Threat Detection"] }
    ]
  },
  {
    id: "web_mobile",
    title: "Web & Mobile",
    skills: [
      { name: "HTML / CSS", level: 95, experience: "3 Years", desc: "Responsive web design, modern layouts, micro-animations.", projects: ["Portfolio", "Demos"] },
      { name: "Flutter", level: 80, experience: "1 Year", desc: "Cross-platform mobile applications for iOS & Android.", projects: ["Mobile Apps"] },
      { name: "Android Development", level: 78, experience: "1 Year", desc: "Native application architecture and device integration.", projects: ["Mobile Apps"] }
    ]
  },
  {
    id: "ai_ml",
    title: "AI / ML Specialization",
    skills: [
      { name: "Machine Learning", level: 86, experience: "1.5 Years", desc: "Anomaly detection models, TF-IDF recommendations, classifiers.", projects: ["OpenDK", "Threat Detection"] },
      { name: "Text Analysis & NLP", level: 82, experience: "1 Year", desc: "Natural Language Processing, text mining, TF-IDF parsing.", projects: ["OpenDK"] },
      { name: "Deep Learning (DL)", level: 80, experience: "1 Year", desc: "Neural network architectures, predictive modeling.", projects: ["Threat Detection"] }
    ]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    skills: [
      { name: "MySQL", level: 88, experience: "2 Years", desc: "Relational queries, index strategies, transaction modeling.", projects: ["GLS University Projects"] },
      { name: "MongoDB", level: 85, experience: "1.5 Years", desc: "NoSQL document storage, flexible schema designs.", projects: ["Full Stack Systems"] },
      { name: "SQLite", level: 82, experience: "1 Year", desc: "Embedded database, local recommendations indexing.", projects: ["OpenDK"] }
    ]
  },
  {
    id: "cloud_devops",
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 80, experience: "1.5 Years", desc: "Cloud foundations, serverless operations, IAM credentials.", projects: ["AWS Academy Graduate"] },
      { name: "Vercel", level: 88, experience: "2 Years", desc: "Fast front-end continuous delivery pipelines.", projects: ["Portfolio Deployment"] }
    ]
  }
];

export const projectsData = [
  {
    id: "co2-twin",
    title: "CO2 Digital Twin",
    tagline: "3D Geospatial Monitoring Dashboard",
    category: "AI & Full Stack",
    image: "co2_twin.webp",
    overview: "An interactive 3D dashboard for monitoring and simulating CO2 levels across India. Leverages CesiumJS for 3D geospatial visualization, providing real-time and baseline data analysis to support urban planning and environmental interventions. Built for SIH 2025 (Software Edition) Grand Finale.",
    problem: "Visualizing complex carbon levels across massive geographic regions is difficult to monitor in traditional 2D formats, slowing down urban planning and timely environmental interventions.",
    solution: "Integrated CesiumJS for high-performance 3D geospatial visualization, overlaying real-time carbon telemetry over visual map layers.",
    features: [
      "3D Geospatial Rendering: Real-time map layering.",
      "Simulation Sandbox: Model future carbon scenarios.",
      "Baseline Telemetry: Compare current data to historical records."
    ],
    techStack: ["React.js", "CesiumJS", "Flask", "Python", "SQLite"],
    architecture: "React Client <== (REST APIs) ==> Python Flask Backend <== Geospatial Data Sources",
    github: "https://github.com/KhushPurohit/co2-digital-twin-SIH2025.git",
    results: "Selected as SIH 2025 Grand Finalist, enabling intuitive carbon monitoring with microsecond map render speeds.",
    lessons: "Handling massive geographic polygons in 3D viewports requires custom spatial indexing to maintain smooth framerates."
  },
  {
    id: "cloud-threat-detector",
    title: "Cloud Threat Detection",
    tagline: "AI Anomaly Detection Platform",
    category: "AI & Cloud Infrastructure",
    image: "threat_detect.webp",
    overview: "An AI-powered cloud threat detection platform using machine learning and Digital Twin concepts for real-time anomaly detection and adaptive threat analysis. Developed predictive models to identify malicious behavior and strengthen cloud infrastructure through continuous monitoring.",
    problem: "Traditional cloud security solutions rely on static rules, failing to catch zero-day exploits and adaptive threat profiles.",
    solution: "Designed an adaptive digital twin matching system telemetry, feeding performance and log metrics into predictive ML models.",
    features: [
      "Real-time Anomaly Engine: Pushing metrics to predictive pipelines.",
      "Adaptive Threat Matrix: Dynamically updates rules based on ML feedback.",
      "Continuous Monitoring: Constant telemetry scanning."
    ],
    techStack: ["Python", "Flask", "AWS Cloud", "Scikit-Learn", "Vercel"],
    architecture: "AWS Telemetry Agents ==> Anomaly Detection API (Flask) ==> Cloud Threat Dashboard",
    github: "https://github.com/KhushPurohit/DigitalTwin.git",
    results: "Accepted Research Paper at IEEE CICON 2026: ML-based Adaptive Digital Twin for Real-Time Threat Detection in Cloud Systems.",
    lessons: "Distinguishing between server peaks under user load and actual DDoS/anomaly operations requires dynamic time-series smoothing."
  },
  {
    id: "opendk",
    title: "OpenDK",
    tagline: "ML-Powered Software Recommender",
    category: "AI & Full Stack",
    image: "opendk.webp",
    overview: "An ML-powered open-source software recommender using Flask, TF-IDF, Scikit-learn, and SQLite to deliver personalized recommendations across 2,500+ applications.",
    problem: "Navigating massive open-source tools libraries is overwhelming for developer users looking for specific niche matches.",
    solution: "Used natural language processing models to vectorize tool descriptions and match user requirements dynamically.",
    features: [
      "TF-IDF Vector Matching: Matches user queries with tool metadata.",
      "Fast SQLite Index: Instant recommendations retrieval.",
      "Clean Dashboard: Elegant frontend interface."
    ],
    techStack: ["Flask", "TF-IDF", "Scikit-Learn", "SQLite", "HTML/CSS"],
    architecture: "Web UI <== (Flask API) ==> TF-IDF Vector Space ==> SQLite Indexes",
    github: "https://github.com",
    results: "Successfully indexes and returns contextual tool matches across 2,500+ items in less than 50ms.",
    lessons: "Applying TF-IDF requires smart word stemmers and stop-words filters to keep unrelated query matches from skewing recommendations."
  }
];

export const achievementsData = [
  {
    id: 1,
    title: "Web3 Pre-Incubation Cohort 9",
    issuer: "Parul Innovation & Entrepreneurship Research Centre (PIERC)",
    description: "Selected as the founder of a Web3 startup, along with approval for an SSIP grant and incubation support.",
    year: "Cohort 9",
    icon: "🚀"
  },
  {
    id: 2,
    title: "Two-Time SIH Finalist",
    issuer: "Smart India Hackathon (2024, 2025)",
    description: "Ranked among the top teams nationally. Developed a game-based solution for Rural Development (2024) and a Digital Twin framework for CO2 capture (2025).",
    year: "2024, 2025",
    icon: "🏆"
  },
  {
    id: 3,
    title: "GLS FET Internal Hackathon Winner",
    issuer: "Faculty of Engineering & Technology (2024, 2025)",
    description: "Recognized for innovative problem-solving, technical implementation, and project presentation in consecutive years.",
    year: "2024, 2025",
    icon: "🥇"
  },
  {
    id: 4,
    title: "Top 10 Finalist — AU Ingenium 7.0",
    issuer: "AU Ingenium (2026)",
    description: "Presented a Digital Twin–based solution addressing urban planning and sustainability challenges.",
    year: "2026",
    icon: "🎯"
  },
  {
    id: 5,
    title: "Accepted Research Paper",
    issuer: "IEEE CICON 2026",
    description: "Co-authored 'Machine Learning Based Adaptive Digital Twin for Real-Time Threat Detection in Cloud Systems'.",
    year: "2026",
    icon: "📄"
  },
  {
    id: 6,
    title: "Bug Bounty Coordinator",
    issuer: "CyberShadez 2026 Event",
    description: "Hosted and organized a Bug Bounty Competition, coordinating challenge execution, participant engagement, and event operations.",
    year: "2026",
    icon: "🔒"
  }
];

export const journeyTimeline = [
  {
    id: 1,
    title: "GLS University B.Tech CS",
    period: "2023 - 2027",
    subtitle: "Focusing on AI & ML Foundations",
    description: "Enrolled in B.Tech in CSE at Faculty of Engineering & Technology, maintaining a 9.13 CGPA and earning a Meritorious Scholarship."
  },
  {
    id: 2,
    title: "SIH Finalist & Hackathon Winner",
    period: "2024 - 2025",
    subtitle: "Fast-Paced Solutions Prototyping",
    description: "Won GLS FET Internal Hackathon consecutive years and ranked as a top national finalist at SIH 2024 & 2025."
  },
  {
    id: 3,
    title: "Research & Pre-Incubation",
    period: "2026",
    subtitle: "Academic Publications & Web3 Incubation",
    description: "Co-authored research paper accepted for IEEE CICON 2026. Selected for Pre-Incubation at PIERC with SSIP grant funding."
  }
];

export const aiAssistantQA = [
  {
    keywords: ["project", "projects", "work", "dashboard"],
    answer: "Khush Purohit's projects include: 1) CO2 Digital Twin (3D Geospatial simulation dashboard using CesiumJS built for SIH 2025 Grand Finale), 2) Cloud Threat Detection (AI Anomaly Detection platform using digital twin models, published in IEEE CICON 2026), and 3) OpenDK (Flask/ML-powered open-source software recommender)."
  },
  {
    keywords: ["skill", "skills", "languages", "python", "java", "javascript"],
    answer: "Khush is proficient in Python, Java, C/C++, JavaScript, and PHP. Frameworks include React.js, Node.js, and Flask. He has AI/ML expertise in ML, NLP, and Deep Learning, with databases like MySQL, MongoDB, and SQLite, plus cloud skills on AWS and Vercel."
  },
  {
    keywords: ["education", "college", "gls", "university", "gpa", "cgpa"],
    answer: "Khush is a Bachelor of Technology student in Computer Science & Engineering at Faculty of Engineering & Technology, GLS University (2023-2027), with an excellent CGPA of 9.13."
  },
  {
    keywords: ["contact", "email", "phone", "location"],
    answer: "You can contact Khush via email at khushpurohit441027@gmail.com, call him at 9316441027, or write a message directly inside the Contact section at the bottom!"
  },
  {
    keywords: ["achievements", "awards", "hackathon", "sih", "paper", "ieee"],
    answer: "Major achievements include being a Two-Time SIH Finalist (2024, 2025), winning the GLS FET Internal Hackathon (2024, 2025), having a research paper accepted at IEEE CICON 2026, and founding a pre-incubated Web3 startup at PIERC."
  }
];
