import React from 'react';
import Navbar from '../components/Navbar';
import Padding from '../components/Padding';
import NoPrintWrapper from '../components/NoPrintWrapper.jsx';
import PrintButton from '../components/PrintButton';
import { useUser } from '../context/UserContext.jsx';

function Resume4() {
  const { selectedTemplate } = useUser();

  return (
    <div className='min-h-screen w-screen flex flex-col items-center bg-gray-100 print:h-full print:w-screen'>
      {/* Navbar and Print Button - No Print */}
      <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

      {/* Resume Container */}
      <div className='lg:max-w-5xl w-full mx-auto bg-white text-black p-6 rounded-lg shadow-lg flex-grow'>
        <header className='flex flex-row items-center md:items-start border-b pb-4 space-x-10'>
          <div className='h-28 w-28 border-4 border-indigo-500 rounded-full overflow-hidden'>
            <img src={selectedTemplate.image} alt="Profile" />
          </div>
          <div className='mt-4 md:mt-0 md:ml-6 text-left space-y-1'>
            <h1 className='text-4xl font-bold print:text-3xl'>{selectedTemplate.name}</h1>
            <h2 className='text-2xl font-medium text-indigo-600'>{selectedTemplate.jobTitle}</h2>
            <section className='mb-1'>
              <h2 className='text-xl font-semibold text-indigo-600'>Contact Information</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 text-md'>
                <p><strong>Phone:</strong> {selectedTemplate.contact.phone}</p>
                <p><strong>Email:</strong> {selectedTemplate.contact.email}</p>
                <p className='sm:col-span-2'><strong>Address:</strong> {selectedTemplate.contact.address}</p>
              </div>
            </section>
          </div>
        </header>

        <main className='mt-2'>
          <section className='mb-2'>
            <h2 className='text-xl font-semibold text-indigo-600'>Career Objective</h2>
            <p className={`mt-2 ${selectedTemplate.careerObjective.length > 400 ? 'text-md' : 'text-lg'}`}>
              {selectedTemplate.careerObjective}
            </p>
          </section>

          <section className='mb-3'>
            <h2 className='text-xl font-semibold text-indigo-600'>Technical Skills</h2>
            <div className='flex flex-wrap'>
              {selectedTemplate.technicalSkills.map(skill => (
                <span key={skill} className='bg-indigo-100 text-indigo-800 text-sm font-medium m-0.5 px-3 py-2 rounded'>
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className='mb-3'>
            <h2 className='text-xl font-semibold text-indigo-600'>Education</h2>
            <ul className='space-y-1'>
              {selectedTemplate.education.map(edu => (
                <li key={edu.degree}>
                  <strong>{edu.degree}</strong> - {edu.institution} ({edu.startYear} - {edu.endYear})
                </li>
              ))}
            </ul>
          </section>

          <section className='mb-4'>
            <h2 className='text-xl font-semibold text-indigo-600'>Personal Skills</h2>
            <ul className='list-disc list-inside flex flex-wrap'>
              {selectedTemplate.personalSkills.map(skill => (
                <span key={skill} className='bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-2 rounded m-1'>
                  {skill}
                </span>
              ))}
            </ul>
          </section>

          <section className='mb-4'>
            <h2 className='text-xl font-semibold text-indigo-600'>Certifications</h2>
            <ul>
              {selectedTemplate.certifications.map(cert => (
                <li key={cert.title} className='mt-1 text-md'>
                  <strong>{cert.title}</strong> - {cert.description}
                </li>
              ))}
            </ul>
          </section>

          <section className='mb-3'>
            <h2 className='text-xl font-semibold text-indigo-600'>Languages</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
              {selectedTemplate.languages.map(language => (
                <div key={language.language}>
                  <p>{language.language}</p>
                  <progress value={language.familiarity} max={100} className='w-full progress progress-primary'></progress>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Resume4;
