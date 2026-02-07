# SkillBridge - Vercel Deployment Checklist

## Pre-Deployment

- [ ] All code is committed and pushed to GitHub
- [ ] No sensitive credentials in code
- [ ] `frontend/package.json` has correct dependencies
- [ ] `frontend/.env.example` is up-to-date
- [ ] Database schema is finalized in `prisma/schema.prisma`
- [ ] Python backend is tested locally and ready to deploy

## Database Setup

- [ ] PostgreSQL database created (Neon/Supabase/Railway)
- [ ] Database connection string obtained
- [ ] Connection string is secure (don't share publicly)
- [ ] Database whitelisting rules configured (if applicable)

## Python Backend Deployment

- [ ] Python backend code pushed to GitHub
- [ ] Backend hosting account created (Railway/Render/Heroku)
- [ ] Backend deployed successfully
- [ ] Backend URL is accessible (test in browser)
- [ ] CORS configured in FastAPI (`app/main.py`)
- [ ] Backend environment variables set
- [ ] Backend logs show successful startup

### CORS Configuration (FastAPI)

Add this to your `backend/main.py` if not already present:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://skillbridge.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Vercel Setup

- [ ] Vercel account created (https://vercel.com)
- [ ] GitHub repository connected to Vercel
- [ ] Project imported to Vercel
- [ ] Build settings configured:
  - [ ] Build Command: `cd frontend && npm run build`
  - [ ] Output Directory: `frontend/.next`
  - [ ] Install Command: `cd frontend && npm install`

## Environment Variables in Vercel

In Vercel Dashboard → Settings → Environment Variables:

- [ ] `DATABASE_URL` = Your PostgreSQL connection string
- [ ] `PYTHON_BACKEND_URL` = Your deployed Python backend URL
- [ ] `NEXT_PUBLIC_API_URL` = Your Vercel URL (auto-filled)
- [ ] `NEXT_PUBLIC_PYTHON_BACKEND_URL` = Your Python backend URL
- [ ] All variables set for Production environment

## Initial Deployment

- [ ] Vercel deployment initiated
- [ ] Deployment completed without errors
- [ ] Build logs reviewed for warnings

## Post-Deployment

- [ ] Visit Vercel URL and confirm site loads
- [ ] Test homepage/dashboard functionality
- [ ] Test file upload feature
- [ ] Check browser console for errors (F12)
- [ ] Check Vercel Function logs for API errors
- [ ] Database migrations run (if using existing DB)
- [ ] Verify database connection works
- [ ] Test resume analysis end-to-end

### Verify Backend Connection

Add a test endpoint in your frontend to verify backend:

```typescript
// frontend/app/api/health/route.ts
export async function GET() {
  try {
    const response = await fetch(`${process.env.PYTHON_BACKEND_URL}/health`);
    return Response.json({ backendStatus: 'OK', timestamp: new Date() });
  } catch (error) {
    return Response.json({ backendStatus: 'ERROR' }, { status: 500 });
  }
}
```

## Monitoring & Maintenance

- [ ] Set up error monitoring (Vercel Analytics)
- [ ] Monitor database performance
- [ ] Set up alerts for failed deployments
- [ ] Regular database backups enabled
- [ ] Review logs weekly

## Rollback Plan

- [ ] Know how to revert to previous deployment
- [ ] Database backup before major changes
- [ ] Keep environment variables documented

## Domain Setup (Optional)

- [ ] Custom domain purchased
- [ ] Domain connected to Vercel
- [ ] SSL certificate enabled (automatic with Vercel)
- [ ] DNS records configured
- [ ] Test domain accessibility

## Performance Optimization

- [ ] Enable caching headers in `next.config.ts`
- [ ] Configure database connection pooling
- [ ] Set up CDN for static assets
- [ ] Monitor Core Web Vitals in Vercel Analytics

## Security

- [ ] Database credentials rotated (if using new DB)
- [ ] HTTPS enabled on all URLs
- [ ] CORS properly configured
- [ ] Rate limiting enabled on API routes
- [ ] No hardcoded secrets in code
- [ ] Environment variables use secrets manager

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check Python backend URL, ensure it's running |
| Database Connection Error | Verify DATABASE_URL, check IP whitelist |
| Build fails | Check Node version (need 18+), run `npm install` locally |
| API 404 errors | Verify PYTHON_BACKEND_URL is set and backend is running |
| Static assets not loading | Check image domains in `next.config.ts` |
| CORS errors in browser | Configure CORS in FastAPI backend |

## Useful Commands

```bash
# View deployment logs
vercel logs

# Pull environment variables locally
vercel env pull .env.production.local

# Run migrations on production DB
DATABASE_URL="your_url" npx prisma migrate deploy

# Trigger redeploy
vercel --prod

# View Vercel project info
vercel project info
```

## Support Links

- Vercel Status: https://www.vercelstatus.com
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Railway Docs: https://docs.railway.app
- Neon Docs: https://neon.tech/docs
- Prisma Docs: https://www.prisma.io/docs

---

**Last Updated**: February 7, 2026

**Deployment Status**: ⏳ Pending
