"""
Learning Resource Service
Provides curated learning resources for skill development
"""

import json
import os
from typing import Dict, List, Optional
import logging

logger = logging.getLogger(__name__)

# Load resources from JSON file
_resources_cache: Optional[Dict] = None

def get_resources_path() -> str:
    """Get the path to the learning resources JSON file."""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(current_dir, "..", "data", "learning_resources.json")

def load_resources() -> Dict:
    """Load learning resources from JSON file with caching."""
    global _resources_cache
    
    if _resources_cache is not None:
        return _resources_cache
    
    try:
        resources_path = get_resources_path()
        with open(resources_path, 'r', encoding='utf-8') as f:
            _resources_cache = json.load(f)
        logger.info(f"Loaded {len(_resources_cache)} skill resources")
        return _resources_cache
    except FileNotFoundError:
        logger.warning("Learning resources file not found, using empty dict")
        return {}
    except json.JSONDecodeError as e:
        logger.error(f"Error parsing learning resources JSON: {e}")
        return {}

def normalize_skill_key(skill: str) -> str:
    """Normalize skill name to match resource keys."""
    return skill.lower().strip().replace('.js', '').replace('.', '')

def get_resources_for_skill(skill: str, max_resources: int = 3) -> List[Dict]:
    """
    Get learning resources for a specific skill.
    
    Args:
        skill: The skill name to get resources for
        max_resources: Maximum number of resources to return
        
    Returns:
        List of resource dictionaries
    """
    resources = load_resources()
    skill_key = normalize_skill_key(skill)
    
    # Try exact match first
    if skill_key in resources:
        return resources[skill_key].get("resources", [])[:max_resources]
    
    # Try partial match
    for key, value in resources.items():
        if skill_key in key or key in skill_key:
            return value.get("resources", [])[:max_resources]
    
    # Return generic learning suggestion
    return [
        {
            "title": f"Search for {skill} tutorials",
            "platform": "Google",
            "url": f"https://www.google.com/search?q={skill.replace(' ', '+')}+tutorial",
            "difficulty": "Varies",
            "duration": "Self-paced",
            "type": "search"
        }
    ]

def get_resources_for_skills(skills: List[str], max_per_skill: int = 2) -> Dict[str, List[Dict]]:
    """
    Get learning resources for multiple skills.
    
    Args:
        skills: List of skill names
        max_per_skill: Maximum resources per skill
        
    Returns:
        Dictionary mapping skill names to their resources
    """
    result = {}
    for skill in skills:
        result[skill] = get_resources_for_skill(skill, max_per_skill)
    return result

def get_priority_learning_path(
    missing_skills: List[Dict],
    max_skills: int = 5,
    max_resources_per_skill: int = 2
) -> List[Dict]:
    """
    Generate a prioritized learning path based on missing skills.
    
    Args:
        missing_skills: List of missing skill dicts with 'skill' and 'priority' keys
        max_skills: Maximum number of skills to include
        max_resources_per_skill: Resources per skill
        
    Returns:
        List of skill learning items with resources
    """
    # Sort by priority (Critical > High > Medium)
    priority_order = {"Critical": 0, "High": 1, "Medium": 2}
    sorted_skills = sorted(
        missing_skills,
        key=lambda x: priority_order.get(x.get("priority", "Medium"), 3)
    )[:max_skills]
    
    learning_path = []
    for skill_item in sorted_skills:
        skill_name = skill_item.get("skill", "")
        resources = get_resources_for_skill(skill_name, max_resources_per_skill)
        
        learning_path.append({
            "skill": skill_name,
            "priority": skill_item.get("priority", "Medium"),
            "frequency": skill_item.get("frequency", 0),
            "resources": resources,
            "estimatedTime": _estimate_learning_time(resources)
        })
    
    return learning_path

def _estimate_learning_time(resources: List[Dict]) -> str:
    """Estimate total learning time based on resources."""
    total_hours = 0
    for resource in resources:
        duration = resource.get("duration", "")
        if "hour" in duration.lower():
            try:
                hours = float(duration.split()[0])
                total_hours += hours
            except (ValueError, IndexError):
                pass
    
    if total_hours == 0:
        return "Self-paced"
    elif total_hours < 5:
        return f"~{int(total_hours)} hours"
    elif total_hours < 20:
        return f"~{int(total_hours)} hours (1-2 weeks)"
    else:
        return f"~{int(total_hours)} hours (2-4 weeks)"

def get_all_available_skills() -> List[str]:
    """Get list of all skills that have learning resources."""
    resources = load_resources()
    return [data.get("skill", key) for key, data in resources.items()]
