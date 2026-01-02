import Navbar from '../components/Navbar'
import Padding from '../components/Padding'
import NoPrintWrapper from '../components/NoPrintWrapper.jsx';
import PrintButton from '../components/PrintButton';
import { useUser } from '../context/UserContext.jsx';

function Resume8() {
  const { selectedTemplate } = useUser();

  return (
    <div className='min-h-screen'>
      <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

      <div className='min-h-screen h-full px-4 flex flex-col  max-w-5xl mx-auto'>
        <header className='flex flex-col mb-2 pb-2'>
          <div className='mb-1'>
            <h1 className='text-3xl'><strong>{selectedTemplate.name}</strong></h1>
          </div>
          <div className='mb-1'>
            <h1 className='text-2xl'>{selectedTemplate.jobTitle}</h1>
          </div>
          <div className='text-lg mb-2'>
            <span className='mr-5'>{selectedTemplate.contact.address}</span>
            <span className='mr-5'>{selectedTemplate.contact.email}</span>
            <span className='mr-5'>{selectedTemplate.contact.phone}</span>
          </div>
        </header>

        <main>
          <section className='pb-2 mb-1 border-t border-black pt-2'>
            <h1 className='text-xl bg-gray-300 w-fit px-3 py-1 font-semibold rounded-full'>Professional Summary</h1>
            <div className={`flex-wrap p-2 ${selectedTemplate.professionalSummary.length > 400 ? 'text-md' : 'text-lg'}`}>
              <p>{selectedTemplate.professionalSummary}</p>
            </div>
          </section>

          <section className='pb-2 mb-1 border-t border-black pt-2'>
            <h1 className='text-xl bg-gray-300 w-fit px-3 py-1 font-semibold rounded-full'>Technical Skills</h1>
            <ul className='w-full flex flex-wrap py-1 gap-5'>
              {selectedTemplate.technicalSkills && selectedTemplate.technicalSkills.map((skill) => (
                <li key={skill} className='text-lg bg-base-300 font-semibold mt-1 p-2 rounded-lg'>{skill}</li>
              ))}
            </ul>
          </section>

          <section className='pb-2 mb-1 border-t border-black pt-2'>
            <h1 className='text-xl bg-gray-300 w-fit px-3 py-1 font-semibold rounded-full'>Experience</h1>
            <div>
              <ul>
                {selectedTemplate.workExperience && selectedTemplate.workExperience.map((experience) => (
                  <li className='mt-2' key={experience.title}>
                    <h3 className='text-xl font-bold'>{experience.title}</h3>
                    <div className='flex justify-between'>
                      <h3 className='text-lg font-semibold'>{experience.company}</h3>
                      <h3 className='text-lg font-semibold'>{experience.startDate} - {experience.endDate}</h3>
                    </div>
                    <div>
                      <ul className='space-y-1'>
                        {experience.responsibilities && experience.responsibilities.map((responsibility) => (
                          <li className='text-lg' key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className='pb-2 mb-1 border-t border-black pt-2'>
            <h1 className='text-xl bg-gray-300 w-fit px-3 py-1 font-semibold rounded-full'>Education</h1>
            <ul className='py-2'>

              {
                selectedTemplate.education && selectedTemplate.education.map((education) => (
                  <li key={education.institution} className='space-y-1'>
                    <div className='flex justify-between font-semibold text-xl'>
                      <div>{education.degree}</div>
                      <div>{education.startYear} - {education.endYear}</div>
                    </div>
                    <div className='text-lg'>
                      {education.institution}
                    </div>
                  </li>
                ))
              }
            </ul>
          </section>
          <section className='border border-t-black'>

            <h3 className="text-xl font-semibold border-b pb-2 mt-3 bg-gray-300 w-fit rounded-full px-3 py-1">
              Achievements
            </h3>
            {selectedTemplate.achievements.map((ac, index) => (
              <div key={index} className="mt-1 text-lg">
                {ac}
              </div>
            ))}
          </section>

          <section className='pb-2 mb-1x text-xl border-t border-black pt-2'>
            <h1 className='text-xl bg-gray-300 w-fit px-3 py-1 font-semibold rounded-full'>Additional Information</h1>
            <div className='flex gap-2 mt-1 flex-wrap'>
              <h2 className='font-semibold'>Personal Skills: </h2>
              <div>
                <ul className='flex gap-2 items-center'>
                  {selectedTemplate.softSkills && selectedTemplate.softSkills.map((skill, index) => (
                    <li key={skill} className='bg-base-300 text-lg p-1 rounded-lg font-semibold'>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='flex gap-2'>
              <h2 className='font-semibold'>Languages: </h2>
              <div>
                <ul className='flex gap-1'>
                  {selectedTemplate.languages && selectedTemplate.languages.map((langauge, index) => (
                    <li key={langauge.language}>{langauge.language} {index !== selectedTemplate.languages.length - 1 && ','}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='flex gap-2'>
              <h2 className='font-semibold'>Certificates: </h2>
              <div>
                <ul className='flex gap-1'>
                  {selectedTemplate.certifications && selectedTemplate.certifications.map((certification, index) => (
                    <li key={certification.title}>
                      <div>
                        {certification.title}
                        {certification.year}
                        {index !== selectedTemplate.certifications.length - 1 && ','}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Resume8