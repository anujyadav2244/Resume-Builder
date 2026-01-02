import React from "react";
import Navbar from "../components/Navbar";
import Padding from "../components/Padding";
import NoPrintWrapper from "../components/NoPrintWrapper.jsx";
import PrintButton from "../components/PrintButton.jsx";
import { useUser } from "../context/UserContext.jsx";

function Resume2() {
  const { selectedTemplate } = useUser();

  return (
    <div className="bg-gray-100 font-sans min-h-screen w-screen flex flex-col items-center print:w-full print:h-full print:bg-white print:m-0 print:p-0">
      {/* Hide navbar and buttons when printing */}
      <NoPrintWrapper className="print:hidden">
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

      {/* Resume content that fills the page when printing */}
      <div className="lg:max-w-5xl w-full mx-auto bg-white p-4 flex-1 print:w-full print:h-full print:p-8">
        <div className="flex flex-col sm:flex-row items-center pb-3">
          <div className="h-24 w-24 sm:h-24 sm:w-24 rounded-full overflow-hidden">
            <img src={selectedTemplate.image} alt="Profile" />
          </div>
          <div className="mt-2 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <h1 className="text-3xl font-semibold text-gray-800">
              {selectedTemplate.name}
            </h1>
            <h2 className="text-2xl text-gray-600">{selectedTemplate.jobTitle}</h2>
          </div>
        </div>

        {/* Resume Sections */}
        <div className="mt-2">
          <section>
            <h3 className="text-xl font-semibold text-gray-700">
              Career Objective
            </h3>
            <p className={`${selectedTemplate.careerObjective.length > 300 ? 'text-md' : 'text-lg'}`}>
              {selectedTemplate.careerObjective}
            </p>
          </section>

          <section className="mt-2">
            <h3 className="text-xl font-semibold text-gray-700">Contact</h3>
            <div className="mt-1 text-gray-600 text-md">
              <p><strong>Phone:</strong> {selectedTemplate.contact.phone}</p>
              <p><strong>Email:</strong> {selectedTemplate.contact.email}</p>
              <p><strong>Address:</strong> {selectedTemplate.contact.address}</p>
            </div>
          </section>

          <section className="mt-2">
            <h3 className="text-xl font-semibold text-gray-700">
              Technical Skills
            </h3>
            <div className="flex flex-col flex-wrap text-gray-600 max-h-32">
              {selectedTemplate.technicalSkills.map((skill) => (
                <div key={skill} className="text-md">{skill}</div>
              ))}
            </div>
          </section>

          <section className="mt-2">
            <h3 className="text-xl font-semibold text-gray-700">Languages</h3>
            <div className="mt-1 text-gray-600 flex flex-col flex-wrap max-h-16">
              {selectedTemplate.languages.map((language) => (
                <div key={language.name} className="mb-1 flex items-center gap-1 px-2 min-w-1/3">
                  <span className="text-md">{language.language}</span>
                  <progress
                    value={language.familiarity}
                    max={100}
                    className="ml-2 progress progress-primary"
                  ></progress>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700">Education</h3>
            <ul className="mt-1 list-disc list-inside text-gray-600">
              {selectedTemplate.education.map((edu) => (
                <li key={edu.degree}>
                  <strong className="text-md">{edu.degree}</strong> at {edu.institution} ({edu.startYear} - {edu.endYear})
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700">Personal Skills</h3>
            <div className="flex flex-col flex-wrap max-h-28 text-gray-600">
              {selectedTemplate.personalSkills.map((skill) => (
                <div key={skill} className="w-full sm:w-1/3 text-md">{skill}</div>
              ))}
            </div>
          </section>

          <section className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700">Certifications</h3>
            <ul className="mt-1 list-disc list-inside text-gray-600 flex flex-col flex-wrap">
              {selectedTemplate.certifications.map((cert) => (
                <li key={cert.title}>
                  <strong>{cert.title}</strong> {cert.description}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Resume2;
