from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from services.document_parser import parse_document, clean_text
from services.nlp_engine import extract_skills_from_text
from services.gap_analyzer import analyze_gap

router = APIRouter()

# Request/Response Models
class SkillExtractionRequest(BaseModel):
    text: str

class SkillExtractionResponse(BaseModel):
    skills: Dict[str, List[str]]
    totalSkills: int

class GapAnalysisRequest(BaseModel):
    userSkills: Dict[str, List[str]]
    jobDescriptions: Optional[List[Dict]] = None
    domain: Optional[str] = "Frontend Developer"

class GapAnalysisResponse(BaseModel):
    readinessScore: int
    matchedSkills: List[Dict]
    missingSkills: List[Dict]
    generatedRoadmap: List[Dict]
    totalMarketSkills: int
    userSkillCount: int

# Routes
@router.post("/parse-document", response_model=SkillExtractionResponse)
async def parse_document_endpoint(file: UploadFile = File(...)):
    """
    Upload and parse a CV/resume document (PDF or DOCX).
    Extracts text and identifies technical skills.
    """
    try:
        # Read file content
        file_bytes = await file.read()
        
        # Parse document
        text = parse_document(file_bytes, file.filename)
        
        if not text:
            raise HTTPException(status_code=400, detail="Could not extract text from document")
        
        # Clean text
        cleaned_text = clean_text(text)
        
        # Extract skills
        skills = extract_skills_from_text(cleaned_text)
        
        # Count total skills
        total_skills = sum(len(skill_list) for skill_list in skills.values())
        
        return {
            "skills": skills,
            "totalSkills": total_skills
        }
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")

@router.post("/extract-skills", response_model=SkillExtractionResponse)
async def extract_skills_endpoint(request: SkillExtractionRequest):
    """
    Extract technical skills from plain text.
    """
    try:
        if not request.text:
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Extract skills
        skills = extract_skills_from_text(request.text)
        
        # Count total skills
        total_skills = sum(len(skill_list) for skill_list in skills.values())
        
        return {
            "skills": skills,
            "totalSkills": total_skills
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting skills: {str(e)}")

@router.post("/analyze-gap", response_model=GapAnalysisResponse)
async def analyze_gap_endpoint(request: GapAnalysisRequest):
    """
    Perform gap analysis between user skills and market demand.
    Returns readiness score, matched/missing skills, and learning roadmap.
    """
    try:
        if request.userSkills is None:
             raise HTTPException(status_code=400, detail="User skills cannot be None")

        print(f"DEBUG: Analyzying Gap for Domain: '{request.domain}'")
        
        # Use provided job descriptions or mock data based on domain
        jobs = request.jobDescriptions
        
        if not jobs:
            # MOCK DATA CACHE (In production, fetch from DB)
            mock_jobs_db = {
                "Frontend Developer": [
                    {"skills": ["React", "JavaScript", "CSS", "HTML", "TypeScript", "Tailwind", "Next.js", "Redux", "Git"]},
                    {"skills": ["Vue", "JavaScript", "HTML", "CSS", "Sass", "Webpack"]},
                    {"skills": ["React", "TypeScript", "MaterialUI", "Jest", "GraphQL"]},
                    {"skills": ["Angular", "TypeScript", "RxJS", "HTML", "SCSS"]},
                    {"skills": ["JavaScript", "React", "Node.js", "CSS", "Figma"]}
                ] * 20, # Multiply to simulate volume
                
                "Backend Developer": [
                    {"skills": ["Python", "Django", "SQL", "PostgreSQL", "Docker", "AWS", "Git", "Redis"]},
                    {"skills": ["Node.js", "Express", "MongoDB", "JavaScript", "TypeScript", "REST API"]},
                    {"skills": ["Java", "Spring Boot", "MySQL", "Microservices", "Kafka"]},
                    {"skills": ["Go", "PostgreSQL", "Docker", "Kubernetes", "gRPC"]},
                    {"skills": ["Python", "Flask", "SQLAlchemy", "Celery", "RabbitMQ"]}
                ] * 20,
                
                "Data Analyst": [
                    {"skills": ["Python", "Pandas", "NumPy", "SQL", "Tableau", "Excel", "Statistics"]},
                    {"skills": ["R", "SQL", "PowerBI", "Data Visualization", "Excel"]},
                    {"skills": ["Python", "SQL", "Machine Learning", "Scikit-Learn", "Jupyter"]},
                    {"skills": ["Excel", "VBA", "SQL", "Reporting", "Google Sheets"]},
                    {"skills": ["Python", "Spark", "Hadoop", "SQL", "AWS"]}
                ] * 20,

                "Full Stack Developer": [
                    {"skills": ["React", "Node.js", "Express", "MongoDB", "JavaScript", "TypeScript", "HTML", "CSS"]},
                    {"skills": ["Vue", "Laravel", "PHP", "MySQL", "JavaScript", "Tailwind"]},
                    {"skills": ["Next.js", "PostgreSQL", "Prisma", "TypeScript", "Tailwind", "Vercel"]},
                    {"skills": ["Angular", "Java", "Spring Boot", "SQL", "TypeScript"]},
                    {"skills": ["MERN Stack", "AWS", "Docker", "Git", "CI/CD"]}
                ] * 20,

                "Mobile Developer": [
                    {"skills": ["Flutter", "Dart", "Firebase", "Android", "iOS"]},
                    {"skills": ["React Native", "JavaScript", "TypeScript", "Redux", "Mobile UI"]},
                    {"skills": ["Swift", "iOS", "Xcode", "CoreData", "SwiftUI"]},
                    {"skills": ["Kotlin", "Android", "Jetpack Compose", "Java", "Gradle"]},
                    {"skills": ["Flutter", "Bloc", "Clean Architecture", "Git", "App Store"]}
                ] * 20
            }
            
            # Default to Frontend if domain not found
            # Use strict matching or default to Frontend
            jobs = mock_jobs_db.get(request.domain)
            if not jobs: 
                jobs = mock_jobs_db["Frontend Developer"]
        
        # Perform gap analysis
        analysis = analyze_gap(request.userSkills, jobs)
        
        return analysis
    
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error performing gap analysis: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "SkillBridge NLP API"}
