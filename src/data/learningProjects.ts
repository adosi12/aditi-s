export interface FlowStep {
  title: string;
  description: string;
  icon: 'database' | 'cpu' | 'layout' | 'cloud' | 'brain' | 'image' | 'voice' | 'shield';
}

export interface LearningProject {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  whatWeUsed: string[];
  uses: string[];
  futureWork: string[];
  flowSteps: FlowStep[];
  githubLink?: string;
  liveLink?: string;
}

export const learningProjects: LearningProject[] = [
  {
    id: 'taxmaster-india',
    title: 'TaxMaster India',
    category: 'Gamification / Cross-Platform',
    description: 'A gamified MCQ educational platform built with Flutter to simplify complex Indian tax rules.',
    techStack: ['Flutter', 'Firebase Auth', 'Cloud Firestore', 'Dart', 'Provider'],
    whatWeUsed: [
      'Flutter for building a high-performance, cross-platform UI with a single codebase.',
      'Firebase Authentication for secure and easy user sign-in.',
      'Cloud Firestore for real-time leaderboard management and question bank storage.',
      'Provider (Dart) for efficient state management of the quiz game-loop.',
      'Custom animations in Flutter to enhance the gamified learning experience.'
    ],
    uses: [
      'Educates young professionals and students on the intricacies of Indian taxation in a fun way.',
      'Real-time competition through the global leaderboard to encourage continuous learning.',
      'Self-assessment tool for users to test their tax knowledge via randomized MCQs.',
      'Accessible on the web via Netlify, allowing for broad reach without app store friction.'
    ],
    futureWork: [
      'Implementing category-wise tax levels (e.g., GST, Income Tax, Corporate Tax).',
      'Adding rewards or certification for users who top the global leaderboard.',
      'Integrating an AI-powered tax assistant to explain wrong answers in real-time.',
      'Native mobile builds for iOS and Android for push notification engagement.'
    ],
    flowSteps: [
      { title: 'User Auth', description: 'Players sign in via Firebase to track their progress and scores.', icon: 'shield' },
      { title: 'Game Engine', description: 'MCQ engine fetches randomized questions from Cloud Firestore.', icon: 'cpu' },
      { title: 'Score Logic', description: 'Provider manages the real-time score based on accuracy and speed.', icon: 'brain' },
      { title: 'Leaderboard', description: 'Final scores are synced back to Firestore for global rankings.', icon: 'layout' }
    ],
    liveLink: 'https://taxmaster-india.netlify.app/'
  },
  {
    id: 'ai-for-medicine',
    title: 'AI For Medicine (Medical Concierge)',
    category: 'Healthcare AI / Full Stack',
    description: 'A comprehensive AI-powered medical assistance platform for report scanning, symptom triage, and diet planning.',
    techStack: ['FastAPI', 'Google Gemini AI', 'PostgreSQL', 'React.js', 'SQLAlchemy'],
    whatWeUsed: [
      'FastAPI for a high-performance, asynchronous Python backend.',
      'Google Gemini AI (gemini-2.5-flash) for medical report analysis and symptom triage.',
      'PostgreSQL with SQLAlchemy ORM for robust medical data management.',
      'React.js (Vite) for a fast and interactive dashboard-style frontend.',
      'Axios for efficient communication between the frontend and the FastAPI server.'
    ],
    uses: [
      'Automated medical report scanning to help patients understand complex results.',
      'Symptom-based triage to provide preliminary medical advice and urgency levels.',
      'Personalized diet and wellness plans generated based on patient history and current symptoms.',
      'Intelligent doctor recommendations based on the identified medical needs.'
    ],
    futureWork: [
      'Integrating with wearables to provide real-time health monitoring and alerts.',
      'Expanding the AI model to support more specialized medical domains (e.g., oncology, cardiology).',
      'Implementing a secure telemedicine module for direct doctor-patient consultations.',
      'Adding support for DICOM image analysis for direct X-ray/MRI processing.'
    ],
    flowSteps: [
      { title: 'User Input', description: 'Patient uploads reports or enters symptoms via the React dashboard.', icon: 'layout' },
      { title: 'AI Analysis', description: 'Gemini AI processes the text/images to extract medical insights.', icon: 'brain' },
      { title: 'Data Persistence', description: 'Medical history and insights are stored securely in PostgreSQL.', icon: 'database' },
      { title: 'Concierge Logic', description: 'FastAPI orchestrates triage, diet plans, and doctor referrals.', icon: 'cpu' }
    ],
    githubLink: 'https://github.com/adosi12/AI-For-Medicine',
    liveLink: 'https://eternal-cocoa-380210.firebaseapp.com/'
  },
  {
    id: 'freehold-price-predictor',
    title: 'Freehold Price Predictor',
    category: 'Full Stack / ML',
    description: 'A real estate price prediction platform for Bangalore home prices using Machine Learning.',
    techStack: ['Python', 'Flask', 'ML', 'React', 'Scikit-learn', 'NumPy', 'Pandas'],
    whatWeUsed: [
      'Python (NumPy, Pandas, Matplotlib) for data cleaning and exploration.',
      'Scikit-learn for building the Linear Regression model.',
      'GridSearchCV for hyperparameter tuning to find the best model configuration.',
      'Flask (Python) as the backend server to serve model predictions.',
      'React for the frontend user interface.',
      'Nginx and AWS EC2 for infrastructure and deployment.'
    ],
    uses: [
      'Allows property buyers and sellers in Bangalore to estimate market value based on area, BHK, and location.',
      'Provides a clean UI for inputting property details and receiving instant predictions.',
      'Demonstrates an end-to-end ML pipeline from raw data to a production web app.'
    ],
    futureWork: [
      'Expanding the model to cover other major Indian cities.',
      'Integrating more advanced algorithms like Random Forest or Gradient Boosting for higher accuracy.',
      'Adding real-time market trend visualizations and neighborhood safety scores.'
    ],
    flowSteps: [
      { title: 'Data Ingestion', description: 'Raw Bangalore property data collected and cleaned using Pandas.', icon: 'database' },
      { title: 'Model Training', description: 'Linear Regression model trained and optimized using Scikit-learn.', icon: 'brain' },
      { title: 'Flask API', description: 'Trained model exported and served via a Python Flask server.', icon: 'cpu' },
      { title: 'React Frontend', description: 'User inputs details and receives prediction via API call.', icon: 'layout' },
      { title: 'Deployment', description: 'System hosted on AWS EC2 with Nginx as a reverse proxy.', icon: 'cloud' }
    ],
    githubLink: 'https://github.com/adosi12/Freehold-Price-Predict'
  },
  {
    id: 'contestant-disposer',
    title: 'Contestant Disposer',
    category: 'Computer Vision / ML',
    description: 'Sports celebrity image classification system using OpenCV and Machine Learning.',
    techStack: ['Python', 'OpenCV', 'Scikit-learn', 'Flask', 'Dropzone.js'],
    whatWeUsed: [
      'OpenCV for face and eye detection to crop and preprocess images.',
      'Wavelet Transform for feature extraction from images.',
      'SVM (Support Vector Machine) classifier for identifying specific athletes.',
      'Flask backend to process image uploads and return classification results.',
      'Dropzone.js for a smooth drag-and-drop image upload experience.'
    ],
    uses: [
      'Automatically identifies famous sports personalities (e.g., Messi, Federer, Serena Williams) from photos.',
      'Can be integrated into sports news portals or fan engagement platforms.',
      'Showcases image preprocessing and classification techniques in a web environment.'
    ],
    futureWork: [
      'Expanding the dataset to include a wider range of athletes and public figures.',
      'Implementing Deep Learning (CNNs) to handle lower-quality or partially obscured images.',
      'Developing a mobile-responsive interface for on-the-go celebrity identification.'
    ],
    flowSteps: [
      { title: 'Image Upload', description: 'User uploads a photo via Dropzone.js frontend.', icon: 'image' },
      { title: 'Preprocessing', description: 'OpenCV detects face/eyes and applies Wavelet Transform.', icon: 'cpu' },
      { title: 'Classification', description: 'SVM model predicts the celebrity identity from extracted features.', icon: 'brain' },
      { title: 'Result Display', description: 'API returns the result with confidence scores to the UI.', icon: 'layout' }
    ],
    githubLink: 'https://github.com/adosi12/contestantdisposer'
  },
  {
    id: 'cogcrafters-dementia-assistant',
    title: 'CogCrafters (Dementia Assistant)',
    category: 'Agentic AI / HealthTech',
    description: 'A supportive AI companion designed for individuals living with dementia and their caregivers.',
    techStack: ['AI', 'Voice Interface', 'Empathetic AI', 'Next.js'],
    whatWeUsed: [
      'Generative AI models for context-aware and empathetic text/voice interactions.',
      'Natural Language Processing (NLP) to understand patient needs and emotional states.',
      'Voice-to-text and text-to-voice interfaces for natural communication.',
      'Caregiver notification system for critical updates or patient distress.'
    ],
    uses: [
      'Provides daily reminders and memory aids for patients to maintain routine.',
      'Offers companionship through natural, empathetic conversation.',
      'Gives caregivers peace of mind through remote monitoring and status updates.'
    ],
    futureWork: [
      'Integration of GPS tracking for patient safety and geofencing alerts.',
      'Adding gamified cognitive exercises to help slow down cognitive decline.',
      'Developing a comprehensive caregiver dashboard for health metrics tracking.'
    ],
    flowSteps: [
      { title: 'Input Capture', description: 'Patient interacts via voice or text input.', icon: 'voice' },
      { title: 'AI Processing', description: 'NLP models analyze intent and emotional context.', icon: 'brain' },
      { title: 'Empathetic Response', description: 'AI generates a supportive, context-aware response.', icon: 'cpu' },
      { title: 'Caregiver Alert', description: 'System notifies caregivers if abnormal patterns are detected.', icon: 'shield' }
    ],
    githubLink: 'https://github.com/adosi12/CogCrafters'
  },
  {
    id: 'farmerconnect',
    title: 'FarmerConnect',
    category: 'AI / Automation',
    description: 'An automated platform enabling farmers to apply for financial aid and receive AI-driven advice.',
    techStack: ['n8n', 'AI', 'Automation', 'Multilingual'],
    whatWeUsed: [
      'n8n for building complex automated workflows and integrations.',
      'AI-driven decision engines for processing financial aid applications.',
      'Multilingual support to ensure accessibility for farmers across different regions.',
      'Automated communication channels for real-time advice and updates.'
    ],
    uses: [
      'Simplifies the financial aid application process for farmers.',
      'Provides personalized agricultural advice based on local data and AI insights.',
      'Bridges the communication gap between financial institutions and rural communities.'
    ],
    futureWork: [
      'Integrating satellite imagery for crop health monitoring.',
      'Adding support for more regional languages and dialects.',
      'Developing a simplified mobile interface for low-bandwidth environments.'
    ],
    flowSteps: [
      { title: 'Farmer Input', description: 'Farmers submit requests via simple web/mobile forms.', icon: 'layout' },
      { title: 'Workflow Orchestration', description: 'n8n manages data flow between AI and databases.', icon: 'cpu' },
      { title: 'AI Advisory', description: 'Generative AI provides personalized farming tips.', icon: 'brain' },
      { title: 'Aid Processing', description: 'Automated logic evaluates and routes aid applications.', icon: 'shield' }
    ]
  },
  {
    id: 'the-daily-dispatch',
    title: 'The Daily Dispatch',
    category: 'Web App / React',
    description: 'A curated newsletter platform with a focus on clean typography and readability.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    whatWeUsed: [
      'React for building a fast, component-based user interface.',
      'Tailwind CSS for responsive, utility-first styling.',
      'Custom content management for newsletter curation.',
      'Vercel for seamless deployment and performance optimization.'
    ],
    uses: [
      'Provides a distraction-free environment for reading curated news and articles.',
      'Allows for easy subscription and delivery of high-quality content.',
      'Serves as a template for modern, performance-oriented newsletter apps.'
    ],
    futureWork: [
      'Adding personalized content recommendations based on reading habits.',
      'Integrating social sharing features for better reach.',
      'Developing a "Read Later" functionality with offline support.'
    ],
    flowSteps: [
      { title: 'Content Curation', description: 'High-quality articles are selected and organized.', icon: 'database' },
      { title: 'React Rendering', description: 'Frontend fetches and displays content with smooth transitions.', icon: 'layout' },
      { title: 'Subscription', description: 'Users subscribe to updates via integrated forms.', icon: 'shield' },
      { title: 'Global Delivery', description: 'Vercel Edge Network ensures fast content delivery.', icon: 'cloud' }
    ],
    liveLink: 'https://my-newsletter-mauve.vercel.app/'
  },
  {
    id: 'dev-and-voice',
    title: 'Dev & Voice',
    category: 'Productivity / Web',
    description: 'A journaling platform for developers that combines code reflections with voice notes.',
    techStack: ['JavaScript', 'HTML/CSS', 'Web Audio API', 'Vercel'],
    whatWeUsed: [
      'Web Audio API for capturing and processing voice recordings in the browser.',
      'Modern JavaScript (ES6+) for application logic and interactivity.',
      'CSS Grid and Flexbox for a flexible, responsive layout.',
      'Local storage or cloud sync for persistent journal entries.'
    ],
    uses: [
      'Helps developers document their daily progress and challenges via voice.',
      'Integrates technical reflections with personal notes for a holistic journaling experience.',
      'Provides a quick and easy way to capture ideas without switching away from the keyboard.'
    ],
    futureWork: [
      'Adding automatic transcription of voice notes using AI.',
      'Integrating with GitHub to link journal entries to specific commits.',
      'Developing a mobile app for on-the-go developer reflections.'
    ],
    flowSteps: [
      { title: 'Voice Capture', description: 'User records thoughts via the Web Audio API.', icon: 'voice' },
      { title: 'Entry Creation', description: 'Journal entry is created with text and audio attachments.', icon: 'layout' },
      { title: 'Persistence', description: 'Data is saved securely to the cloud or local storage.', icon: 'database' },
      { title: 'Review', description: 'Interactive dashboard for browsing past reflections.', icon: 'layout' }
    ],
    liveLink: 'https://dev-and-voice-5zmav8tvj-adosi12s-projects.vercel.app/'
  }
];
