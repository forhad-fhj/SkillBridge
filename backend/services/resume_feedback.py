"""
Resume Feedback Analyzer Service
Provides AI-driven feedback on resume quality, structure, and content
"""

import re
from typing import Dict, List, Tuple
from services.nlp_engine import extract_skills_from_text
import logging

logger = logging.getLogger(__name__)

# Strong action verbs categorized by impact
ACTION_VERBS = {
    "leadership": [
        "led", "managed", "directed", "coordinated", "supervised", "mentored",
        "guided", "headed", "oversaw", "orchestrated", "spearheaded"
    ],
    "achievement": [
        "achieved", "accomplished", "exceeded", "delivered", "completed",
        "earned", "attained", "won", "secured", "obtained"
    ],
    "creation": [
        "created", "designed", "developed", "built", "established",
        "founded", "initiated", "invented", "launched", "pioneered"
    ],
    "improvement": [
        "improved", "enhanced", "optimized", "streamlined", "accelerated",
        "increased", "boosted", "strengthened", "upgraded", "refined"
    ],
    "analysis": [
        "analyzed", "evaluated", "assessed", "researched", "investigated",
        "examined", "studied", "reviewed", "identified", "discovered"
    ],
    "technical": [
        "implemented", "engineered", "programmed", "automated", "integrated",
        "deployed", "configured", "architected", "debugged", "refactored"
    ],
    "communication": [
        "presented", "communicated", "negotiated", "collaborated", "partnered",
        "facilitated", "liaised", "advocated", "persuaded", "influenced"
    ]
}

# Soft skills patterns
SOFT_SKILLS_PATTERNS = {
    "communication": [
        r'\b(communicated?|presented?|collaborated?|teamwork|verbal|written)\b',
        r'\b(interpersonal|public.?speaking|articulate|listening)\b'
    ],
    "leadership": [
        r'\b(led|lead|managed?|supervised?|mentored?|coached?)\b',
        r'\b(leadership|team.?lead|decision.?making|delegat\w+)\b'
    ],
    "problem_solving": [
        r'\b(solved?|problem.?solving|troubleshoot\w*|debugg\w+)\b',
        r'\b(critical.?thinking|analytical|solution\w*|resolv\w+)\b'
    ],
    "adaptability": [
        r'\b(adapt\w+|flexible|versatile|quick.?learn\w*|agile)\b',
        r'\b(cross.?functional|multi.?task\w*|fast.?paced)\b'
    ],
    "time_management": [
        r'\b(deadline|time.?management|prioritiz\w+|organization)\b',
        r'\b(efficient|productivity|schedul\w+|punctual)\b'
    ],
    "creativity": [
        r'\b(creative?|innovate?\w*|design\w*|ideation)\b',
        r'\b(brainstorm\w*|original|novel|inventive)\b'
    ],
    "teamwork": [
        r'\b(team\w*|collaborat\w+|cooperat\w+|partner\w*)\b',
        r'\b(cross.?team|group.?project|collective)\b'
    ]
}

# Quality metrics patterns
METRICS_PATTERNS = [
    (r'(\d+)\s*%', 'percentage'),
    (r'\$\s*(\d+[\d,]*)', 'monetary'),
    (r'(\d+[\d,]*)\s*(users?|customers?|clients?|visitors?)', 'users'),
    (r'(\d+[\d,]*)\s*(projects?|applications?|features?)', 'projects'),
    (r'(\d+)x\s*', 'multiplier'),
    (r'(\d+)\s*(hours?|days?|weeks?|months?)', 'time'),
    (r'top\s*(\d+)', 'ranking'),
    (r'(\d+)\s*(team|members?|people)', 'team_size')
]


def analyze_action_verbs(text: str) -> Dict:
    """Analyze usage of action verbs in resume."""
    text_lower = text.lower()
    words = set(re.findall(r'\b[a-z]+\b', text_lower))
    
    found_verbs = {}
    total_found = 0
    
    for category, verbs in ACTION_VERBS.items():
        matched = [v for v in verbs if v in words]
        found_verbs[category] = matched
        total_found += len(matched)
    
    # Calculate score
    max_score = 100
    score = min(100, (total_found / 10) * 100)  # 10 verbs for max score
    
    # Generate feedback
    weak_categories = [cat for cat, verbs in found_verbs.items() if len(verbs) < 2]
    
    return {
        "score": round(score),
        "totalFound": total_found,
        "byCategory": {k: {"count": len(v), "examples": v[:3]} for k, v in found_verbs.items()},
        "weakCategories": weak_categories,
        "feedback": generate_verb_feedback(score, weak_categories)
    }


def generate_verb_feedback(score: int, weak_categories: List[str]) -> List[str]:
    """Generate actionable feedback for action verbs."""
    feedback = []
    
    if score < 30:
        feedback.append("⚠️ Your resume lacks strong action verbs. Start bullet points with powerful verbs like 'Led', 'Developed', 'Achieved'.")
    elif score < 60:
        feedback.append("📝 Good use of some action verbs. Try to diversify with more leadership and achievement verbs.")
    else:
        feedback.append("✅ Excellent use of action verbs throughout your resume!")
    
    if "leadership" in weak_categories:
        feedback.append("💡 Add leadership verbs: Led, Managed, Mentored, Coordinated")
    if "achievement" in weak_categories:
        feedback.append("💡 Highlight achievements: Achieved, Delivered, Exceeded, Accomplished")
    if "technical" in weak_categories:
        feedback.append("💡 Include technical verbs: Implemented, Developed, Engineered, Deployed")
    
    return feedback


def detect_soft_skills(text: str) -> Dict:
    """Detect soft skills mentioned in resume."""
    text_lower = text.lower()
    detected = {}
    total_evidence = 0
    
    for skill, patterns in SOFT_SKILLS_PATTERNS.items():
        matches = []
        for pattern in patterns:
            found = re.findall(pattern, text_lower, re.IGNORECASE)
            matches.extend(found)
        
        if matches:
            detected[skill] = {
                "found": True,
                "evidence": list(set(matches))[:5],
                "strength": "Strong" if len(matches) >= 3 else "Moderate" if len(matches) >= 1 else "Weak"
            }
            total_evidence += len(matches)
        else:
            detected[skill] = {
                "found": False,
                "evidence": [],
                "strength": "Not Found"
            }
    
    # Calculate overall soft skills score
    found_count = sum(1 for s in detected.values() if s["found"])
    score = round((found_count / len(SOFT_SKILLS_PATTERNS)) * 100)
    
    return {
        "score": score,
        "totalDetected": found_count,
        "totalPossible": len(SOFT_SKILLS_PATTERNS),
        "skills": detected,
        "feedback": generate_soft_skills_feedback(detected)
    }


def generate_soft_skills_feedback(detected: Dict) -> List[str]:
    """Generate feedback for soft skills."""
    feedback = []
    missing = [k for k, v in detected.items() if not v["found"]]
    
    if len(missing) == 0:
        feedback.append("✅ Excellent! You've demonstrated all key soft skills.")
    elif len(missing) <= 2:
        feedback.append(f"👍 Good soft skills coverage. Consider adding evidence for: {', '.join(missing)}")
    else:
        feedback.append(f"⚠️ Missing key soft skills: {', '.join(missing[:4])}")
    
    # Specific suggestions
    skill_suggestions = {
        "communication": "Add examples of presentations, documentation, or stakeholder interactions",
        "leadership": "Mention times you led projects, mentored others, or made key decisions",
        "problem_solving": "Describe specific problems you solved and the approach used",
        "teamwork": "Highlight collaborative projects and cross-team work"
    }
    
    for skill in missing[:2]:
        if skill in skill_suggestions:
            feedback.append(f"💡 {skill.title()}: {skill_suggestions[skill]}")
    
    return feedback


def analyze_quantified_achievements(text: str) -> Dict:
    """Analyze presence of quantified achievements."""
    found_metrics = []
    
    for pattern, metric_type in METRICS_PATTERNS:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            if isinstance(match, tuple):
                match = match[0]
            found_metrics.append({
                "type": metric_type,
                "value": match
            })
    
    # Calculate score (max 5 metrics for full score)
    score = min(100, (len(found_metrics) / 5) * 100)
    
    return {
        "score": round(score),
        "totalFound": len(found_metrics),
        "metrics": found_metrics[:10],  # Limit to 10
        "feedback": generate_metrics_feedback(score, len(found_metrics))
    }


def generate_metrics_feedback(score: int, count: int) -> List[str]:
    """Generate feedback for quantified achievements."""
    feedback = []
    
    if count == 0:
        feedback.append("⚠️ No quantified achievements found! Add numbers to demonstrate impact.")
        feedback.append("💡 Examples: 'Increased performance by 40%', 'Led team of 5', 'Reduced costs by $10K'")
    elif count < 3:
        feedback.append("📝 Some metrics found. Add more numbers to strengthen impact.")
        feedback.append("💡 Try to include at least one metric per job experience.")
    else:
        feedback.append("✅ Good use of quantified achievements!")
    
    return feedback


def analyze_bullet_points(text: str) -> Dict:
    """Analyze quality of bullet points in resume."""
    # Find lines that look like bullet points
    bullets = re.findall(r'[•\-\*]\s*(.+)', text)
    
    if not bullets:
        # Try to detect sentences that could be bullet points
        sentences = re.findall(r'[A-Z][^.!?]*[.!?]', text)
        bullets = [s for s in sentences if len(s.split()) >= 5][:15]
    
    analysis = {
        "totalBullets": len(bullets),
        "quality": [],
        "issues": []
    }
    
    good_count = 0
    for bullet in bullets[:10]:  # Analyze first 10
        issues = []
        score = 100
        
        # Check length
        words = len(bullet.split())
        if words < 5:
            issues.append("Too short")
            score -= 20
        elif words > 25:
            issues.append("Too long")
            score -= 10
        
        # Check for action verb start
        first_word = bullet.split()[0].lower() if bullet.split() else ""
        has_action_verb = any(first_word in verbs for verbs in ACTION_VERBS.values())
        if not has_action_verb:
            issues.append("Doesn't start with action verb")
            score -= 20
        
        # Check for metrics
        has_metrics = bool(re.search(r'\d+', bullet))
        if has_metrics:
            score += 10
        
        if score >= 70:
            good_count += 1
        
        analysis["quality"].append({
            "text": bullet[:100] + "..." if len(bullet) > 100 else bullet,
            "score": max(0, min(100, score)),
            "issues": issues,
            "hasMetrics": has_metrics
        })
    
    # Overall score
    analysis["overallScore"] = round((good_count / max(len(bullets[:10]), 1)) * 100)
    analysis["feedback"] = generate_bullet_feedback(analysis["overallScore"], analysis["quality"])
    
    return analysis


def generate_bullet_feedback(score: int, quality: List[Dict]) -> List[str]:
    """Generate feedback for bullet points."""
    feedback = []
    
    if score >= 70:
        feedback.append("✅ Your bullet points are well-structured!")
    elif score >= 50:
        feedback.append("📝 Bullet points are decent but could be improved.")
    else:
        feedback.append("⚠️ Bullet points need significant improvement.")
    
    # Common issues
    issues_count = {}
    for q in quality:
        for issue in q.get("issues", []):
            issues_count[issue] = issues_count.get(issue, 0) + 1
    
    if issues_count.get("Doesn't start with action verb", 0) > 2:
        feedback.append("💡 Start each bullet with a strong action verb (Developed, Led, Created)")
    
    if issues_count.get("Too short", 0) > 2:
        feedback.append("💡 Expand short bullets with more context and results")
    
    metrics_count = sum(1 for q in quality if q.get("hasMetrics"))
    if metrics_count < len(quality) / 2:
        feedback.append("💡 Add more quantifiable results (numbers, percentages, metrics)")
    
    return feedback


def analyze_resume_quality(resume_text: str) -> Dict:
    """
    Comprehensive resume quality analysis.
    
    Returns detailed feedback on:
    - Action verb usage
    - Soft skills detection
    - Quantified achievements
    - Bullet point quality
    """
    logger.info("Analyzing resume quality...")
    
    # Run all analyses
    action_verbs = analyze_action_verbs(resume_text)
    soft_skills = detect_soft_skills(resume_text)
    achievements = analyze_quantified_achievements(resume_text)
    bullet_points = analyze_bullet_points(resume_text)
    
    # Calculate overall score (weighted average)
    overall_score = round(
        action_verbs["score"] * 0.25 +
        soft_skills["score"] * 0.20 +
        achievements["score"] * 0.30 +
        bullet_points["overallScore"] * 0.25
    )
    
    # Determine quality level
    if overall_score >= 80:
        quality_level = "Excellent"
        quality_message = "Your resume is well-optimized and impactful!"
    elif overall_score >= 60:
        quality_level = "Good"
        quality_message = "Your resume is solid with room for improvement."
    elif overall_score >= 40:
        quality_level = "Needs Work"
        quality_message = "Consider the suggestions below to strengthen your resume."
    else:
        quality_level = "Weak"
        quality_message = "Your resume needs significant improvements."
    
    return {
        "overallScore": overall_score,
        "qualityLevel": quality_level,
        "qualityMessage": quality_message,
        "sections": {
            "actionVerbs": action_verbs,
            "softSkills": soft_skills,
            "quantifiedAchievements": achievements,
            "bulletPoints": bullet_points
        },
        "topPriorities": get_top_priorities(action_verbs, soft_skills, achievements, bullet_points)
    }


def get_top_priorities(action_verbs: Dict, soft_skills: Dict, achievements: Dict, bullets: Dict) -> List[str]:
    """Get top 3 priority improvements."""
    priorities = []
    
    scores = [
        ("action_verbs", action_verbs["score"]),
        ("soft_skills", soft_skills["score"]),
        ("achievements", achievements["score"]),
        ("bullets", bullets["overallScore"])
    ]
    
    # Sort by score (lowest first)
    scores.sort(key=lambda x: x[1])
    
    suggestions = {
        "action_verbs": "Add more powerful action verbs to demonstrate impact",
        "soft_skills": "Highlight soft skills with concrete examples",
        "achievements": "Quantify your achievements with numbers and metrics",
        "bullets": "Restructure bullet points for clarity and impact"
    }
    
    for area, score in scores[:3]:
        if score < 70:
            priorities.append(suggestions[area])
    
    if not priorities:
        priorities.append("Your resume is in great shape! Consider tailoring it to specific roles.")
    
    return priorities
