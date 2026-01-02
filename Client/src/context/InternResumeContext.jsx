import { createContext, useState } from "react";

// Create context
export const InternResumeContext = createContext();

// Provider component
export const InternResumeProvider = ({ children }) => {
  const [internResume, setInternResume] = useState({
    name: "",
    contact: "",
    email: "",
    linkedin: "",
    experience: [],
    university: {
      name: "University of Mumbai, UPG",
      degree: "Bachelor of Science in Information Technology (BSc IT)",
      cgpa: ""
    },
    highSchool: {
      stream: "",
      board: "",
      institute: "",
      percentage: ""
    },
    school: {
      stream: "",
      board: "",
      institute: "",
      percentage: ""
    },
    skills: []
  });

  return (
    <InternResumeContext.Provider value={{ internResume, setInternResume }}>
      {children}
    </InternResumeContext.Provider>
  );
};
