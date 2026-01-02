import React from "react";
import profile from "../assets/profile.jpg";
import Navbar from "../components/Navbar";
import Padding from "../components/Padding";
import NoPrintWrapper from '../components/NoPrintWrapper.jsx';
import PrintButton from '../components/PrintButton';
import { useUser } from "../context/UserContext.jsx";

function Resume3() {
  const {selectedTemplate} = useUser()
  return (
    <div className="w-screen bg-white font-sans min-h-screen flex flex-col">
      <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>
      <div className="lg:max-w-5xl w-full bg-white text-gray-900 font-sans p-6 mx-auto rounded-lg shadow-lg print:max-w-full print:shadow-none  print:overflow-hidden">
        {/* Header */}
        <header className="text-center border-b pb-6 mb-6 print:pb-4 print:mb-4">
          <h1 className="text-3xl font-bold print:text-2xl">
            {selectedTemplate.name}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-600 print:text-lg">
            {selectedTemplate.jobTitle}
          </h2>
          <p className={`mt-2 text-gray-700 text-base ${selectedTemplate.careerObjective.length > 400?'print:text-sm':'print:text-md'}`}>
            {selectedTemplate.careerObjective}
          </p>
          <div className={`"mt-4 flex flex-wrap justify-center gap-3 text-gray-500 text-md`}>
            <span>{selectedTemplate.contact.email}</span>
            <span>{selectedTemplate.contact.phone}</span>
            <span>{selectedTemplate.contact.address}</span>
          </div>
        </header>

        {/* Education Section */}
        <section className="mb-6 print:mb-4">
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4 print:text-lg print:pb-1 print:mb-1">
            Education
          </h3>
          <ul className="list-disc list-inside text-base text-gray-600 print:text-sm">
            {selectedTemplate.education.map((edu) => (
              <li key={edu.degree}>
                <strong>{edu.degree}</strong> at {edu.institution} (
                {edu.startYear} - {edu.endYear})
              </li>
            ))}
          </ul>
        </section>

        {/* Skills Section */}
        <section className="mb-6 print:mb-1">
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4 print:text-lg print:pb-1 print:mb-1">
            Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedTemplate.technicalSkills.map((skill) => (
              <div
                key={skill}
                className="bg-yellow-200 rounded-lg text-sm p-1.5 shadow print:text-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 print:mb-2">
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4 print:text-lg print:pb-1 print:mb-1">
            Soft Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedTemplate.personalSkills.map((skill) => (
              <span
                key={skill}
                className="bg-yellow-200 text-gray-700 text-sm p-1.5 rounded-lg shadow print:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section className="mb-6 print:mb-2">
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4 print:text-lg print:pb-1 print:mb-2">
            Certificates
          </h3>
          <ul className="list-disc list-inside text-base text-gray-600">
            {selectedTemplate.certifications.map((cert) => (
              <li key={cert.title} className="print:text-sm">
                <strong>{cert.title}</strong> from {cert.description}
              </li>
            ))}
          </ul>
        </section>

        {/* Hobbies Section */}
        <section className="mb-6 print:mb-2">
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4 print:text-lg print:pb-1 print:mb-2">
            Hobbies
          </h3>
          <ul className="flex flex-wrap gap-2">
            {selectedTemplate.hobbies.map((hobby) => (
              <li
                className="bg-yellow-200 text-gray-700 text-sm p-1.5 rounded-lg shadow print:text-sm"
                key={hobby}
              >
                {hobby}
              </li>
            ))}
          </ul>
        </section>

        {/* Languages Section */}
        <section className="mb-6 print:mb-2">
          <h3 className="text-2xl font-semibold border-b pb-2 mb-4 print:text-lg print:pb-1 print:mb-2">
            Languages
          </h3>
          <div className="flex flex-col flex-wrap max-h-16 border border-black">
            {selectedTemplate.languages.map((language) => (
              <div key={language.language} className="flex items-center gap-3 min-w-1/3 px-2">
                <span className="text-base print:text-sm">
                  {language.language}
                </span>
                <progress
                  value={language.familiarity}
                  max={100}
                  className="appearance-none h-2 bg-gray-200 rounded-full print:h-1.5 progress progress-success"
                ></progress>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
export default Resume3;
