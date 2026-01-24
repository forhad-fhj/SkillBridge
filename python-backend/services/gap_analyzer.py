from typing import List, Dict, Tuple
from services.nlp_engine import (
    extract_skills_from_text,
    get_all_skills_flat,
    calculate_skill_frequency,
    normalize_skill
)

def calculate_readiness_score(
    user_skills: Dict[str, List[str]],
    market_skills_frequency: Dict[str, int]
) -> int:
    """
    Calculate internship readiness score (0-100) based on skill matching.
    
    Args:
        user_skills: User's categorized skills
        market_skills_frequency: Market demand for skills (skill -> count)
        
    Returns:
        Readiness score (0-100)
    """
    if not market_skills_frequency:
        return 0
    
    user_skills_flat = [normalize_skill(s) for s in get_all_skills_flat(user_skills)]
    
    if not user_skills_flat:
        return 0
    
    # Calculate weighted match score
    total_market_weight = sum(market_skills_frequency.values())
    matched_weight = 0
    
    for skill in user_skills_flat:
        if skill in market_skills_frequency:
            matched_weight += market_skills_frequency[skill]
    
    # Calculate percentage
    if total_market_weight > 0:
        score = int((matched_weight / total_market_weight) * 100)
        return min(score, 100)  # Cap at 100
    
    return 0

def identify_matched_skills(
    user_skills: Dict[str, List[str]],
    market_skills_frequency: Dict[str, int]
) -> List[Dict[str, any]]:
    """
    Identify skills that the user has and are in demand.
    
    Returns:
        List of matched skills with frequency data
    """
    user_skills_flat = [normalize_skill(s) for s in get_all_skills_flat(user_skills)]
    matched = []
    
    for skill in user_skills_flat:
        if skill in market_skills_frequency:
            matched.append({
                "skill": skill.title(),
                "frequency": market_skills_frequency[skill],
                "demand": "High" if market_skills_frequency[skill] >= 5 else "Medium"
            })
    
    # Sort by frequency (most in-demand first)
    matched.sort(key=lambda x: x["frequency"], reverse=True)
    return matched

def identify_missing_skills(
    user_skills: Dict[str, List[str]],
    market_skills_frequency: Dict[str, int],
    top_n: int = 10
) -> List[Dict[str, any]]:
    """
    Identify high-demand skills that the user is missing.
    
    Args:
        user_skills: User's categorized skills
        market_skills_frequency: Market demand for skills
        top_n: Number of top missing skills to return
        
    Returns:
        List of missing skills with priority
    """
    user_skills_flat = [normalize_skill(s) for s in get_all_skills_flat(user_skills)]
    missing = []
    
    for skill, frequency in market_skills_frequency.items():
        if skill not in user_skills_flat:
            priority = "Critical" if frequency >= 7 else "High" if frequency >= 4 else "Medium"
            missing.append({
                "skill": skill.title(),
                "frequency": frequency,
                "priority": priority
            })
    
    # Sort by frequency and return top N
    missing.sort(key=lambda x: x["frequency"], reverse=True)
    return missing[:top_n]

def generate_learning_roadmap(
    missing_skills: List[Dict[str, any]],
    current_score: int
) -> str:
    """
    Generate a personalized learning roadmap based on missing skills.
    
    Args:
        missing_skills: List of missing skills with priority
        current_score: Current readiness score
        
    Returns:
        Markdown-formatted learning roadmap
    """
    if not missing_skills:
        return "🎉 Congratulations! You have all the key skills in demand. Focus on building projects to showcase your expertise."
    
    roadmap = f"# Your Learning Roadmap\n\n"
    roadmap += f"**Current Readiness Score:** {current_score}%\n\n"
    
    # Calculate potential score increase
    potential_increase = min(30, len(missing_skills) * 3)
    roadmap += f"**Potential Score After Completion:** ~{min(current_score + potential_increase, 100)}%\n\n"
    
    roadmap += "## Priority Skills to Learn\n\n"
    
    # Group by priority
    critical = [s for s in missing_skills if s["priority"] == "Critical"]
    high = [s for s in missing_skills if s["priority"] == "High"]
    medium = [s for s in missing_skills if s["priority"] == "Medium"]
    
    if critical:
        roadmap += "### 🔴 Critical Priority (Learn First)\n"
        for i, skill in enumerate(critical, 1):
            roadmap += f"{i}. **{skill['skill']}** - Required in {skill['frequency']} job postings\n"
        roadmap += "\n"
    
    if high:
        roadmap += "### 🟡 High Priority (Learn Next)\n"
        for i, skill in enumerate(high, 1):
            roadmap += f"{i}. **{skill['skill']}** - Required in {skill['frequency']} job postings\n"
        roadmap += "\n"
    
    if medium:
        roadmap += "### 🟢 Medium Priority (Nice to Have)\n"
        for i, skill in enumerate(medium, 1):
            roadmap += f"{i}. **{skill['skill']}** - Required in {skill['frequency']} job postings\n"
        roadmap += "\n"
    
    roadmap += "## Recommended Learning Path\n\n"
    roadmap += "1. **Start with Critical Priority skills** - These appear most frequently in job postings\n"
    roadmap += "2. **Build projects** - Apply each skill in a real project\n"
    roadmap += "3. **Update your CV** - Add new skills as you learn them\n"
    roadmap += "4. **Re-analyze** - Check your progress and updated readiness score\n"
    
    return roadmap

def analyze_gap(
    user_skills: Dict[str, List[str]],
    job_descriptions: List[Dict]
) -> Dict:
    """
    Perform comprehensive gap analysis.
    
    Args:
        user_skills: User's categorized skills
        job_descriptions: List of job postings with extracted skills
        
    Returns:
        Complete analysis results
    """
    # Calculate market skill frequency
    market_frequency = calculate_skill_frequency(job_descriptions)
    
    # Calculate readiness score
    readiness_score = calculate_readiness_score(user_skills, market_frequency)
    
    # Identify matched and missing skills
    matched_skills = identify_matched_skills(user_skills, market_frequency)
    missing_skills = identify_missing_skills(user_skills, market_frequency)
    
    # Generate roadmap
    roadmap = generate_learning_roadmap(missing_skills, readiness_score)
    
    return {
        "readinessScore": readiness_score,
        "matchedSkills": matched_skills,
        "missingSkills": missing_skills,
        "generatedRoadmap": roadmap,
        "totalMarketSkills": len(market_frequency),
        "userSkillCount": len(get_all_skills_flat(user_skills))
    }
