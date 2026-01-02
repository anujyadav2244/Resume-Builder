import React, { useEffect } from 'react'
import { BiHelpCircle } from 'react-icons/bi'
import { useUser } from '../context/UserContext'
function SelectCategory({ category, setCategory }) {
    const { setSelectedTemplate } = useUser();
    const beginnerModel = {
        "name": "Jane Smith",
        "jobTitle": "Software Engineer",
        "image": "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
        "careerObjective": "Recent BSc IT graduate with a strong foundation in Java, React, and databases. Seeking a software developer role to apply technical skills and contribute to innovative projects.",
        "contact": {
            "phone": "+987 654 3210",
            "email": "janesmith@email.com",
            "address": "456 Elm Street, City, Country"
        },
        "technicalSkills": [
            "Java", "Spring Boot", "React.js", "MongoDB", "MySQL", "REST APIs", "Git & GitHub"
        ],
        "personalSkills": ["Critical Thinking", "Leadership", "Time Management", "Adaptability"],
        "hobbies": ["Coding", "Reading Tech Blogs", "Problem-Solving", "Gaming"],
        "languages": [
            { "language": "English", "familiarity": 90 },
            { "language": "French", "familiarity": 60 }
        ],
        "education": [
            {
                "degree": "BSc in Information Technology",
                "institution": "XYZ University",
                "startYear": "2020",
                "endYear": "2024"
            }
        ],
        "certifications": [
            { "title": "Full Stack Development", "description": "Completed a comprehensive full-stack course covering MERN stack." },
            { "title": "Java Professional", "description": "Certified Java Developer from XYZ Institute." }
        ]
    }

    const experiencedModel = {
        "name": "John Doe",
        "jobTitle": "Full Stack Developer",
        "contact": {
            "email": "johndoe@example.com",
            "phone": "+1 (123) 456-7890",
            "address": "1234 Elm Street, Springfield, USA"
        },
        image: 'https://images.unsplash.com/photo-1524666041070-9d87656c25bb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZXxlbnwwfHwwfHx8MA%3D%3D',
        "technicalSkills": [
            "JavaScript",
            "React.js",
            "Node.js",
            "MongoDB",
            "Express.js",
            "Git",
            "Docker"
        ],
        "softSkills": [
            "Communication",
            "Problem-Solving",
            "Teamwork",
            "Time Management"
        ],
        "languages": [
            {
                "language": "English",
                "familiarity": 90
            },
            {
                "language": "Spanish",
                "familiarity": 70
            }
        ],
        "professionalSummary": "Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications. Passionate about writing clean and efficient code, solving complex problems, and continuously learning new technologies.",
        "workExperience": [
            {
                "title": "Senior Software Engineer",
                "company": "TechCorp Inc.",
                "startDate": "Jan 2020",
                "endDate": "Present",
                "responsibilities": [
                    "Led a team of developers to build scalable web applications.",
                    "Designed and implemented RESTful APIs using Node.js and Express.",
                    "Optimized database performance and queries in MongoDB.",
                    "Collaborated with UI/UX teams to enhance user experience."
                ]
            },
            {
                "title": "Software Developer",
                "company": "WebSolutions Ltd.",
                "startDate": "Jul 2017",
                "endDate": "Dec 2019",
                "responsibilities": [
                    "Developed front-end features using React and Redux.",
                    "Integrated third-party APIs for real-time data processing.",
                    "Implemented authentication and authorization using JWT.",
                    "Participated in Agile development and sprint planning."
                ]
            }
        ],
        "certifications": [
            {
                "title": "React Developer Certification",
                "institution": "Udemy",
                "year": "2021"
            },
            {
                "title": "Full Stack Web Development",
                "institution": "Coursera",
                "year": "2020"
            }
        ],
        "achievements": [
            "Awarded 'Best Developer' at TechCorp Inc. in 2022.",
            "Contributed to an open-source project with 10K+ GitHub stars."
        ],
        "education": [
            {
                "degree": "Bachelor of Science in Computer Science",
                "institution": "University of Springfield",
                "startYear": "2013",
                "endYear": "2017"
            }
        ]
    }
    useEffect(() => {
        if(category==='Fresher')
            setSelectedTemplate(beginnerModel);
        else
            setSelectedTemplate(experiencedModel);
    }, [category])
    return (
        <div>
            <div className='text-center pb-2 font-semibold text-lg'>What Describes You The Best</div>
            <div className="flex w-full flex-col lg:flex-row text-base md:text-lg lg:text-2xl">
                <div className={`card rounded-box grid h-10 md:h-14 flex-grow place-items-center font-semibold ${category === 'Fresher' ? 'bg-accent text-accent-content' : 'bg-base-300'} cursor-pointer transition-colors duration-200`} onClick={() => {
                    setSelectedTemplate(beginnerModel);
                    setCategory('Fresher')
                }
                }>
                    <div>

                        <span>Fresher</span>
                        <div className="dropdown dropdown-end">
                            <button tabIndex={0} className="btn btn-circle btn-xs ml-2">
                                <BiHelpCircle size={16} />
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content bg-base-100 rounded-box w-80 p-2 shadow-lg text-sm"
                            >
                                <li className="text-base-content">You have recently graduated or are in your final year of studies.</li>
                                <li className="text-base-content">You have little to no full-time work experience in your field.</li>
                                <li className="text-base-content">You have only completed internships, freelance work, or college projects.</li>
                                <li className="text-base-content">You are looking for your first professional job.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="divider lg:divider-horizontal  m-1">OR</div>
                <div className={`card rounded-box grid h-10 md:h-14 flex-grow place-items-center font-semibold ${category === 'Experienced' ? 'bg-accent text-accent-content' : 'bg-base-300'} cursor-pointer transition-colors duration-200`} onClick={() => {
                    setSelectedTemplate(experiencedModel)
                    setCategory('Experienced')
                }}>
                    <div>

                        <span>Experienced</span>
                        <div className="dropdown dropdown-end">
                            <button tabIndex={0} className="btn btn-circle btn-xs ml-2">
                                <BiHelpCircle size={16} />
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content bg-base-100 rounded-box w-80 p-2 shadow-lg text-sm"
                            >
                                <li className="text-base-content">1+ years of full-time work experience.</li>
                                <li className="text-base-content">Worked on real-world projects in a professional setting.</li>
                                <li className="text-base-content">Possess industry-specific skills and knowledge.</li>
                                <li className="text-base-content">Looking for career growth or transition.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectCategory
