# SkillBridge - Vercel Deployment Guide

This guide walks you through deploying SkillBridge to Vercel. Since SkillBridge has both a Next.js frontend and Python backend, we'll use a multi-service approach.

## 🏗️ Deployment Architecture

```
┌─────────────────────────────────────────────────────┐
│              Vercel (Frontend + API)                │
│  ┌──────────────────────────────────────────────┐  │
│  │  Next.js App + API Routes (TypeScript)       │  │
│  │  - Dashboard & UI Components                 │  │
│  │  - Database queries via Prisma               │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│         External Python Backend (Railway/Heroku)    │
│  ┌──────────────────────────────────────────────┐  │
│  │  FastAPI Application                         │  │
│  │  - NLP Processing                            │  │
│  │  - Document Parsing                          │  │
│  │  - Gap Analysis                              │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│         PostgreSQL Database (Neon/Supabase)         │
└─────────────────────────────────────────────────────┘
```

## 📋 Prerequisites

- Vercel account (free tier available at https://vercel.com)
- GitHub account with your repository pushed
- PostgreSQL database (we recommend Neon or Supabase for free tier)
- Python backend hosted separately (Railway, Render, or Heroku)

## 🚀 Step 1: Prepare Your Repository

### 1.1 Update Project Structure for Vercel

Move the frontend to the root level (Vercel requires Next.js at root):

```bash
# If you need to restructure, move frontend contents to root
# This assumes frontend is already structured correctly
```

### 1.2 Create Vercel Configuration File

Create a `vercel.json` file in your project root:

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/.next",
  "installCommand": "cd frontend && npm install",
  "framework": "nextjs",
  "env": {
    "PYTHON_BACKEND_URL": "@python_backend_url",
    "DATABASE_URL": "@database_url",
    "NEXT_PUBLIC_API_URL": "@next_public_api_url"
  }
}
```

**OR** if you keep frontend as a subdirectory, use:

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/.next"
}
```

## 🔧 Step 2: Set Up PostgreSQL Database

### Option A: Use Neon (Recommended - Free tier available)

1. Go to https://console.neon.tech
2. Create a new project
3. Copy the connection string (PostgreSQL URL)
4. Note: Format is `postgresql://user:password@host/database`

### Option B: Use Supabase

1. Go to https://supabase.com
2. Create a new project
3. Get the connection string from project settings
4. Enable "Direct connection" for Prisma

### Option C: Railway

1. Go to https://railway.app
2. Create a PostgreSQL database
3. Copy the connection string

## 🐍 Step 3: Deploy Python Backend

### Option A: Railway (Recommended)

1. Push your code to GitHub
2. Go to https://railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add environment variables needed for FastAPI
6. Deploy

### Option B: Render

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Set runtime to Python 3.10+
5. Build command: `pip install -r backend/requirements.txt`
6. Start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
7. Deploy

### Option C: Heroku (free tier no longer available, but still option)

```bash
# Install Heroku CLI
# Login and create app
heroku create skillbridge-api
git push heroku main
```

**Save the deployed Python backend URL** (e.g., `https://skillbridge-api.railway.app`)

## 🌐 Step 4: Deploy to Vercel

### 4.1 Connect GitHub Repository

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the project

### 4.2 Configure Project Settings

**Build & Output Settings:**
- Framework Preset: Next.js
- Build Command: `cd frontend && npm run build`
- Output Directory: `frontend/.next`
- Install Command: `cd frontend && npm install`

### 4.3 Set Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables** and add:

```
DATABASE_URL = postgresql://user:password@host/database
PYTHON_BACKEND_URL = https://your-python-api.railway.app (or other host)
NEXT_PUBLIC_API_URL = https://your-vercel-domain.vercel.app
NEXT_PUBLIC_PYTHON_BACKEND_URL = https://your-python-api.railway.app
```

### 4.4 Deploy

Click **Deploy** and wait for the build to complete.

## 🔄 Step 5: Run Database Migrations

After successful deployment, run migrations on your production database:

```bash
# Option 1: Via Vercel CLI
vercel env pull .env.production.local
npx prisma migrate deploy --skip-generate

# Option 2: Manually via your terminal
DATABASE_URL="postgresql://user:password@host/database" npx prisma migrate deploy
```

## ✅ Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Check if the application loads
3. Test file upload functionality
4. Verify database connections
5. Check browser console for errors

### Troubleshooting Common Issues:

**API Not Found (404)**
- Verify `PYTHON_BACKEND_URL` is correctly set
- Check Python backend is deployed and running
- Verify backend URL is accessible from the internet

**Database Connection Error**
- Verify `DATABASE_URL` is correct
- Check database whitelist IP addresses (if applicable)
- Ensure migrations have been run

**Build Fails**
- Check build logs in Vercel dashboard
- Ensure all dependencies in `package.json` are installed
- Verify Node.js version is 18+

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `PYTHON_BACKEND_URL` | Backend API URL | `https://api.example.com` |
| `NEXT_PUBLIC_API_URL` | Frontend API URL (public) | `https://app.example.com` |
| `NEXT_PUBLIC_PYTHON_BACKEND_URL` | Python backend URL (public) | `https://api.example.com` |

## 🔒 Security Checklist

- [ ] Database credentials are in Vercel secrets, not in code
- [ ] Python backend URL uses HTTPS
- [ ] Database whitelists necessary IPs
- [ ] Environment variables are not logged
- [ ] CORS is configured properly in FastAPI backend
- [ ] Rate limiting is enabled in API routes
- [ ] File upload limits are enforced

## 📊 Monitoring & Logs

1. **Vercel Dashboard**: View deployment logs and analytics
2. **Database Logs**: Check Neon/Supabase console for query issues
3. **Python Backend Logs**: Check Railway/Render deployment logs

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to your main branch. To disable:
- Go to **Settings → Git**
- Modify branch deployment rules

## 🆘 Support & Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Prisma Deployment: https://www.prisma.io/docs/guides/deployment
- Railway Docs: https://docs.railway.app

## 📞 Getting Help

If you encounter issues:

1. Check Vercel logs: Dashboard → Deployments → View Logs
2. Check Python backend logs on your hosting platform
3. Verify all environment variables are set correctly
4. Test locally first: `npm run dev`
5. Review TROUBLESHOOTING.md in the project root
