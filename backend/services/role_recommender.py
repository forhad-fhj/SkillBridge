"""
Role Recommender Service
Suggests suitable internship roles based on user's skills and readiness
"""

import json
import os
from typing import Dict, List
from services.nlp_engine import get_all_skills_flat, normalize_skill
import logging

logger = logging.getLogger(__name__)

# Cache for roles data
_roles_cache: List[Dict] = None


def get_roles_path() -> str:
    """Get the path to the internship roles JSON file."""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(current_dir, "..", "data", "internship_roles.json")


def load_roles() -> List[Dict]:
    """Load internship roles from JSON file with caching."""
    global _roles_cache
    
    if _roles_cache is not None:
        return _roles_cache
    
    try:
        roles_path = get_roles_path()
        with open(roles_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            _roles_cache = data.get("roles", [])
        logger.info(f"Loaded {len(_roles_cache)} internship roles")
        return _roles_cache
    except FileNotFoundError:
        logger.warning("Internship roles file not found")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Error parsing internship roles JSON: {e}")
        return []


def calculate_role_fit(
    user_skills: Dict[str, List[str]], 
    role: Dict
) -> Dict:
    """
    Calculate how well a user fits a specific role.
    
    Returns:
        Dictionary with fit score and skill analysis
    """
    user_flat = set(normalize_skill(s) for s in get_all_skills_flat(user_skills))
    
    required = set(normalize_skill(s) for s in role.get("requiredSkills", []))
    preferred = set(normalize_skill(s) for s in role.get("preferredSkills", []))
    
    # Calculate matches
    required_matched = user_flat.intersection(required)
    preferred_matched = user_flat.intersection(preferred)
    required_missing = required - user_flat
    
    # Calculate fit score (required skills weight more)
    required_score = (len(required_matched) / max(len(required), 1)) * 70
    preferred_score = (len(preferred_matched) / max(len(preferred), 1)) * 30
    fit_score = round(required_score + preferred_score)
    
    return {
        "fitScore": fit_score,
        "requiredMatched": list(required_matched),
        "requiredMissing": list(required_missing),
        "preferredMatched": list(preferred_matched),
        "requiredMatchCount": len(required_matched),
        "requiredTotalCount": len(required),
        "preferredMatchCount": len(preferred_matched),
        "preferredTotalCount": len(preferred)
    }


def recommend_roles(
    user_skills: Dict[str, List[str]],
    readiness_score: int,
    max_roles: int = 5
) -> List[Dict]:
    """
    Recommend suitable internship roles based on user's profile.
    
    Args:
        user_skills: User's categorized skills
        readiness_score: User's readiness score (0-100)
        max_roles: Maximum number of roles to recommend
        
    Returns:
        List of recommended roles with fit analysis
    """
    roles = load_roles()
    recommendations = []
    
    for role in roles:
        min_readiness = role.get("minReadiness", 0)
        
        # Calculate fit for each role
        fit_data = calculate_role_fit(user_skills, role)
        
        # Determine if role is suitable
        is_ready = readiness_score >= min_readiness
        is_stretch = (min_readiness <= readiness_score + 20) and not is_ready
        
        # Skip roles that are too far above the user's level
        if readiness_score < min_readiness - 20:
            continue
        
        recommendation = {
            "id": role.get("id"),
            "title": role.get("title"),
            "difficulty": role.get("difficulty"),
            "description": role.get("description"),
            "companyTypes": role.get("company_types", []),
            "avgSalary": role.get("avgSalary"),
            "growthPath": role.get("growthPath"),
            "requiredSkills": role.get("requiredSkills", []),
            "preferredSkills": role.get("preferredSkills", []),
            "minReadiness": min_readiness,
            "fitScore": fit_data["fitScore"],
            "requiredMatched": fit_data["requiredMatched"],
            "requiredMissing": fit_data["requiredMissing"],
            "preferredMatched": fit_data["preferredMatched"],
            "skillCoverage": f"{fit_data['requiredMatchCount']}/{fit_data['requiredTotalCount']}",
            "status": "Ready" if is_ready else ("Stretch Goal" if is_stretch else "Future"),
            "statusColor": "green" if is_ready else ("yellow" if is_stretch else "red")
        }
        
        recommendations.append(recommendation)
    
    # Sort by fit score (highest first), then by status priority
    status_order = {"Ready": 0, "Stretch Goal": 1, "Future": 2}
    recommendations.sort(
        key=lambda x: (-x["fitScore"], status_order.get(x["status"], 3))
    )
    
    return recommendations[:max_roles]


def get_role_by_id(role_id: str) -> Dict:
    """Get a specific role by ID."""
    roles = load_roles()
    for role in roles:
        if role.get("id") == role_id:
            return role
    return None


def get_all_roles() -> List[Dict]:
    """Get all available roles."""
    return load_roles()
