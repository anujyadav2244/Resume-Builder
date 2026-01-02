import { createContext, useContext, useState } from "react";

// Create Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || "");
  const [beginnerUserTemplates, setBeginnerUserTemplates] = useState([]); // Empty array for beginners
  const [experiencedUserTemplates, setExperiencedUserTemplates] = useState([]); // Empty array for experienced users
  const [selectedTemplate, setSelectedTemplate] = useState({
    "id": "res123",
    "userId": "user456",
    "templateName": "Senior Developer Resume",
    "name": "John Doe",
    "jobTitle": "Senior Software Engineer",
    "contact": {
      "phone": "123-456-7890",
      "email": "example@email.com",
      "address": "123 Street, City, Country",
      "linkedin": "linkedin.com/in/example"
    },
    "professionalSummary": "Experienced software engineer with expertise in backend development and cloud computing.",
    "workExperience": [
      {
        "company": "TechCorp",
        "position": "Software Engineer",
        "startDate": "2020-06",
        "endDate": "2023-12",
        "responsibilities": [
          "Developed web applications",
          "Led a team of developers",
          "Optimized database queries"
        ]
      },
      {
        "company": "Innovate Ltd.",
        "position": "Backend Developer",
        "startDate": "2018-03",
        "endDate": "2020-05",
        "responsibilities": [
          "Designed REST APIs",
          "Implemented microservices",
          "Maintained cloud infrastructure"
        ]
      }
    ],
    "education": [
      {
        "degree": "BSc in Computer Science",
        "institution": "XYZ University",
        "startYear": "2014",
        "endYear": "2018"
      }
    ],
    "certifications": [
      {
        "title": "AWS Certified Solutions Architect",
        "institution": "Amazon",
        "year": "2022"
      }
    ],
    "technicalSkills": [
      "Java",
      "Spring Boot",
      "MongoDB",
      "AWS"
    ],
    "softSkills": [
      "Leadership",
      "Problem-solving"
    ],
    "achievements": [
      "Employee of the Month (2021)",
      "Best Innovator Award (2022)"
    ],
    "languages": [
      {
        "language": "English",
        "familiarity": 5
      },
      {
        "language": "Spanish",
        "familiarity": 3
      }
    ],
    "hobbies": [
      "Reading",
      "Gaming"
    ],
    "image": "profile_image_url"
  }
  
  );
  const [userEmail,setUserEmail] = useState(null);
  return (
    <UserContext.Provider value={{ 
      userId, 
      setUserId, 
      beginnerUserTemplates, 
      setBeginnerUserTemplates, 
      experiencedUserTemplates, 
      setExperiencedUserTemplates,
      selectedTemplate, // Add selectedTemplate to context
      setSelectedTemplate,
      userEmail,
      setUserEmail
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for using the Context
export const useUser = () => {
  return useContext(UserContext);
};
