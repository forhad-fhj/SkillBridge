# SkillBridge 🌉

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Python Version](https://img.shields.io/badge/python-%3E%3D3.10-blue)](https://www.python.org/)

SkillBridge is an AI-powered **Internship Readiness Analyzer** designed specifically for students and job seekers in Bangladesh. Using advanced Natural Language Processing (NLP), it analyzes your resume against real-world job descriptions from the Bangladesh tech market to calculate your "Internship Readiness Score" and generate a personalized learning roadmap.

## ✨ Key Features

- **📄 Intelligent Resume Analysis**: Upload your PDF/DOCX resume and let our AI extract and analyze your skills using state-of-the-art NLP models
- **📊 Readiness Score Calculation**: Get a comprehensive score (0-100%) indicating your market fit for internships
- **🔍 Detailed Gap Analysis**: Identify exactly which high-demand skills you're missing compared to market requirements
- **🗺️ Personalized Learning Roadmap**: Receive a prioritized checklist of skills to learn next, tailored to your current profile
- **🇧🇩 Bangladesh Market Focus**: Specifically trained on Bangladesh tech industry data from Bdjobs, LinkedIn, and other sources
- **🎯 Domain-Specific Insights**: Choose from various tech domains (Web Development, Data Science, Mobile Development, etc.)
- **📈 Progress Tracking**: Monitor your skill development over time with visual dashboards
- **🔒 Privacy-First**: All analysis happens locally; your resume data is never stored or shared

## 🖼️ Screenshots

### Dashboard Overview
![SkillBridge Dashboard](https://via.placeholder.com/800x400/0a0a0f/38bdf8?text=SkillBridge+Dashboard)

### Gap Analysis Results
![Gap Analysis](https://via.placeholder.com/800x400/0a0a0f/38bdf8?text=Gap+Analysis+Results)

### Learning Roadmap
![Learning Roadmap](https://via.placeholder.com/800x400/0a0a0f/38bdf8?text=Learning+Roadmap)

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Custom D3.js implementations

### Backend
- **Framework**: FastAPI (Python)
- **NLP Engine**: SpaCy with custom Bangladeshi market models
- **Web Scraping**: BeautifulSoup4 for job data collection
- **PDF Processing**: PyPDF2 and python-docx

### Database & Infrastructure
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Containerization**: Docker & Docker Compose
- **Deployment**: Ready for cloud platforms (Vercel, Railway, etc.)

## 📋 Prerequisites

Before running SkillBridge, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **Python** 3.10.0 or higher
- **PostgreSQL** 16.0 or higher (or Docker for containerized setup)
- **Docker** & **Docker Compose** (recommended for easy setup)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/forhad-fhj/SkillBridge.git
cd SkillBridge
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://skillbridge:skillbridge123@localhost:5433/skillbridge"

# Backend API
PYTHON_BACKEND_URL="http://localhost:8000"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Optional: External APIs (if needed)
# OPENAI_API_KEY="your-key-here"
```

### 3. Database Setup

**Option A: Using Docker (Recommended)**

```bash
# Start PostgreSQL container
docker-compose up -d postgres

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed with sample data
npx prisma db seed
```

**Option B: Local PostgreSQL**

Ensure PostgreSQL is running on port 5433, then:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 4. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 5. Frontend Setup

```bash
# In a new terminal, from the root directory
npm install
npm run dev
```

### 6. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

1. **Upload Your Resume**: Click the upload area and select your PDF or DOCX resume
2. **Select Domain**: Choose your target tech domain from the dropdown
3. **Analyze**: Click "Analyze Resume" to start the AI-powered analysis
4. **Review Results**:
   - View your Internship Readiness Score
   - Explore the detailed gap analysis
   - Follow your personalized learning roadmap
5. **Track Progress**: Re-upload updated resumes to see improvement over time

## 🔧 API Documentation

The backend provides RESTful APIs for integration:

### Core Endpoints

- `POST /api/analyze` - Analyze resume and return readiness score
- `POST /api/upload` - Upload and process resume files
- `GET /api/jobs` - Retrieve job market data

For detailed API documentation, see the [API Reference](./backend/README.md) or visit `/docs` when the backend is running.

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd backend
python -m pytest

# Run end-to-end tests
npm run test:e2e
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bangladesh Tech Community** for inspiration and market insights
- **SpaCy** and **FastAPI** communities for excellent tools
- **Open Source Contributors** who make projects like this possible

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/forhad-fhj/SkillBridge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/forhad-fhj/SkillBridge/discussions)
- **Email**: [forhad@example.com](mailto:forhad@example.com)

---

**Made with ❤️ for Bangladesh's future developers**
