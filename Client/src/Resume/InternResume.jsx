import React, { useContext } from "react";
import NoPrintWrapper from "../components/NoPrintWrapper";
import Navbar from "../components/Navbar";
import Padding from "../components/Padding";
import PrintButton from "../components/PrintButton";
import { InternResumeContext } from "../context/InternResumeContext";

function InternResume() {
  const { internResume } = useContext(InternResumeContext);

  // Dummy data (used if no data is available in context)
  const defaultEducation = {
    university: {
      name: "University of Mumbai, UPG",
      degree: "Bachelor of Science in Information Technology (BSc IT)",
      cgpa: "9"
    },
    highSchool: {
      level: "High School (XII)",
      stream: "Science",
      board: "Maharashtra State Board",
      institute: "XYZ Junior College",
      percentage: "85%"
    },
    school: {
      level: "School Level (X)",
      stream: "General",
      board: "CBSE",
      institute: "ABC Public School",
      percentage: "90%"
    }
  };

  const defaultSkills = [
    "JavaScript",
    "React.js",
    "Node.js",
    "MongoDB",
    "HTML & CSS",
    "Tailwind CSS",
    "Git & GitHub",
    "REST APIs"
  ];

  // Check if user has selected "No Experience"
  const hasExperience = internResume.experience?.length > 0;

  const education = internResume.education || defaultEducation;
  const skills = internResume.skills?.length ? internResume.skills : defaultSkills;

  return (
    <>
      <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

      <div className="max-w-5xl mx-auto p-4">
        {/* Name Section */}
        <div className="text-4xl font-semibold flex justify-center">
          {internResume.name || "NAME SURNAME"}
        </div>
        <div className="flex justify-center text-xl">
          {internResume.contact || "Cell No."}
        </div>
        <div className="flex justify-center gap-2 text-xl text-blue-600 border-b-2 pb-4 border-b-black">
          <div>{internResume.email || "Email"}</div>
          <div>{internResume.linkedin || "LinkedIn"}</div>
        </div>

        {/* Experience Section (Shown Only If Experience Exists) */}
        {hasExperience && (
          <div className="ml-5 p-2 mt-3 border-l-2 border-black">
            <div className="font-semibold text-xl">EXPERIENCE</div>
            {internResume.experience.map((exp, index) => (
              <div key={index} className="mt-3">
                <div className="text-lg font-semibold">{exp.duration}</div>
                <div className="text-lg">{exp.jobTitle} - <span className="font-medium">{exp.company}</span></div>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>{exp.responsibilities}</li>
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        <div className="ml-5 p-2 mt-5 border-l-2 border-black">
          <div className="font-semibold text-xl">EDUCATION</div>

          {/* University */}
          <div className="mt-3">
            <div className="text-lg font-semibold">{education.university.degree}</div>
            <div className="text-lg">{education.university.name}</div>
            <div className="text-lg font-medium">Average CGPA: {education.university.cgpa || "9"}</div>
          </div>

          {/* High School (XII) */}
          <div className="mt-3">
            <div className="text-lg font-semibold">{education.highSchool.level}</div>
            <div>Stream: {education.highSchool.stream}</div>
            <div>Board: {education.highSchool.board}</div>
            <div>Institute: {education.highSchool.institute}</div>
            <div>Percentage: {education.highSchool.percentage}</div>
          </div>

          {/* School Level (X) */}
          <div className="mt-3">
            <div className="text-lg font-semibold">{education.school.level}</div>
            <div>Stream: {education.school.stream}</div>
            <div>Board: {education.school.board}</div>
            <div>Institute: {education.school.institute}</div>
            <div>Percentage: {education.school.percentage}</div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="ml-5 p-2 mt-5 border-l-2 border-black">
          <div className="font-semibold text-xl">SKILLS</div>
          <div className={`mt-2 ${hasExperience ? "flex flex-wrap gap-2" : "flex flex-col gap-2"}`}>
            {skills.map((skill, index) => (
              <span key={index} className={`px-3 py-1 text-black font-semibold rounded-lg text-lg ${hasExperience ? "" : "w-fit"}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default InternResume;
