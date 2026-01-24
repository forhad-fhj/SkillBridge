# SkillBridge 🌉

SkillBridge is a **Student-to-Job Transition Tracker** that uses NLP to analyze your CV against real-world job descriptions in the Bangladesh market. It calculates an "Internship Readiness Score" and generates a personalized learning roadmap.

![SkillBridge Banner](https://via.placeholder.com/1200x600/0a0a0f/38bdf8?text=SkillBridge+Dashboard)

## 🌟 Features

- **📄 Smart CV Analysis**: Upload your PDF/DOCX resume and let our AI extract your skills.
- **📊 Readiness Score**: Get a quantifiable score (0-100%) representing your market fit.
- **🔍 Gap Analysis**: See exactly which high-demand skills you are missing.
- **🗺️ Learning Roadmap**: Receive a prioritized checklist of what to learn next.
- **🇧🇩 Market Focused**: Tailored for the Bangladesh tech industry (Bdjobs, LinkedIn).

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Python FastAPI, SpaCy (NLP), BeautifulSoup4
- **Database**: PostgreSQL, Prisma ORM
- **Infrastructure**: Docker Compose

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose

### 1. Clone & Setup
```bash
git clone https://github.com/yourusername/skillbridge.git
cd skillbridge
```

### 2. Infrastructure Setup
Start PostgreSQL and the Python Backend service:
```bash
docker-compose up -d --build
```

### 3. Install Dependencies
```bash
# Frontend
npm install

# Database Setup
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to start your analysis!

## 🧪 Environment Variables

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://skillbridge:skillbridge123@localhost:5433/skillbridge"
PYTHON_BACKEND_URL="http://localhost:8000"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

> **Note**: The database is configured to run on port **5433** to avoid conflicts with any local PostgreSQL instances you might have running.

## 📂 Project Structure

```
skillbridge/
├── app/                  # Next.js App Router
├── components/           # React UI Components
├── lib/                  # Shared utilities & API clients
├── prisma/               # Database schema & seed
├── python-backend/       # FastAPI Microservice
│   ├── api/              # API Routes
│   └── services/         # NLP & Scraping Logic
└── public/               # Static assets
```

## 🤝 Contributing
1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
MIT License
# SkillBridge
