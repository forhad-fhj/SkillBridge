import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleJobs = [
    {
        title: "Frontend Developer",
        company: "Tech Solutions BD",
        domain: "Frontend Developer",
        descriptionText: `We are looking for a skilled Frontend Developer to join our team.

Requirements:
- 2+ years of experience with React.js and Next.js
- Strong proficiency in JavaScript, TypeScript, HTML5, and CSS3
- Experience with state management (Redux, Zustand)
- Knowledge of RESTful APIs and GraphQL
- Familiarity with Tailwind CSS or similar CSS frameworks
- Experience with Git version control
- Understanding of responsive design principles

Nice to have:
- Experience with testing frameworks (Jest, React Testing Library)
- Knowledge of CI/CD pipelines
- Experience with Figma or similar design tools`,
        sourceUrl: "https://bdjobs.com/example1",
        extractedSkills: {
            languages: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
            frameworks: ["React.js", "Next.js", "Tailwind CSS"],
            tools: ["Redux", "Zustand", "GraphQL", "Git", "Jest", "Figma"],
            concepts: ["RESTful APIs", "Responsive Design", "CI/CD"]
        }
    },
    {
        title: "Full Stack Developer",
        company: "Digital Innovators",
        domain: "Full Stack Developer",
        descriptionText: `Join our team as a Full Stack Developer working on cutting-edge web applications.

Requirements:
- 3+ years of full-stack development experience
- Frontend: React.js, Vue.js, or Angular
- Backend: Node.js, Express.js, NestJS
- Database: PostgreSQL, MongoDB
- Experience with Docker and containerization
- Knowledge of microservices architecture
- Strong understanding of authentication and authorization (JWT, OAuth)
- Experience with AWS or similar cloud platforms

Skills:
- TypeScript, JavaScript
- RESTful API design
- GraphQL
- Redis for caching
- Unit and integration testing`,
        sourceUrl: "https://bdjobs.com/example2",
        extractedSkills: {
            languages: ["JavaScript", "TypeScript"],
            frameworks: ["React.js", "Vue.js", "Angular", "Node.js", "Express.js", "NestJS"],
            databases: ["PostgreSQL", "MongoDB", "Redis"],
            tools: ["Docker", "AWS", "Git", "GraphQL"],
            concepts: ["Microservices", "RESTful APIs", "JWT", "OAuth", "Testing"]
        }
    },
    {
        title: "Backend Developer (Node.js)",
        company: "StartupHub BD",
        domain: "Backend Developer",
        descriptionText: `We're seeking a Backend Developer with strong Node.js expertise.

Responsibilities:
- Design and develop scalable backend services
- Build RESTful APIs and GraphQL endpoints
- Optimize database queries and performance
- Implement authentication and security best practices
- Write clean, maintainable code with tests

Required Skills:
- Node.js and Express.js (3+ years)
- PostgreSQL or MySQL
- MongoDB for NoSQL requirements
- Experience with message queues (RabbitMQ, Kafka)
- Docker and Kubernetes
- Git and GitHub
- Understanding of SOLID principles

Bonus:
- Experience with Python or Go
- Knowledge of AWS Lambda, EC2, S3
- Familiarity with Elasticsearch`,
        sourceUrl: "https://bdjobs.com/example3",
        extractedSkills: {
            languages: ["JavaScript", "Node.js", "Python", "Go"],
            frameworks: ["Express.js"],
            databases: ["PostgreSQL", "MySQL", "MongoDB", "Elasticsearch"],
            tools: ["Docker", "Kubernetes", "RabbitMQ", "Kafka", "Git", "AWS"],
            concepts: ["RESTful APIs", "GraphQL", "SOLID Principles", "Message Queues"]
        }
    },
    {
        title: "Data Analyst",
        company: "Analytics Pro BD",
        domain: "Data Analyst",
        descriptionText: `Looking for a Data Analyst to transform data into actionable insights.

Requirements:
- 2+ years of data analysis experience
- Proficiency in Python (Pandas, NumPy, Matplotlib)
- SQL for data querying and manipulation
- Experience with data visualization tools (Tableau, Power BI)
- Statistical analysis and hypothesis testing
- Excel advanced functions and pivot tables
- Understanding of ETL processes

Technical Skills:
- Python libraries: Pandas, NumPy, Scikit-learn
- SQL (PostgreSQL, MySQL)
- Jupyter Notebooks
- Git for version control
- Basic understanding of machine learning concepts

Nice to have:
- Experience with R programming
- Knowledge of Apache Spark
- Familiarity with cloud platforms (AWS, GCP)`,
        sourceUrl: "https://bdjobs.com/example4",
        extractedSkills: {
            languages: ["Python", "SQL", "R"],
            frameworks: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
            tools: ["Tableau", "Power BI", "Excel", "Jupyter", "Git", "Apache Spark"],
            concepts: ["Statistical Analysis", "ETL", "Data Visualization", "Machine Learning"]
        }
    },
    {
        title: "React Native Developer",
        company: "Mobile First BD",
        domain: "Mobile Developer",
        descriptionText: `Join our mobile development team to build cross-platform applications.

Requirements:
- 2+ years of React Native development
- Strong JavaScript and TypeScript skills
- Experience with mobile app deployment (iOS App Store, Google Play)
- Knowledge of native modules and bridging
- State management with Redux or MobX
- Experience with RESTful APIs and GraphQL
- Understanding of mobile UI/UX principles

Technical Skills:
- React Native, Expo
- JavaScript, TypeScript
- Redux, Redux Toolkit
- Firebase for backend services
- Git and GitHub
- Jest for testing

Bonus:
- Native iOS (Swift) or Android (Kotlin) experience
- Experience with animations (Reanimated, Lottie)
- Knowledge of CI/CD for mobile apps`,
        sourceUrl: "https://bdjobs.com/example5",
        extractedSkills: {
            languages: ["JavaScript", "TypeScript", "Swift", "Kotlin"],
            frameworks: ["React Native", "Expo", "Redux"],
            tools: ["Firebase", "Git", "Jest", "Reanimated", "Lottie"],
            concepts: ["Mobile Development", "RESTful APIs", "GraphQL", "CI/CD"]
        }
    },
    {
        title: "DevOps Engineer",
        company: "CloudTech BD",
        domain: "DevOps Engineer",
        descriptionText: `Seeking a DevOps Engineer to manage our infrastructure and deployment pipelines.

Requirements:
- 3+ years of DevOps experience
- Strong knowledge of AWS services (EC2, S3, RDS, Lambda)
- Experience with Docker and Kubernetes
- CI/CD pipeline setup (Jenkins, GitLab CI, GitHub Actions)
- Infrastructure as Code (Terraform, CloudFormation)
- Linux system administration
- Scripting with Bash, Python

Key Skills:
- Docker, Kubernetes, Helm
- AWS, Azure, or GCP
- Jenkins, GitLab CI/CD
- Terraform, Ansible
- Monitoring tools (Prometheus, Grafana, ELK Stack)
- Git and version control
- Nginx, Apache

Nice to have:
- Experience with microservices architecture
- Knowledge of security best practices
- Familiarity with service mesh (Istio, Linkerd)`,
        sourceUrl: "https://bdjobs.com/example6",
        extractedSkills: {
            languages: ["Bash", "Python"],
            frameworks: [],
            tools: ["Docker", "Kubernetes", "AWS", "Jenkins", "GitLab", "Terraform", "Ansible", "Prometheus", "Grafana", "Git", "Nginx"],
            concepts: ["CI/CD", "Infrastructure as Code", "Microservices", "Monitoring", "Linux"]
        }
    },
    {
        title: "UI/UX Designer",
        company: "Creative Studio BD",
        domain: "UI/UX Designer",
        descriptionText: `We're looking for a talented UI/UX Designer to create beautiful user experiences.

Requirements:
- 2+ years of UI/UX design experience
- Proficiency in Figma and Adobe XD
- Strong portfolio showcasing web and mobile designs
- Understanding of user-centered design principles
- Experience with prototyping and wireframing
- Knowledge of design systems and component libraries
- Basic understanding of HTML/CSS

Skills:
- Figma, Adobe XD, Sketch
- Adobe Photoshop, Illustrator
- Prototyping tools (InVision, Framer)
- User research and usability testing
- Responsive design
- Accessibility standards (WCAG)

Bonus:
- Experience with motion design (After Effects)
- Knowledge of frontend frameworks (React, Vue)
- Familiarity with design tokens`,
        sourceUrl: "https://bdjobs.com/example7",
        extractedSkills: {
            languages: ["HTML", "CSS"],
            frameworks: ["React", "Vue"],
            tools: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InVision", "Framer", "After Effects"],
            concepts: ["UI/UX Design", "Prototyping", "User Research", "Responsive Design", "Accessibility"]
        }
    },
    {
        title: "Machine Learning Engineer",
        company: "AI Innovations BD",
        domain: "Machine Learning Engineer",
        descriptionText: `Join our AI team to build cutting-edge machine learning solutions.

Requirements:
- 3+ years of ML engineering experience
- Strong Python programming skills
- Experience with ML frameworks (TensorFlow, PyTorch, Scikit-learn)
- Knowledge of deep learning architectures (CNNs, RNNs, Transformers)
- Experience with NLP or Computer Vision
- Understanding of MLOps and model deployment
- SQL and data manipulation skills

Technical Skills:
- Python (NumPy, Pandas, Matplotlib)
- TensorFlow, PyTorch, Keras
- Scikit-learn, XGBoost
- Jupyter Notebooks
- Docker for containerization
- Git version control
- Cloud platforms (AWS SageMaker, GCP AI Platform)

Nice to have:
- Experience with LLMs and prompt engineering
- Knowledge of distributed training
- Familiarity with MLflow, Kubeflow`,
        sourceUrl: "https://bdjobs.com/example8",
        extractedSkills: {
            languages: ["Python", "SQL"],
            frameworks: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "XGBoost", "NumPy", "Pandas"],
            tools: ["Jupyter", "Docker", "Git", "AWS", "GCP", "MLflow", "Kubeflow"],
            concepts: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "MLOps"]
        }
    },
    {
        title: "Quality Assurance Engineer",
        company: "TestPro BD",
        domain: "QA Engineer",
        descriptionText: `We need a QA Engineer to ensure the quality of our software products.

Requirements:
- 2+ years of QA/testing experience
- Experience with manual and automated testing
- Knowledge of testing frameworks (Selenium, Cypress, Jest)
- Understanding of API testing (Postman, REST Assured)
- Familiarity with Agile/Scrum methodologies
- Bug tracking tools (Jira, Bugzilla)
- Basic programming skills (JavaScript, Python)

Skills:
- Selenium WebDriver, Cypress
- Jest, Mocha, Chai
- Postman, REST Assured
- Jira, TestRail
- Git and GitHub
- CI/CD integration for tests
- Performance testing (JMeter, LoadRunner)

Bonus:
- Experience with mobile app testing (Appium)
- Knowledge of security testing
- Familiarity with BDD (Cucumber, SpecFlow)`,
        sourceUrl: "https://bdjobs.com/example9",
        extractedSkills: {
            languages: ["JavaScript", "Python"],
            frameworks: ["Selenium", "Cypress", "Jest", "Mocha"],
            tools: ["Postman", "Jira", "Git", "JMeter", "Appium", "Cucumber"],
            concepts: ["Automated Testing", "API Testing", "Agile", "CI/CD", "Performance Testing"]
        }
    },
    {
        title: "WordPress Developer",
        company: "Web Agency BD",
        domain: "WordPress Developer",
        descriptionText: `Looking for a WordPress Developer to build and maintain client websites.

Requirements:
- 2+ years of WordPress development experience
- Strong PHP, HTML, CSS, JavaScript skills
- Experience with theme and plugin development
- Knowledge of WordPress REST API
- Familiarity with page builders (Elementor, WPBakery)
- Understanding of SEO best practices
- Experience with WooCommerce

Technical Skills:
- PHP, MySQL
- HTML5, CSS3, JavaScript, jQuery
- WordPress theme development
- WordPress plugin development
- Git version control
- cPanel, WHM
- Responsive design

Nice to have:
- Experience with headless WordPress
- Knowledge of React or Vue.js
- Familiarity with GraphQL and WPGraphQL`,
        sourceUrl: "https://bdjobs.com/example10",
        extractedSkills: {
            languages: ["PHP", "JavaScript", "HTML5", "CSS3", "MySQL"],
            frameworks: ["WordPress", "jQuery", "React", "Vue.js"],
            tools: ["Elementor", "WooCommerce", "Git", "cPanel", "GraphQL"],
            concepts: ["Theme Development", "Plugin Development", "SEO", "Responsive Design"]
        }
    }
];

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await prisma.analysisResult.deleteMany();
    await prisma.job.deleteMany();
    await prisma.user.deleteMany();

    console.log('✅ Cleared existing data');

    // Seed jobs
    for (const job of sampleJobs) {
        await prisma.job.create({
            data: job,
        });
    }

    console.log(`✅ Created ${sampleJobs.length} sample jobs`);

    // Create a sample user
    const user = await prisma.user.create({
        data: {
            name: "Test User",
            email: "test@skillbridge.com",
        },
    });

    console.log(`✅ Created sample user: ${user.email}`);

    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
