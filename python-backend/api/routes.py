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
    jobDescriptions: List[Dict]
    domain: Optional[str] = None

class GapAnalysisResponse(BaseModel):
    readinessScore: int
    matchedSkills: List[Dict]
    missingSkills: List[Dict]
    generatedRoadmap: str
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
        if not request.userSkills:
            raise HTTPException(status_code=400, detail="User skills cannot be empty")
        
        if not request.jobDescriptions:
            raise HTTPException(status_code=400, detail="Job descriptions cannot be empty")
        
        # Perform gap analysis
        analysis = analyze_gap(request.userSkills, request.jobDescriptions)
        
        return analysis
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error performing gap analysis: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "SkillBridge NLP API"}
