# SkillBridge - Quick Reference

## 🚀 Start Development (5 minutes)

### Terminal 1: Database
```bash
docker-compose up postgres
```

### Terminal 2: Python Backend
```bash
cd python-backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 3: Next.js Frontend
```bash
npm run dev
```

**URL**: http://localhost:3000

## 📋 Common Commands

### Dependency Management
```bash
npm install              # Install Node dependencies
npm update              # Update Node packages

cd python-backend
pip install -r requirements.txt  # Install Python packages
pip install package-name         # Add new Python package
```

### Database
```bash
npx prisma migrate dev --name name          # Create migration
npx prisma migrate deploy                    # Run migrations
npx prisma db seed                          # Seed database
npx prisma studio                           # Open database GUI
npx prisma generate                         # Generate Prisma client
```

### Development
```bash
npm run dev             # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint
npm run type-check      # Check TypeScript
npm run db:setup        # Setup database
npm run db:reset        # Reset database
npm run db:studio       # Open database Studio
```

## 🔍 Debugging

### Check Everything is Running
```bash
# Terminal 1: Check backend
curl http://localhost:8000/api/health

# Terminal 2: Check if port 3000 is free
netstat -ano | findstr :3000

# Browser: Check frontend
http://localhost:3000
```

### View Logs
- **Frontend**: Browser DevTools (F12) → Console
- **Backend**: Terminal output from `python -m uvicorn...`
- **Database**: `docker logs skillbridge-db`

### Force Reset
```bash
# Kill all processes and restart
docker-compose down
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| [.env.local](.env.local) | Environment config |
| [package.json](package.json) | NPM dependencies |
| [tsconfig.json](tsconfig.json) | TypeScript config |
| [app/dashboard/page.tsx](app/dashboard/page.tsx) | Main page |
| [lib/api/pythonClient.ts](lib/api/pythonClient.ts) | Backend client |
| [python-backend/main.py](python-backend/main.py) | Backend server |
| [python-backend/requirements.txt](python-backend/requirements.txt) | Python deps |

## 🐛 Quick Fixes

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Backend Connection Error
```bash
# Make sure backend is running
cd python-backend
python -m uvicorn main:app --reload

# Check it's working
curl http://localhost:8000/api/health
```

### Database Issues
```bash
# Start database
docker-compose up postgres

# Verify connection
psql -U skillbridge -d skillbridge -h localhost -p 5433

# Reset if broken
docker-compose down
docker volume rm skillbridge_postgres_data
docker-compose up postgres
npx prisma migrate deploy
```

### File Upload Not Working
1. Check browser console (F12)
2. Check backend logs for errors
3. Verify file is PDF or DOCX under 10MB
4. Check `.env.local` has correct `PYTHON_BACKEND_URL`

## 📚 Documentation Map

| Document | For |
|----------|-----|
| [README.md](README.md) | Overview |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | New developers |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Fixing issues |
| [FIX_SUMMARY.md](FIX_SUMMARY.md) | Understanding fixes |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Project health |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | This file |

## 🔧 Config Checklist

- [ ] Python installed (3.10+)
- [ ] Node.js installed (18+)
- [ ] Docker installed (optional but recommended)
- [ ] `.env.local` created
- [ ] `docker-compose up postgres` works
- [ ] `python -m uvicorn main:app` works
- [ ] `npm run dev` works
- [ ] `http://localhost:3000` loads

## 💡 Tips & Tricks

### Faster Reloads
```bash
# Use Turbopack for faster builds
npm run dev  # Already uses --turbopack

# Restart Python without full rebuild
# Just save a file in python-backend/ and it auto-reloads
```

### Debug Mode
```bash
# Add console.log in code
// Frontend (will show in browser console F12)
console.log('Debug:', variable);

// Backend (will show in terminal)
print(f"DEBUG: {variable}")
```

### Database Explorer
```bash
npx prisma studio
# Opens http://localhost:5555 to explore database visually
```

### Type Checking Before Commit
```bash
npm run type-check
# Saves you from runtime errors
```

## 🎯 Workflow Example

### Adding a New Feature
```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes
# Edit files...

# 3. Test locally
npm run dev
# Test in browser http://localhost:3000

# 4. Check for errors
npm run lint
npm run type-check

# 5. Commit
git add .
git commit -m "Add my feature"

# 6. Push
git push origin feature/my-feature
```

## 🚨 Emergency Commands

```bash
# Kill all Node processes (Windows)
taskkill /F /IM node.exe

# Kill all Python processes (Windows)
taskkill /F /IM python.exe

# Force remove volumes (WARNING: deletes data)
docker-compose down -v

# Clear npm cache
npm cache clean --force

# Clear Python cache
find . -type d -name __pycache__ -exec rm -r {} +
find . -type f -name "*.pyc" -delete
```

## 📊 Performance Tips

1. **Use Prisma Studio** instead of raw SQL
2. **Enable caching** for repeated requests
3. **Check bundle size**: `npm run build`
4. **Use DevTools** to find slow components
5. **Monitor API responses** in Network tab

## 🔐 Security Reminders

- ✅ Never commit `.env.local` to git
- ✅ Never hardcode API keys
- ✅ Always validate file uploads
- ✅ Always validate user input
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated

## 📞 Need Help?

1. **Setup issues**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. **Runtime issues**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. **Understanding code**: [FIX_SUMMARY.md](FIX_SUMMARY.md)
4. **Project overview**: [PROJECT_STATUS.md](PROJECT_STATUS.md)
5. **General info**: [README.md](README.md)

---

**Print this** → Save as PDF → Share with team

**Last Updated**: January 31, 2026
