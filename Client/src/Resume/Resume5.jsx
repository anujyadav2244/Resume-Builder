import Navbar from '../components/Navbar';
import Padding from '../components/Padding';
import profile from '../assets/profile.jpg'
import { BiPhone } from 'react-icons/bi';
import { BiMailSend } from 'react-icons/bi';
import { BiLocationPlus } from 'react-icons/bi';
import NoPrintWrapper from '../components/NoPrintWrapper.jsx';
import PrintButton from '../components/PrintButton';
import { useUser } from '../context/UserContext.jsx';

function Resume5() {
  const {selectedTemplate} = useUser()
  return (
    <div className='h-screen flex flex-col'>
      <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

      <div className='w-screen lg:max-w-5xl print:min-h-screen border px-3 mx-auto flex'>
        {/* Left Blue Section */}
        <div className='w-2/5 bg-blue-200 flex flex-col'>
          <div className='h-64 w-full border bg-no-repeat bg-cover flex flex-col justify-end'
            style={{ backgroundImage: `url(${selectedTemplate.image})` }}>
            <div className='text-2xl flex justify-center p-4 bg-opacity-80 text-white font-bold bg-blue-500'>
              {selectedTemplate.name.toUpperCase()}
            </div>
          </div>

          <section className='pt-2 px-3'>
            <div className='text-2xl font-semibold'>{selectedTemplate.jobTitle}</div>
            <div className={`font-semibold py-2 ${selectedTemplate.careerObjective.length > 400?'text-sm':'text-md'}`}>{selectedTemplate.careerObjective}</div>
          </section>

          <section className='px-2 py-1'>
            <div className='flex tems-center gap-1 text-md'>
              <BiPhone />{selectedTemplate.contact.phone}
            </div>
            <div className='flex items-center gap-1 text-md'>
              <BiMailSend />
              {selectedTemplate.contact.email}
            </div>
            <div className='flex items-center gap-1 text-md'>
              <BiLocationPlus />
              {selectedTemplate.contact.address}
            </div>
          </section>

          <section className='px-3 py-3 flex-grow'>
            <h2 className='text-2xl font-semibold text-blue-500'>LANGUAGES</h2>
            <ul className='space-y-1 py-1'>
              {selectedTemplate.languages.map((language) => (
                <li key={language.name}>
                  <div className='font-semibold text-md'>{language.language}</div>
                  <progress className="progress progress-info w-56 h-1.5" value={language.familiarity} max="100"></progress>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className='w-3/5 px-4'>
          <section className='py-1 border-b-2 border-blue-600 pb-3'>
            <h2 className='text-blue-500 font-semibold text-2xl py-1'>SKILLS</h2>
            <ul className='max-h-44 flex flex-col flex-wrap'>
              {selectedTemplate.technicalSkills && selectedTemplate.technicalSkills.map((skill) => (
                <li className='font-semibold text-lg min-w-1/3' key={skill}>{skill}</li>
              ))}
            </ul>
          </section>

          <section className='mt-2 border-b-2 border-blue-600 pb-3'>
            <h2 className='text-blue-500 font-semibold text-2xl py-1'>EDUCATION</h2>
            <ul className='space-y-1'>
              {selectedTemplate.education && selectedTemplate.education.map((education) => (
                <li key={education.institution}>
                  <div className='font-semibold text-xl text-blue-500'>{education.degree}</div>
                  <div className='font-semibold text-lg'>{education.startYear} - {education.endYear}</div>
                  <div className='font-semibold text-lg'>{education.institution}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className='mt-2 border-b-2 pb-2 border-blue-600'>
            <h2 className='text-blue-500 font-semibold text-2xl'>SOFT SKILLS</h2>
            <ul className='py-1 max-h-44 flex flex-col flex-wrap '>
              {selectedTemplate.personalSkills && selectedTemplate.personalSkills.map((skill) => (
                <li className='font-semibold text-lg min-w-1/3'>
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          <section className='mt-2 border-b-2 pb-2 border-blue-600'>
            <h2 className='text-blue-500 font-semibold text-2xl'>CERTIFICATES</h2>
            <ul className='py-1'>
              {selectedTemplate.certifications && selectedTemplate.certifications.map((certificate) => (
                <li>
                  <div className='text-xl text-blue-500 font-semibold'>
                    {certificate.title}
                  </div>
                  <div className='text-lg font-semibold'>
                    {certificate.description}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>

  )
}

export default Resume5
