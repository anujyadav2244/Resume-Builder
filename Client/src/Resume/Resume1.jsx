import React, { useEffect } from "react";
import profile from "../assets/profile.jpg";
import Navbar from "../components/Navbar";
import Padding from "../components/Padding";
import NoPrintWrapper from "../components/NoPrintWrapper.jsx";
import PrintButton from "../components/PrintButton.jsx";
import { useUser } from "../context/UserContext.jsx";

function Resume1() {
  const { selectedTemplate } = useUser()

  return (
    <>
      <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

      <div className="flex max-w-5xl m-auto min-h-screen">
        <div className="w-2/5 bg-yellow-800 text-white">
          <div className="flex justify-center items-center h-1/5">
            <div className="h-40 w-40 lg:h-32 lg:w-32 border-2 rounded-full overflow-auto object-fill">
              <img src={selectedTemplate.image} alt="Profile" className="h-full w-full" />
            </div>
          </div>
          <div className="px-3 text-white space-y-2">
            <div>
              <div className="text-3xl font-semibold py-1">Contact</div>
              <div>
                <div>
                  <div className="text-xl font-semibold">Phone</div>
                  <div className="text-md">{selectedTemplate.contact.phone}</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">Email</div>
                  <div className="text-md">{selectedTemplate.contact.email}</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">Address</div>
                  <div className="text-md">{selectedTemplate.contact.address}</div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl pt-2 font-semibold">Personal Skills</h1>
              <ul className="space-x-0.5 flex flex-col max-h-40 flex-wrap">
                {selectedTemplate.personalSkills.map((skill, index) => (
                  <li key={index} className={`${selectedTemplate.personalSkills.length >= 5 ? 'text-md' : 'text-lg'}`}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h1 className="text-2xl font-semibold">Hobbies</h1>
              <ul className="text-md">
                {selectedTemplate.hobbies.map((hobby) => (
                  <li key={hobby} className={`${selectedTemplate.hobbies.length >= 5?'text-sm':'text-md'}`}>{hobby}</li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Languages</h1>
              <ul>
                {selectedTemplate.languages.map((language) => (
                  <li key={language.language}>
                    <div>{language.language}</div>
                    <div>
                      <progress
                        value={language.familiarity}
                        max={100}
                        className="h-1 progress progress-success"
                      ></progress>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full min-h-screen h-fit bg-orange-100 px-3">
          <div className="py-5 h-1/5">
            <div className="text-5xl font-semibold pt-10">
              {selectedTemplate.name}
            </div>
            <div className="text-2xl">{selectedTemplate.jobTitle}</div>
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Career Objective</h1>
            <div className={`${selectedTemplate.careerObjective.length > 200 ? 'text-sm' : 'text-lg'}`}>{selectedTemplate.careerObjective}</div>

            <h1 className="text-2xl pt-5 font-semibold">Education</h1>
            <ul className="text-xs py-1.5">
              {selectedTemplate.education.map((education) => (
                <li key={education.degree}>
                  <h2 className="font-semibold text-lg">{education.degree}</h2>
                  <div className="text-sm">{education.institution}</div>
                  <div className="text-sm">
                    {education.startYear} - {education.endYear}
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <h1 className="text-2xl font-semibold">Technical Skills</h1>
              <ul className="text-lg flex flex-col flex-wrap border border-white max-h-40">
                {selectedTemplate.technicalSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <h1 className="text-2xl pt-5 font-semibold">Certifications</h1>
            <ul>
              {selectedTemplate.certifications.map((certificate) => (
                <li key={certificate.title}>
                  <div className="font-semibold text-lg">{certificate.title}</div>
                  <div>{certificate.description}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resume1;
