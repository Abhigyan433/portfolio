export const portfolioData = {
  personalDetails: {
    name: 'Abhigyan Das',
    role: 'Software Developer & Data Enthusiast',
    email: 'dassabhigyan12@gmail.com',
    phone: '+91 9864646889',
    linkedin: 'https://www.linkedin.com/in/abhigyandas12/',
    github: 'https://github.com/Abhigyan433',
    location: 'India',
    aboutParagraphs: [
      "Software developer and data enthusiast crafting modern web architectures, analytics dashboards, and ML-powered tools. Currently pursuing B.Tech in Computer Science at Lovely Professional University.",
      "I specialize in building intelligent applications that bridge the gap between complex data and intuitive user experiences. My expertise spans full-stack development, machine learning pipelines, and advanced data visualization.",
      "Beyond code, I am passionate about solving real-world challenges through technology—whether it's detecting media bias using NLP, predicting data trends, or designing premium, responsive user interfaces."
    ],
    stats: [
      { value: '100+', label: 'Coding Problems Solved' },
      { value: '4+', label: 'Projects Completed' },
      { value: '50-Days', label: 'LeetCode Badge' }
    ]
  },
  skills: [
    {
      title: 'Languages',
      skills: ['C++', 'Java', 'Python', 'JavaScript']
    },
    {
      title: 'Frameworks & Libraries',
      skills: ['HTML/CSS', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Django', 'Flask']
    },
    {
      title: 'Tools & Ecosystem',
      skills: ['Figma', 'VS Code', 'MS Excel', 'Power BI', 'Tableau', 'DBMS', 'GitHub']
    },
    {
      title: 'Core Fundamentals',
      skills: ['OS', 'OOPs', 'Computer Networks', 'Problem-Solving', 'Adaptability']
    }
  ],
  projects: [
    {
      title: 'Blinkit Sales Analytics Dashboard',
      period: "Dec' 25 – Jan' 26",
      description: 'Developed an interactive Power BI dashboard to analyze Blinkit sales data, tracking ₹1.20M total sales, 9K+ items, and average ratings using data modeling, DAX measures, and KPI visuals.',
      bullets: [
        'Developed an interactive Power BI dashboard to analyze Blinkit sales data, tracking ₹1.20M total sales, 9K+ items, and average ratings using data modeling, DAX measures, and KPI visuals.',
        'Conducted outlet-wise performance analysis across Grocery Stores and Supermarket Types to compare sales, item counts, and averages using Power BI tables, DAX, and comparative visuals.',
        'Evaluated sales trends by outlet location (Tier 1–3) and outlet size (Small, Medium, High) to identify high-performing segments using slicers, filters, bar charts, and donut visuals.',
        'Performed product category and fat-content analysis (Low Fat vs Regular) to understand customer buying behavior, leveraging DAX calculations, interactive dashboards, and visual storytelling.',
      ],
      techStack: 'Power BI, DAX, Power Query, Data Modelling, Data Visualization, Business Intelligence Analytics',
      image: '/blinkit_dashboard.png',
      tags: ['Power BI', 'DAX', 'Data Modelling', 'Data Visualization'],
      github: 'https://github.com/Abhigyan433',
      live: '#',
    },
    {
      title: 'Rainfall Prediction using Machine Learning',
      period: "Nov' 25 – Dec' 25",
      description: 'Designed and deployed an ML-based rainfall prediction solution by analyzing historical meteorological data to identify trends.',
      bullets: [
        'Designed and deployed a machine learning–based rainfall prediction solution by analyzing historical meteorological data to identify trends and generate accurate rainfall forecasts.',
        'Applied rigorous data preprocessing and exploratory data analysis (EDA) techniques, including feature engineering and correlation analysis, to improve data quality and model effectiveness.',
        'Developed, trained, and benchmarked supervised learning models, selecting the optimal algorithm based on metrics such as accuracy and consistency.',
        'Implemented a full end-to-end ML pipeline in Python, utilizing Pandas, NumPy, Matplotlib, and Scikit-learn to manage data processing, visualization, model training, and evaluation.',
      ],
      techStack: 'Python, Pandas, NumPy, Matplotlib, Scikit-learn, ML, EDA, Feature Engineering, Model Evaluation',
      image: '/rainfall_prediction.png',
      tags: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning', 'EDA'],
      github: 'https://github.com/Abhigyan433',
      live: '#',
    },
    {
      title: 'Bias Buster: AI-powered Chrome Extension',
      period: "May' 25 – Jul' 25",
      description: 'Developed an AI-driven Chrome extension to detect and reduce media bias in online articles.',
      bullets: [
        'Developed an AI-driven Chrome extension to detect and reduce media bias in online articles, integrating advanced NLP models for sentiment, stance, and linguistic framing analysis to enhance credibility evaluation.',
        'Implemented real-time text scanning and automated highlighting of biased or emotionally loaded phrases, adding context-aware neutral rewording suggestions and a bias severity score to help users consume balanced information.',
        'Leveraged TensorFlow.js and Hugging Face Transformers for fast, on-device inference, enabling privacy-preserving, low-latency bias classification without relying on external servers or cloud APIs.',
      ],
      techStack: 'HTML, CSS, JavaScript, Machine Learning, NLP, Chrome Extension APIs',
      image: '/bias_buster.png',
      tags: ['JavaScript', 'Machine Learning', 'NLP', 'Chrome Extension APIs'],
      github: 'https://github.com/Abhigyan433',
      live: '#',
    }
  ],
  experience: [],
  certificates: [
    {
      title: 'Quantitative Research Job Simulation',
      organization: 'Forage',
      period: "Jan' 26",
      link: '#'
    },
    {
      title: 'SQL Basic',
      organization: 'HackerRank',
      period: "Dec' 25",
      link: '#'
    },
    {
      title: 'Master Generative AI & Generative AI tools',
      organization: 'Udemy',
      period: "Aug' 25",
      link: '#'
    },
    {
      title: 'Computer Communication',
      organization: 'Coursera',
      period: "Dec' 24",
      link: '#'
    }
  ],
  achievements: [
    {
      title: 'Solved 100+ coding problems',
      platform: 'LeetCode, GFG',
      period: "Dec' 25"
    },
    {
      title: 'LeetCode 50-Days Coding Challenge Badge',
      platform: 'LeetCode',
      period: "Dec' 25"
    }
  ],
  education: [
    {
      degree: 'Bachelor of Technology - Computer Science and Engineering',
      institution: 'Lovely Professional University (Phagwara, Punjab)',
      period: "Aug' 23 - Present",
    }
  ]
};
