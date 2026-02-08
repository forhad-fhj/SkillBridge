"""
Job Fit Analyzer Service
Analyzes how well a user's resume matches a specific job description
"""

from typing import Dict, List, Tuple
from services.nlp_engine import (
    extract_skills_from_text,
    get_all_skills_flat,
    normalize_skill
)
from services.learning_resources import get_resources_for_skill
import re

# Common action verbs and keywords for ATS scoring
ATS_KEYWORDS = {
    "action_verbs": [
        "developed", "implemented", "designed", "created", "built", "managed",
        "led", "achieved", "improved", "optimized", "analyzed", "collaborated",
        "launched", "delivered", "architected", "deployed", "automated"
    ],
    "impact_words": [
        "increased", "reduced", "saved", "generated", "grew", "improved",
        "accelerated", "streamlined", "enhanced", "maximized", "minimized"
    ],
    "metrics_patterns": [
        r'\d+%', r'\$\d+', r'\d+\s*(users|customers|clients)',
        r'\d+x', r'\d+\s*(times|months|years|weeks|days)'
    ]
}


def extract_jd_skills(job_description: str) -> Dict[str, List[str]]:
    """
    Extract required skills from a job description text.
    
    Args:
        job_description: The raw job description text
        
    Returns:
        Dictionary of categorized skills found in the JD
    """
    return extract_skills_from_text(job_description)


def calculate_skill_match(
    user_skills: Dict[str, List[str]], 
    jd_skills: Dict[str, List[str]]
) -> Tuple[float, List[str], List[str], List[str]]:
    """
    Calculate how well user skills match job description skills.
    
    Returns:
        Tuple of (match_percentage, matched_skills, missing_skills, extra_skills)
    """
    # Flatten and normalize all skills
    user_flat = set(normalize_skill(s) for s in get_all_skills_flat(user_skills))
    jd_flat = set(normalize_skill(s) for s in get_all_skills_flat(jd_skills))
    
    if not jd_flat:
        return 100.0, list(user_flat), [], list(user_flat)
    
    # Find matches
    matched = user_flat.intersection(jd_flat)
    missing = jd_flat - user_flat
    extra = user_flat - jd_flat
    
    # Calculate match percentage
    match_percentage = (len(matched) / len(jd_flat)) * 100
    
    return (
        round(match_percentage, 1),
        sorted(list(matched)),
        sorted(list(missing)),
        sorted(list(extra))
    )


def calculate_ats_score(resume_text: str, job_description: str) -> Dict:
    """
    Calculate ATS (Applicant Tracking System) compatibility score.
    
    Analyzes:
    - Keyword matches
    - Action verbs usage
    - Quantifiable achievements
    - Skill keyword density
    """
    resume_lower = resume_text.lower()
    jd_lower = job_description.lower()
    
    scores = {
        "keyword_match": 0,
        "action_verbs": 0,
        "impact_words": 0,
        "metrics": 0
    }
    
    # Extract JD keywords and check in resume
    jd_words = set(re.findall(r'\b[a-z]{3,}\b', jd_lower))
    resume_words = set(re.findall(r'\b[a-z]{3,}\b', resume_lower))
    
    # Keyword overlap
    keyword_overlap = len(jd_words.intersection(resume_words))
    scores["keyword_match"] = min(100, (keyword_overlap / max(len(jd_words), 1)) * 150)
    
    # Action verbs in resume
    action_count = sum(1 for verb in ATS_KEYWORDS["action_verbs"] if verb in resume_lower)
    scores["action_verbs"] = min(100, (action_count / 5) * 100)
    
    # Impact words
    impact_count = sum(1 for word in ATS_KEYWORDS["impact_words"] if word in resume_lower)
    scores["impact_words"] = min(100, (impact_count / 3) * 100)
    
    # Metrics/quantifiable achievements
    metrics_found = sum(1 for pattern in ATS_KEYWORDS["metrics_patterns"] 
                       if re.search(pattern, resume_text))
    scores["metrics"] = min(100, (metrics_found / 2) * 100)
    
    # Overall ATS score (weighted average)
    overall = (
        scores["keyword_match"] * 0.4 +
        scores["action_verbs"] * 0.2 +
        scores["impact_words"] * 0.2 +
        scores["metrics"] * 0.2
    )
    
    return {
        "overallScore": round(overall),
        "breakdown": {
            "keywordMatch": round(scores["keyword_match"]),
            "actionVerbs": round(scores["action_verbs"]),
            "impactWords": round(scores["impact_words"]),
            "quantifiableResults": round(scores["metrics"])
        },
        "tips": generate_ats_tips(scores)
    }


def generate_ats_tips(scores: Dict) -> List[str]:
    """Generate improvement tips based on ATS analysis."""
    tips = []
    
    if scores["keyword_match"] < 60:
        tips.append("Add more keywords from the job description to your resume")
    
    if scores["action_verbs"] < 50:
        tips.append("Start bullet points with strong action verbs (developed, implemented, led)")
    
    if scores["impact_words"] < 50:
        tips.append("Include more impact words (improved, increased, reduced)")
    
    if scores["metrics"] < 50:
        tips.append("Add quantifiable achievements (percentages, numbers, metrics)")
    
    if not tips:
        tips.append("Great job! Your resume is well-optimized for ATS")
    
    return tips


def analyze_job_fit(
    user_skills: Dict[str, List[str]],
    job_description: str,
    resume_text: str = "",
    domain: str = ""
) -> Dict:
    """
    Comprehensive job fit analysis.
    
    Args:
        user_skills: User's extracted/categorized skills
        job_description: Target job description text
        resume_text: Optional raw resume text for ATS analysis
        domain: Optional domain context
        
    Returns:
        Complete job fit analysis results
    """
    # Extract skills from JD
    jd_skills = extract_jd_skills(job_description)
    
    # Calculate skill match
    match_pct, matched, missing, extra = calculate_skill_match(user_skills, jd_skills)
    
    # Calculate ATS score if resume text provided
    ats_result = None
    if resume_text:
        ats_result = calculate_ats_score(resume_text, job_description)
    
    # Get learning resources for missing skills
    missing_with_resources = []
    for skill in missing[:10]:  # Top 10 missing skills
        resources = get_resources_for_skill(skill, 2)
        missing_with_resources.append({
            "skill": skill,
            "resources": resources
        })
    
    # Determine fit level
    if match_pct >= 80:
        fit_level = "Excellent"
        fit_color = "green"
        fit_message = "You're a strong match for this role!"
    elif match_pct >= 60:
        fit_level = "Good"
        fit_color = "blue"
        fit_message = "You have most of the required skills"
    elif match_pct >= 40:
        fit_level = "Moderate"
        fit_color = "yellow"
        fit_message = "Consider upskilling in the missing areas"
    else:
        fit_level = "Needs Work"
        fit_color = "red"
        fit_message = "Focus on building the core required skills"
    
    return {
        "matchPercentage": match_pct,
        "fitLevel": fit_level,
        "fitColor": fit_color,
        "fitMessage": fit_message,
        "matchedSkills": matched,
        "matchedCount": len(matched),
        "missingSkills": missing,
        "missingCount": len(missing),
        "missingWithResources": missing_with_resources,
        "extraSkills": extra,
        "extraCount": len(extra),
        "jdSkillsExtracted": get_all_skills_flat(jd_skills),
        "jdSkillCount": len(get_all_skills_flat(jd_skills)),
        "atsScore": ats_result,
        "domain": domain
    }
