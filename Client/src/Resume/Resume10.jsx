import React from "react";
import { FaAddressBook, FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa";
import profilePic from "../assets/profile.jpg";
import Navbar from "../components/Navbar";
import Padding from "../components/Padding";
import NoPrintWrapper from '../components/NoPrintWrapper.jsx';
import PrintButton from '../components/PrintButton';
import { useUser } from "../context/UserContext.jsx";

function Resume10() {
  const { selectedTemplate } = useUser();
  return (
    <>
      <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

      <div className="min-h-screen lg:max-w-5xl m-auto from-gray-100 to-gray-200 flex font-sans">
        {/* Sidebar */}
        {/* Sidebar */}
        <div className="w-1/3 bg-white shadow-lg p-2 flex flex-col items-center">
          {/* Profile Image */}
          <img
            src={selectedTemplate.image}
            alt="Profile"
            className="rounded-full w-32 h-32 border-4 border-gray-300 object-cover shadow-md"
          />

          {/* Name & Job Title */}
          <h1 className="text-3xl font-bold mt-3 text-gray-800">{selectedTemplate.name}</h1>
          <h2 className="text-lg text-gray-600">{selectedTemplate.jobTitle}</h2>

          {/* Contact Details */}
          <div className="mt-5 w-full text-gray-700 border-b border-gray-300 pb-4 mb-4">
            <div className="flex items-center space-x-2 text-md mb-2">
              <FaEnvelope className="text-gray-600" />
              <span>{selectedTemplate.contact.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-md mb-2">
              <FaPhone className="text-gray-600" />
              <span>{selectedTemplate.contact.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-md">
              <FaLocationArrow className="text-gray-600" />
              <span>{selectedTemplate.contact.address}</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="w-full border-b border-gray-300 pb-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Skills</h3>

            {/* Technical Skills */}
            <div className="mt-3">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.technicalSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 text-sm py-1 px-3 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="mt-2">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.softSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 text-sm py-1 px-3 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Languages Section */}
          <div className="w-full">
            <h3 className="text-xl font-semibold text-gray-800">Languages</h3>
            <ul className="mt-2 space-y-3 text-gray-700 w-full">
              {selectedTemplate.languages.map((lang, index) => (
                <li key={index}>
                  <div className="text-md font-medium">{lang.language}</div>
                  <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${lang.familiarity}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-4">
          <section>
            <h3 className="text-2xl font-semibold text-gray-800">Summary</h3>
            <p className="text-gray-700 mt-4">{selectedTemplate.professionalSummary}</p>
          </section>

          <section className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800">Work Experience</h3>
            {selectedTemplate.workExperience.map((job, index) => (
              <div
                key={index}
                className="mt-4 bg-white shadow-lg p-4 rounded-lg"
              >
                <h4 className="text-xl font-bold text-gray-800">{job.title}</h4>
                <p className="text-gray-600 italic">
                  {job.company} - {job.startDate} to {job.endDate}
                </p>
                <ul className="mt-4 list-disc pl-6 text-gray-600">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800">Certifications</h3>
            <ul className="mt-4 list-disc pl-6 text-gray-700">
              {selectedTemplate.certifications.map((cert, index) => (
                <li key={index}>{cert.title} - {cert.institution} ({cert.year})</li>
              ))}
            </ul>
          </section>

          <section className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
            {selectedTemplate.achievements.map((ac, index) => (
              <div key={index} className="mt-1 bg-white shadow-lg p-4 rounded-lg">
                {ac}
              </div>
            ))}
          </section>

          <section className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
            {selectedTemplate.education.map((edu, index) => (
              <div key={index} className="mt-4 bg-white shadow-lg p-4 rounded-lg">
                <h4 className="text-lg font-bold text-gray-800">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.startYear} - {edu.endYear}</p>
              </div>
            ))}
          </section>


        </div>
      </div>
    </>
  );
}

export default Resume10;