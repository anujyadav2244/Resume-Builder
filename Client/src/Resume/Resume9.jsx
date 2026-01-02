import Navbar from "../components/Navbar";
import Padding from "../components/Padding";
import profile from "../assets/profile.jpg";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCertificate } from "react-icons/fa";
import NoPrintWrapper from "../components/NoPrintWrapper";
import PrintButton from "../components/PrintButton";
import { useUser } from "../context/UserContext";

function Resume9() {
  const {selectedTemplate}=useUser()

  return (
    <div className="min-h-screen w-screen">
      <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

      <div className="lg:max-w-5xl mx-auto flex min-h-screen border-gray-300 rounded-lg overflow-hidden bg-white">
        <div className="w-2/5 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold">{selectedTemplate.name}</h1>
          <h2 className="text-xl font-semibold opacity-90">{selectedTemplate.jobTitle}</h2>

          <div className="space-y-2 text-sm opacity-90 text-center">
            <p><FaMapMarkerAlt className="inline-block mr-2"/> {selectedTemplate.contact.address}</p>
            <p><FaPhone className="inline-block mr-2"/> {selectedTemplate.contact.phone}</p>
            <p><FaEnvelope className="inline-block mr-2"/> {selectedTemplate.contact.email}</p>
          </div>

          <h3 className="text-lg bg-blue-500 py-2 mt-2 rounded-md font-semibold w-full text-center">Technical Skills</h3>
          <ul className="mt-3 text-sm w-full text-center">
            {selectedTemplate.technicalSkills.map((skill, index) => (
              <li key={index} className="py-1">{skill}</li>
            ))}
          </ul>
          <h3 className="text-lg bg-blue-500 py-2 mt-2 rounded-md font-semibold w-full text-center">Soft Skills</h3>
          <ul className="mt-3 text-sm w-full text-center">
            {selectedTemplate.softSkills.map((skill, index) => (
              <li key={index} className="py-1">{skill}</li>
            ))}
          </ul>

          <h3 className="text-lg bg-blue-500 py-2 mt-2 rounded-md font-semibold w-full text-center">Certifications</h3>
          <ul className="mt-3 text-sm w-full text-center">
            {selectedTemplate.certifications.map((cert, index) => (
              <li key={index} className="py-1"><FaCertificate className="inline-block mr-2"/> {cert.title} ({cert.year})</li>
            ))}
          </ul>

          <h3 className="text-lg bg-blue-500 py-2 mt-2 rounded-md font-semibold w-full text-center">Languages</h3>
          <ul className="mt-3 text-sm w-full text-center">
            {selectedTemplate.languages.map((lang, index) => (
              <li key={index} className="py-1">{lang.language} - {lang.familiarity}%</li>
            ))}
          </ul>

        </div>

        <div className="w-3/5 p-6 text-gray-800 dark:text-gray-300">
          <h3 className="text-2xl font-semibold border-b pb-2">Summary</h3>
          <p className="mt-2 text-md opacity-90">{selectedTemplate.professionalSummary}</p>

          <h3 className="text-2xl font-semibold mt-4 border-b pb-2">Work Experience</h3>
          {selectedTemplate.workExperience.map((job, index) => (
            <div key={index} className="mt-2 bg-gray-200 dark:bg-gray-700 p-3 rounded-md shadow-md">
              <h4 className="text-lg font-semibold">{job.title}</h4>
              <p className="text-sm italic opacity-80">{job.company} - {job.location} ({job.startDate} to {job.endDate})</p>
              <ul className="mt-2 list-disc pl-5 text-sm opacity-90">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <h3 className="text-2xl font-semibold mt-4 border-b pb-2">Education</h3>
          {selectedTemplate.education.map((edu, index) => (
            <div key={index} className="mt-1 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold">{edu.degree}</h4>
              <p className="text-sm">{edu.institution} ({edu.startYear} - {edu.endYear})</p>
            </div>
          ))}

<h3 className="text-2xl font-semibold mt-4 border-b pb-2">Achievements</h3>
          {selectedTemplate.achievements.map((ac, index) => (
            <div key={index} className="mt-1 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold">{ac}</h4>
            </div>
          ))}

          <h3 className="text-2xl font-semibold mt-4 border-b pb-2">Certifications</h3>
          <ul className="mt-4 list-disc pl-6 bg-gray-200 p-3 rounded-lg shadow-md text-gray-700">
            {selectedTemplate.certifications.map((cert, index) => (
              <li key={index}>{cert.title} - {cert.institution} ({cert.year})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Resume9;
