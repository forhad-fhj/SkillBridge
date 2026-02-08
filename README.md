<p align="center">
  <h1 align="center">🌉 SkillBridge</h1>
  <p align="center">
    <strong>AI-Powered Internship Readiness Analyzer</strong>
  </p>
  <p align="center">
    Analyze your resume against real job market data and get a personalized learning roadmap
  </p>
</p>

<p align="center">
  <a href="https://skill-bridge-lemon.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-blue?style=for-the-badge" alt="Live Demo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📄 **Resume Analysis** | Upload PDF/DOCX and extract skills using NLP |
| 📊 **Readiness Score** | Get a 0-100% score based on market demand |
| 🔍 **Gap Analysis** | See exactly which skills you're missing |
| 🗺️ **Learning Roadmap** | Prioritized list of skills to learn next |
| 🎯 **Domain Selection** | Choose from Frontend, Backend, Full Stack, Data, Mobile |
| 📈 **Visual Dashboard** | Beautiful charts and skill breakdowns |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Backend** | FastAPI, Python, SpaCy NLP |
| **Database** | PostgreSQL, Prisma ORM |
| **Deployment** | Vercel (Frontend), Render (Backend), Neon (Database) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL (or Docker)

### 1. Clone & Setup

```bash
git clone https://github.com/forhad-fhj/SkillBridge.git
cd SkillBridge
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
python -m spacy download en_core_web_md
uvicorn main:app --reload --port 8001
```

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local   # Configure environment
npx prisma generate
npm run dev
```

### 4. Open App

Visit [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment

| Service | URL |
|---------|-----|
| **Frontend** | https://skill-bridge-lemon.vercel.app |
| **Backend API** | https://skillbridge-4eey.onrender.com |
| **Health Check** | https://skillbridge-4eey.onrender.com/api/health |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/parse-document` | Upload and parse resume |
| `POST` | `/api/extract-skills` | Extract skills from text |
| `POST` | `/api/analyze-gap` | Perform gap analysis |
| `GET` | `/api/health` | Health check |

---

## 📁 Project Structure

```
SkillBridge/
├── backend/                 # FastAPI Python backend
│   ├── main.py              # App entry point
│   ├── api/routes.py        # API endpoints
│   ├── services/            # NLP & analysis logic
│   └── requirements.txt     # Python dependencies
├── frontend/                # Next.js frontend
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities & API client
│   └── prisma/              # Database schema
└── docker-compose.yml       # Local PostgreSQL
```

---

## 🐳 Docker Setup (Optional)

```bash
# Start PostgreSQL
docker-compose up -d postgres

# Run migrations
cd frontend
npx prisma migrate deploy
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Forhad Hasan**

- GitHub: [@forhad-fhj](https://github.com/forhad-fhj)
- LinkedIn: [Forhad Hasan](https://linkedin.com/in/forhad-hasan)
- Email: forhadhasan1007@gmail.com

---

<p align="center">
  Made with ❤️ for Bangladesh's future developers
</p>
