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

def get_skill_resources(skill: str) -> Dict:
    """
    Get estimated time and resources for a specific skill.
    This acts as a mock database.
    """
    skill_lower = skill.lower()
    
    # Default fallback
    resources = {
        "estimated_time": "1-2 weeks",
        "description": f"Learn the fundamentals of {skill} and build a small project.",
        "resources": [
            {"title": f"{skill} Documentation", "url": f"https://www.google.com/search?q={skill}+documentation"},
            {"title": "FreeCodeCamp Guide", "url": f"https://www.freecodecamp.org/news/search/?query={skill}"}
        ]
    }
    
    # Specific overrides
    if "python" in skill_lower:
        resources["estimated_time"] = "3-4 weeks"
        resources["description"] = "Master Python syntax, data structures, and OOP concepts."
        resources["resources"] = [
            {"title": "Python.org", "url": "https://www.python.org/about/gettingstarted/"},
            {"title": "Real Python", "url": "https://realpython.com/"},
            {"title": "Automate the Boring Stuff", "url": "https://automatetheboringstuff.com/"}
        ]
    elif "react" in skill_lower:
        resources["estimated_time"] = "2-3 weeks"
        resources["description"] = "Learn Components, Hooks, State Management, and Next.js basics."
        resources["resources"] = [
            {"title": "React Docs", "url": "https://react.dev/"},
            {"title": "Fullstack Open", "url": "https://fullstackopen.com/en/"}
        ]
    elif "sql" in skill_lower or "database" in skill_lower:
        resources["estimated_time"] = "1-2 weeks"
        resources["description"] = "Understand relational DBs, SELECT queries, JOINs, and normalization."
        resources["resources"] = [
            {"title": "SQLZoo", "url": "https://sqlzoo.net/"},
            {"title": "Khan Academy SQL", "url": "https://www.khanacademy.org/computing/computer-programming/sql"}
        ]
    elif "docker" in skill_lower or "kubernetes" in skill_lower:
        resources["estimated_time"] = "1 week"
        resources["description"] = "Learn containerization, Dockerfiles, and basic orchestration."
        
    return resources

def generate_learning_roadmap(
    missing_skills: List[Dict[str, any]],
    current_score: int
) -> List[Dict]:
    """
    Generate a personalized structured learning roadmap.
    
    Returns:
        List of roadmap items with details
    """
    if not missing_skills:
        return []
    
    roadmap = []
    
    # Sort by priority (Critical > High > Medium)
    priority_order = {"Critical": 0, "High": 1, "Medium": 2}
    sorted_skills = sorted(missing_skills, key=lambda x: priority_order.get(x["priority"], 3))
    
    for item in sorted_skills:
        skill_name = item["skill"]
        details = get_skill_resources(skill_name)
        
        step = {
            "skill": skill_name,
            "priority": item["priority"],
            "estimated_time": details["estimated_time"],
            "description": details["description"],
            "resources": details["resources"]
        }
        roadmap.append(step)
            
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
