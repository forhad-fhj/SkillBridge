# SkillBridge - Internship Readiness Analyzer

A full-stack application that helps job seekers in Bangladesh assess their internship readiness by analyzing their resume against real market demands.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- PostgreSQL 16+
- Docker (optional, for containerization)

### Installation

1. **Clone and setup the project:**
```bash
cd SkillBridge
npm install
```

2. **Setup Python backend:**
```bash
cd python-backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cd ..
```

3. **Setup database:**
```bash
# Start PostgreSQL with Docker
docker-compose up postgres

# Run Prisma migrations
npx prisma migrate deploy

# (Optional) Seed database
npx prisma db seed
```

4. **Setup environment variables:**
```bash
# Create .env.local from .env.example
cp .env.example .env.local
```

### Running the Application

**Terminal 1 - Start Python Backend:**
```bash
cd python-backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Start Next.js Frontend:**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🐛 Recent Fixes

### Fixed Issues:
1. **File Upload Error**: Fixed `Content-Type` header issue in axios client - now properly sends `multipart/form-data` for file uploads
2. **Error Handling**: Added comprehensive error handling throughout the application with user-friendly error messages
3. **Performance Optimizations**:
   - Added GZIP compression middleware to Python backend
   - Implemented mock jobs data caching to reduce redundant processing
   - Added proper logging for debugging
   - Optimized file validation

### Code Improvements:
- Enhanced error messages with actionable feedback
- Added file size and type validation (max 10MB, PDF/DOCX only)
- Better timeout handling (60s for uploads, 30s for analysis)
- Improved CORS configuration with max_age caching
- Added proper exception logging with traceback

## 📁 Project Structure

```
SkillBridge/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── upload/              # File upload endpoint
│   │   ├── analyze/             # Gap analysis endpoint
│   │   └── jobs/                # Job data endpoint
│   ├── dashboard/               # Dashboard page
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── FileUpload.tsx          # File upload component
│   ├── ReadinessDashboard.tsx  # Results dashboard
│   └── ui/                      # UI components
├── lib/                          # Utilities and helpers
│   ├── api/                     # API clients
│   └── db/                      # Database utilities
├── python-backend/              # Python FastAPI backend
│   ├── api/                     # API routes
│   ├── services/                # Business logic
│   │   ├── document_parser.py   # Resume parsing
│   │   ├── nlp_engine.py        # Skill extraction
│   │   └── gap_analyzer.py      # Gap analysis
│   └── main.py                  # FastAPI app
└── prisma/                       # Database schema
```

## 🔧 Key Features

- **Resume Parsing**: Supports PDF and DOCX formats
- **Skill Extraction**: NLP-powered skill detection from resume
- **Gap Analysis**: Compares user skills against market demand
- **Readiness Score**: Calculates internship readiness (0-100)
- **Learning Roadmap**: Suggests skills to learn
- **GitHub Integration**: Optional GitHub profile analysis
- **Domain Selection**: Choose target role (Frontend, Backend, Data Analyst, etc.)

## 📊 API Endpoints

### Upload & Parse
- `POST /api/upload` - Upload and parse resume
- `POST /api/parse-document` - Parse document (Python backend)

### Analysis
- `POST /api/analyze` - Perform gap analysis
- `POST /api/analyze-gap` - Gap analysis (Python backend)

### Utilities
- `POST /api/extract-skills` - Extract skills from text
- `GET /api/health` - Health check

## 🔍 Troubleshooting

### Backend Connection Error
```
Error: Backend service is not available
```
**Solution**: Ensure Python backend is running on `http://localhost:8000`

### File Upload Failed
```
Error: Invalid file type or file size exceeds limit
```
**Solution**: Use PDF or DOCX files under 10MB

### Database Connection Error
```
Error: Failed to connect to PostgreSQL
```
**Solution**: 
1. Ensure PostgreSQL is running: `docker-compose up postgres`
2. Check `DATABASE_URL` in `.env.local`
3. Run migrations: `npx prisma migrate deploy`

### Port Already in Use
```
Error: Port 3000/8000 already in use
```
**Solution**: 
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

## 🚀 Deployment

### Docker Deployment
```bash
docker-compose up
```

This will start:
- PostgreSQL database
- Python FastAPI backend
- Next.js frontend (manual start)

### Environment Variables for Production
Update `.env.local` with:
```env
DATABASE_URL="your_production_db_url"
PYTHON_BACKEND_URL="your_backend_url"
NEXT_PUBLIC_API_URL="your_frontend_url"
```

## 📝 Development

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting

### Running Linter
```bash
npm run lint
```

### Database Management
```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Create a pull request

## 📄 License

All rights reserved to Forhad. © 2026 SkillBridge.

## 📧 Support

For issues and questions, please open an issue in the repository.

---

**Last Updated**: January 31, 2026
**Status**: ✅ Stable with recent optimizations and bug fixes
