import spacy
from typing import List, Dict, Set
import re

# Load SpaCy model (singleton)
nlp = None

def get_nlp():
    """Get or load the SpaCy NLP model."""
    global nlp
    if nlp is None:
        nlp = spacy.load("en_core_web_md")
    return nlp

# Technical skill taxonomy
SKILL_PATTERNS = {
    "languages": [
        "python", "javascript", "typescript", "java", "c++", "c#", "php", "ruby",
        "go", "rust", "swift", "kotlin", "scala", "r", "sql", "html", "html5",
        "css", "css3", "bash", "shell", "perl", "dart", "elixir", "clojure"
    ],
    "frameworks": [
        "react", "react.js", "reactjs", "vue", "vue.js", "vuejs", "angular",
        "next.js", "nextjs", "nuxt", "svelte", "django", "flask", "fastapi",
        "express", "express.js", "expressjs", "nestjs", "spring", "spring boot",
        "laravel", "rails", "ruby on rails", "asp.net", ".net", "tensorflow",
        "pytorch", "keras", "scikit-learn", "pandas", "numpy", "react native",
        "flutter", "ionic", "xamarin", "tailwind", "tailwind css", "bootstrap",
        "material-ui", "mui", "chakra ui", "redux", "mobx", "zustand", "graphql",
        "apollo", "prisma", "typeorm", "sequelize", "mongoose", "hibernate"
    ],
    "databases": [
        "postgresql", "postgres", "mysql", "mongodb", "redis", "elasticsearch",
        "cassandra", "dynamodb", "sqlite", "oracle", "sql server", "mariadb",
        "neo4j", "couchdb", "firebase", "supabase"
    ],
    "tools": [
        "git", "github", "gitlab", "bitbucket", "docker", "kubernetes", "k8s",
        "jenkins", "travis ci", "circle ci", "github actions", "aws", "azure",
        "gcp", "google cloud", "heroku", "vercel", "netlify", "terraform",
        "ansible", "puppet", "chef", "vagrant", "nginx", "apache", "webpack",
        "vite", "rollup", "babel", "eslint", "prettier", "jest", "mocha",
        "chai", "cypress", "selenium", "postman", "insomnia", "figma",
        "adobe xd", "sketch", "photoshop", "illustrator", "jira", "confluence",
        "slack", "trello", "asana", "notion", "vs code", "intellij", "pycharm",
        "jupyter", "tableau", "power bi", "grafana", "prometheus", "elk",
        "kafka", "rabbitmq", "celery", "airflow", "spark", "hadoop", "mlflow"
    ],
    "concepts": [
        "restful api", "rest api", "api", "microservices", "serverless",
        "ci/cd", "devops", "agile", "scrum", "tdd", "bdd", "oop", "functional programming",
        "machine learning", "deep learning", "nlp", "computer vision", "data science",
        "data analysis", "data visualization", "etl", "big data", "cloud computing",
        "responsive design", "mobile development", "web development", "full stack",
        "frontend", "backend", "ui/ux", "accessibility", "seo", "performance optimization",
        "security", "authentication", "authorization", "jwt", "oauth", "solid principles",
        "design patterns", "algorithms", "data structures", "testing", "debugging"
    ]
}

def normalize_skill(skill: str) -> str:
    """Normalize skill names for consistent matching."""
    skill = skill.lower().strip()
    
    # Normalize common variations
    normalizations = {
        "react.js": "react",
        "reactjs": "react",
        "vue.js": "vue",
        "vuejs": "vue",
        "next.js": "nextjs",
        "express.js": "express",
        "node.js": "nodejs",
        "postgresql": "postgres",
        "mongodb": "mongo",
        "kubernetes": "k8s",
        "javascript": "js",
        "typescript": "ts",
    }
    
    return normalizations.get(skill, skill)

def extract_skills_from_text(text: str) -> Dict[str, List[str]]:
    """
    Extract technical skills from text using SpaCy NLP and pattern matching.
    
    Args:
        text: Input text (CV, job description, etc.)
        
    Returns:
        Dictionary with categorized skills
    """
    if not text:
        return {"languages": [], "frameworks": [], "databases": [], "tools": [], "concepts": []}
    
    text_lower = text.lower()
    nlp_model = get_nlp()
    doc = nlp_model(text)
    
    # Extract skills by category
    found_skills: Dict[str, Set[str]] = {
        "languages": set(),
        "frameworks": set(),
        "databases": set(),
        "tools": set(),
        "concepts": set()
    }
    
    # Pattern-based extraction
    for category, patterns in SKILL_PATTERNS.items():
        for pattern in patterns:
            # Use word boundaries for accurate matching
            regex = r'\b' + re.escape(pattern) + r'\b'
            if re.search(regex, text_lower):
                found_skills[category].add(pattern.title())
    
    # Entity-based extraction (for proper nouns and organizations)
    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT", "GPE"]:
            ent_lower = ent.text.lower()
            # Check if entity matches any known skill
            for category, patterns in SKILL_PATTERNS.items():
                if ent_lower in patterns:
                    found_skills[category].add(ent.text.title())
    
    # Noun chunk extraction for multi-word skills
    for chunk in doc.noun_chunks:
        chunk_lower = chunk.text.lower()
        for category, patterns in SKILL_PATTERNS.items():
            if chunk_lower in patterns:
                found_skills[category].add(chunk.text.title())
    
    # Convert sets to sorted lists
    result = {
        category: sorted(list(skills))
        for category, skills in found_skills.items()
    }
    
    return result

def get_all_skills_flat(skills_dict: Dict[str, List[str]]) -> List[str]:
    """Flatten categorized skills into a single list."""
    all_skills = []
    for category_skills in skills_dict.values():
        all_skills.extend(category_skills)
    return all_skills

def calculate_skill_frequency(job_descriptions: List[Dict]) -> Dict[str, int]:
    """
    Calculate frequency of skills across multiple job descriptions.
    
    Args:
        job_descriptions: List of job dicts with 'extractedSkills' field
        
    Returns:
        Dictionary mapping skill names to their frequency count
    """
    frequency: Dict[str, int] = {}
    
    for job in job_descriptions:
        skills = job.get("extractedSkills", {})
        all_skills = get_all_skills_flat(skills)
        
        for skill in all_skills:
            normalized = normalize_skill(skill)
            frequency[normalized] = frequency.get(normalized, 0) + 1
    
    return frequency
