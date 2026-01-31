# SkillBridge - Troubleshooting Guide

## Common Issues and Solutions

### 1. File Upload Problems

#### Issue: "Backend service is not available"
**Cause**: Python backend is not running or not accessible

**Solution**:
```bash
# Start Python backend
cd python-backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Verify it's running
curl http://localhost:8000/api/health
```

#### Issue: "Invalid file type or file size exceeds limit"
**Cause**: File is not PDF/DOCX or larger than 10MB

**Solution**:
- Use only PDF or DOCX files
- Compress large documents
- Ensure file size is under 10MB

#### Issue: "Could not extract text from document"
**Cause**: PDF is image-based or corrupted

**Solution**:
- Try converting the PDF to text using an online tool
- Ensure PDF is not scanned image
- Try a different PDF reader to verify file integrity

### 2. Database Issues

#### Issue: "connection refused" to PostgreSQL
**Cause**: Database is not running

**Solution**:
```bash
# Start PostgreSQL with Docker
docker-compose up postgres

# Or if you have local PostgreSQL
# Windows
pg_ctl -D "C:\Program Files\PostgreSQL\16\data" start

# macOS
brew services start postgresql

# Linux
sudo service postgresql start
```

#### Issue: "column xxx does not exist"
**Cause**: Database schema is out of sync

**Solution**:
```bash
# Run migrations
npx prisma migrate deploy

# If that fails, reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

### 3. Backend Analysis Issues

#### Issue: "Error performing gap analysis"
**Cause**: Python backend error or incorrect data format

**Solution**:
1. Check Python backend logs for errors
2. Verify uploaded file extracted skills successfully
3. Make sure domain name matches exactly:
   - "Frontend Developer"
   - "Backend Developer"
   - "Data Analyst"
   - "Full Stack Developer"
   - "Mobile Developer"

#### Issue: Low readiness score for valid skills
**Cause**: Skills not matching market data exactly

**Solution**:
- The system uses fuzzy matching, but spellings matter
- Check if skill is in the market data
- Try simpler skill names (e.g., "React" instead of "React.js")

### 4. Port Conflicts

#### Issue: "Port 3000 already in use"
**Cause**: Another application is using the port

**Solution**:
```bash
# Windows - Find process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

#### Issue: "Port 8000 already in use"
**Cause**: Another Python application is running

**Solution**:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>

# Or use different port
python -m uvicorn main:app --port 8001
```

### 5. CORS Issues

#### Issue: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Cause**: Frontend and backend not configured for cross-origin requests

**Solution**:
1. Ensure Python backend CORS is properly configured
2. Check `PYTHON_BACKEND_URL` in `.env.local` matches actual backend URL
3. Restart both frontend and backend

### 6. Performance Issues

#### Issue: "Upload takes too long"
**Cause**: Large file or slow system

**Solution**:
- Split resume into multiple files
- Ensure file is properly formatted
- Check system disk space
- Clear browser cache (Ctrl+Shift+Del)

#### Issue: "Analysis is slow"
**Cause**: Large number of mock jobs or system limitations

**Solution**:
- Normal for first run due to NLP processing
- Subsequent requests should be faster due to caching
- Close other applications

### 7. Environment Configuration

#### Issue: "Cannot find environment variable"
**Cause**: `.env.local` not created or not loaded

**Solution**:
```bash
# Create .env.local from example
cp .env.example .env.local

# Edit with your values
# For development, defaults should work:
DATABASE_URL="postgresql://skillbridge:skillbridge123@localhost:5432/skillbridge"
PYTHON_BACKEND_URL="http://localhost:8000"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Restart Next.js development server after changing
```

### 8. Dependencies

#### Issue: "Module not found" or "dependency not installed"
**Cause**: Dependencies not properly installed

**Solution**:
```bash
# Clear and reinstall Node dependencies
rm -rf node_modules package-lock.json
npm install

# For Python
cd python-backend
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### 9. Type Errors

#### Issue: TypeScript errors after changes
**Cause**: Type mismatches or missing types

**Solution**:
```bash
# Check types
npm run type-check

# Generate types
npx prisma generate
```

### 10. Build Issues

#### Issue: "Build fails"
**Cause**: TypeScript errors or missing dependencies

**Solution**:
```bash
# Type check first
npm run type-check

# Clear build cache
rm -rf .next

# Rebuild
npm run build

# If still failing, check for console errors
npm run build -- --debug
```

## Getting Help

### Check Logs

**Next.js Console:**
- Open browser DevTools (F12)
- Check Console tab for errors

**Python Backend:**
- Terminal output shows FastAPI logs
- Check for stack traces

**Database:**
```bash
# View database contents
npx prisma studio

# Check recent logs
docker logs skillbridge-db
```

### Debug Mode

```bash
# Run with debug logging
npm run dev:debug

# Python with verbose logging
LOGLEVEL=DEBUG python -m uvicorn main:app --reload
```

## Still Having Issues?

1. **Check GitHub Issues**: Search existing issues in the repository
2. **Check Logs**: Look at browser console and backend logs
3. **Verify Setup**: Follow SETUP_GUIDE.md step by step
4. **Restart Services**: Stop and restart all services
5. **Check Versions**: Ensure Node.js 18+, Python 3.10+, PostgreSQL 16+

## Emergency Reset

If everything is broken, try a full reset:

```bash
# Stop all services
docker-compose down

# Clean Node
rm -rf node_modules package-lock.json
npm install

# Clean Python
cd python-backend
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt

# Clean database
docker-compose up postgres
docker exec skillbridge-db psql -U skillbridge -c "DROP DATABASE skillbridge;"
npx prisma migrate deploy

# Start fresh
# Terminal 1: cd python-backend && python -m uvicorn main:app --reload
# Terminal 2: npm run dev
```

---

**Last Updated**: January 31, 2026
