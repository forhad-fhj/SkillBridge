from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from services.document_parser import parse_document, clean_text
from services.nlp_engine import extract_skills_from_text
from services.gap_analyzer import analyze_gap
from services.job_fit_analyzer import analyze_job_fit
from services.role_recommender import recommend_roles
from services.resume_feedback import analyze_resume_quality
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Cache for mock jobs data
_mock_jobs_cache = None

def get_mock_jobs():
    """Get or create cached mock jobs data."""
    global _mock_jobs_cache
    if _mock_jobs_cache is not None:
        return _mock_jobs_cache
    
    _mock_jobs_cache = {
        "Frontend Developer": [
            {"skills": ["React", "JavaScript", "CSS", "HTML", "TypeScript", "Tailwind", "Next.js", "Redux", "Git"]},
            {"skills": ["Vue", "JavaScript", "HTML", "CSS", "Sass", "Webpack"]},
            {"skills": ["React", "TypeScript", "MaterialUI", "Jest", "GraphQL"]},
            {"skills": ["Angular", "TypeScript", "RxJS", "HTML", "SCSS"]},
            {"skills": ["JavaScript", "React", "Node.js", "CSS", "Figma"]}
        ] * 20,
        
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
    return _mock_jobs_cache

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

class JobFitRequest(BaseModel):
    userSkills: Dict[str, List[str]]
    jobDescription: str
    resumeText: Optional[str] = ""
    domain: Optional[str] = ""

class RoleRecommendRequest(BaseModel):
    userSkills: Dict[str, List[str]]
    readinessScore: int
    maxRoles: Optional[int] = 5

class ResumeFeedbackRequest(BaseModel):
    resumeText: str

# Routes
@router.post("/parse-document", response_model=SkillExtractionResponse)
async def parse_document_endpoint(file: UploadFile = File(...)):
    """
    Upload and parse a CV/resume document (PDF or DOCX).
    Extracts text and identifies technical skills.
    """
    try:
        logger.info(f"Parsing document: {file.filename}")
        
        # Validate file type
        allowed_types = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if file.content_type not in allowed_types:
            raise ValueError(f"Unsupported file type: {file.content_type}")
        
        # Read file content
        file_bytes = await file.read()
        
        if not file_bytes:
            raise ValueError("File is empty")
        
        # Parse document
        text = parse_document(file_bytes, file.filename)
        
        if not text or len(text.strip()) < 50:
            raise ValueError("Could not extract sufficient text from document")
        
        # Clean text
        cleaned_text = clean_text(text)
        
        # Extract skills
        skills = extract_skills_from_text(cleaned_text)
        
        # Count total skills
        total_skills = sum(len(skill_list) for skill_list in skills.values())
        
        logger.info(f"Successfully extracted {total_skills} skills from {file.filename}")
        
        return {
            "skills": skills,
            "totalSkills": total_skills
        }
    
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error processing document: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")

@router.post("/extract-skills", response_model=SkillExtractionResponse)
async def extract_skills_endpoint(request: SkillExtractionRequest):
    """
    Extract technical skills from plain text.
    """
    try:
        if not request.text or len(request.text.strip()) < 10:
            raise ValueError("Text is too short")
        
        # Extract skills
        skills = extract_skills_from_text(request.text)
        
        # Count total skills
        total_skills = sum(len(skill_list) for skill_list in skills.values())
        
        return {
            "skills": skills,
            "totalSkills": total_skills
        }
    
    except Exception as e:
        logger.error(f"Error extracting skills: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error extracting skills: {str(e)}")

@router.post("/analyze-gap", response_model=GapAnalysisResponse)
async def analyze_gap_endpoint(request: GapAnalysisRequest):
    """
    Perform gap analysis between user skills and market demand.
    Returns readiness score, matched/missing skills, and learning roadmap.
    """
    try:
        if request.userSkills is None:
            raise ValueError("User skills cannot be None")

        logger.info(f"Analyzing gap for domain: '{request.domain}'")
        
        # Use provided job descriptions or mock data based on domain
        jobs = request.jobDescriptions
        
        if not jobs:
            # Use cached mock jobs
            mock_jobs = get_mock_jobs()
            jobs = mock_jobs.get(request.domain) or mock_jobs.get("Frontend Developer")
        
        # Perform gap analysis
        analysis = analyze_gap(request.userSkills, jobs)
        
        logger.info(f"Gap analysis completed. Readiness score: {analysis.get('readinessScore')}")
        
        return analysis
    
    except Exception as e:
        logger.error(f"Error performing gap analysis: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error performing gap analysis: {str(e)}")

@router.post("/analyze-job-fit")
async def analyze_job_fit_endpoint(request: JobFitRequest):
    """
    Analyze how well a user's resume matches a specific job description.
    
    Returns:
    - Match percentage
    - Matched/missing/extra skills
    - ATS compatibility score
    - Improvement tips
    """
    try:
        logger.info(f"Analyzing job fit for domain: {request.domain}")
        
        if not request.jobDescription or len(request.jobDescription.strip()) < 50:
            raise ValueError("Job description is too short. Please provide more details.")
        
        result = analyze_job_fit(
            user_skills=request.userSkills,
            job_description=request.jobDescription,
            resume_text=request.resumeText or "",
            domain=request.domain or ""
        )
        
        logger.info(f"Job fit analysis completed. Match: {result.get('matchPercentage')}%")
        
        return result
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error analyzing job fit: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error analyzing job fit: {str(e)}")

@router.post("/recommend-roles")
async def recommend_roles_endpoint(request: RoleRecommendRequest):
    """
    Recommend suitable internship roles based on user's skills and readiness.
    
    Returns:
    - List of recommended roles with fit scores
    - Skill coverage analysis
    - Growth path information
    """
    try:
        logger.info(f"Recommending roles for readiness score: {request.readinessScore}")
        
        recommendations = recommend_roles(
            user_skills=request.userSkills,
            readiness_score=request.readinessScore,
            max_roles=request.maxRoles or 5
        )
        
        logger.info(f"Generated {len(recommendations)} role recommendations")
        
        return {
            "recommendations": recommendations,
            "count": len(recommendations)
        }
    
    except Exception as e:
        logger.error(f"Error recommending roles: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error recommending roles: {str(e)}")

@router.post("/resume-feedback")
async def resume_feedback_endpoint(request: ResumeFeedbackRequest):
    """
    Analyze resume quality and provide detailed feedback.
    
    Returns:
    - Overall quality score
    - Action verb analysis
    - Soft skills detection
    - Quantified achievements
    - Bullet point quality
    """
    try:
        logger.info("Analyzing resume quality...")
        
        if not request.resumeText or len(request.resumeText.strip()) < 100:
            raise ValueError("Resume text is too short for meaningful analysis.")
        
        result = analyze_resume_quality(request.resumeText)
        
        logger.info(f"Resume analysis completed. Quality: {result.get('qualityLevel')}")
        
        return result
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error analyzing resume: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error analyzing resume: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "SkillBridge NLP API"}



