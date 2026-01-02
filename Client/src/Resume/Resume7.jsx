import Navbar from "../components/Navbar";
import Padding from "../components/Padding";
import profile from "../assets/profile.jpg";
import NoPrintWrapper from '../components/NoPrintWrapper.jsx';
import PrintButton from '../components/PrintButton';
import { useUser } from "../context/UserContext.jsx";

function Resume7() {
  const {selectedTemplate} = useUser();
  return (
    <>
      {/* Print Button - Will be hidden when printing */}
      <div className="min-h-screen">
      <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

      {/* Main Resume Container */}
      <div className="min-h-screen flex flex-row shadow-lg lg:max-w-5xl mx-auto bg-white print:shadow-none print:border-none">
        {/* Sidebar Section */}
        <div className="w-1/3 p-4 border-r border-gray-200">

          <h2 className="text-2xl font-bold mb-1">Technical Skills</h2>
          <ul className="mb-2">
            {selectedTemplate.technicalSkills.map((skill, index) => (
              <li key={index} className="bg-accent px-3 py-1 rounded mb-1.5">
                {skill}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-3">Soft Skills</h2>
          <ul>
            {selectedTemplate.softSkills.map((skill, index) => (
              <li key={index} className="bg-accent px-3 py-1 rounded mb-2">
                {skill}
              </li>
            ))}
          </ul>
          <h1 className="text-2xl font-bold">Languages</h1>
          <ul className="text-lg">
            {selectedTemplate.languages.map((language) => (
              <li key={language.language}>
                <div>{language.language}</div>
                <div>
                  <progress
                    value={language.familiarity}
                    max={100}
                    className="h-2 progress progress-accent"
                  ></progress>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Section */}
        <div className="w-2/3 p-4">
          <h1 className="text-3xl font-bold">{selectedTemplate.name}</h1>
          <h2 className="text-2xl text-gray-600 mb-4 pb-2` border-b">
            {selectedTemplate.jobTitle}
          </h2>
          <div className="mb-2 text-lg">
            <h3>{selectedTemplate.contact.phone}</h3>
            <h3>{selectedTemplate.contact.email}</h3>
            <h3>{selectedTemplate.contact.address}</h3>
          </div>
          <h3 className="text-2xl font-semibold border-b pb-2">
            Professional Summary
          </h3>
          <p className="mt-2 text-gray-700">{selectedTemplate.professionalSummary}</p>

          <h3 className="text-2xl font-semibold border-b pb-2 mt-3">
            Work Experience
          </h3>
          {selectedTemplate.workExperience.map((work, index) => (
            <div key={index} className="mt-1">
              <h4 className="text-xl font-bold">{work.title}</h4>
              <p className="text-gray-600 font-semibold text-xl">
                {work.company} | {work.startDate} - {work.endDate}
              </p>
              <ul className="list-disc ml-5 text-gray-700 text-lg">
                {work.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

<h3 className="text-2xl font-semibold border-b pb-2 mt-3">
            Achievements
          </h3>
          {selectedTemplate.achievements.map((ac, index) => (
            <div key={index} className="mt-1 text-lg">
            {ac}
            </div>
          ))}

          <h3 className="text-2xl font-semibold border-b pb-2 mt-6">
            Education
          </h3>
          <div className="mt-4">
            {
              selectedTemplate.education && selectedTemplate.education.map((education)=>(
              <>
            <h4 className="text-xl font-bold">
              {education.degree}
            </h4>
            <p className="text-gray-600 text-lg">
              {education.institution} (
              {education.startYear} -{" "}
              {education.endYear})
            </p>
              </>
              ))
            }
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Resume7;
