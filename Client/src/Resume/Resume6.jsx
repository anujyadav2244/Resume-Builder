import React from 'react'
import Navbar from '../components/Navbar'
import Padding from '../components/Padding'
import NoPrintWrapper from '../components/NoPrintWrapper.jsx';
import PrintButton from '../components/PrintButton';
import { useUser } from '../context/UserContext.jsx';
import { BiCurrentLocation, BiMessage, BiPhone } from 'react-icons/bi';

function Resume6() {
  const {selectedTemplate} = useUser();

  return (
    <div className='min-h-screen flex flex-col'>
        <NoPrintWrapper>
        <Navbar />
        <Padding />
        <div className="p-3">
          <PrintButton text="Print Resume" />
        </div>
      </NoPrintWrapper>

        <div className='w-screen lg:max-w-5xl border px-3 mx-auto'>
            <header className='border-b border-black flex min-h-48'>
                <div className='flex flex-col justify-center w-3/5'>
                    <h1 className='text-4xl font-bold break-words'>{selectedTemplate.name.toUpperCase()}</h1>
                    <h3 className='text-2xl pt-3 font-semibold'>Web Developer</h3>
                </div>
                <div className='flex flex-col justify-center text-lg'>
                    <div className='flex items-center'>
                        <span>
                          <BiPhone></BiPhone>
                        </span>
                        <span>
                        {selectedTemplate.contact.phone}
                        </span>
                    </div>
                    <div className='flex items-center'>
                        <span>
                          <BiMessage></BiMessage>
                        </span>
                        <span>
                        {selectedTemplate.contact.email}
                        </span>
                    </div>
                    <div className='flex items-center'>
                        <span>
                          <BiCurrentLocation></BiCurrentLocation>
                        </span>
                        <span>
                        {selectedTemplate.contact.address}
                        </span>
                    </div>
                </div>
            </header>
            
            <main className='mt-2 py-2 flex'>
                <div className='w-3/5 px-2 border-r-2 border-r-black'>
                    <section className='border-b-2 border-black pb-3'>
                        <h1 className='text-2xl font-semibold'>Work Experience</h1>
                        <ul>
                            {selectedTemplate.workExperience && selectedTemplate.workExperience.map((experience)=>(
                                <li className='mt-3'>
                                    <h3 className='text-xl font-bold'>{experience.title}</h3>
                                    <div className='flex justify-between'>
                                    <h3 className='text-lg font-semibold'>{experience.company}</h3>
                                    <h3 className='text-lg font-semibold'>{experience.startDate} - {experience.endDate}</h3>
                                    </div>
                                    <div>
                                        <ul className='space-y-1'>
                                        {experience.responsibilities && experience.responsibilities.map((responsibility)=>(
                                            <li className='text-lg'>{responsibility}</li>
                                        ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>  

                    <section className='border-b-2 border-black pb-2'>
                        <h2 className='text-2xl font-semibold'>
                            Achievements
                        </h2>
                        <div>
                            <ul className='space-y-1'>
                            {selectedTemplate.achievements && selectedTemplate.achievements.map((achievement)=>(
                                <li className='text-xl'>{achievement}</li>
                            ))}
                            </ul>
                        </div>
                    </section>

                    <section className='border-b-2 border-black pb-2'>
                        <h2 className='text-2xl font-semibold'>Certifications </h2>
                        <ul>
                            {selectedTemplate.certifications && selectedTemplate.certifications.map((certification)=>(
                                <li>
                                    <div className='text-xl font-semibold'>{certification.title}</div>
                                    <div className='text-lg font-semibold'>{certification.year}</div>
                                    <div className='text-lg'>{certification.institution}</div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div className='w-2/5 px-2'>
                    <section className='border-b-2 border-black pb-2'>
                        <h2 className='text-2xl font-semibold'>Summary</h2>
                        <div className='p-0.5'>
                            {selectedTemplate.professionalSummary}
                        </div>  
                    </section>

                    <section className='mt-2 border-b-2 pb-2 border-black'>
                        {
                            selectedTemplate.technicalSkills && 
                            <>
                            <h2 className='text-2xl font-semibold'>Skills</h2>
                        <div className='p-0.5'>
                            <ul className='space-y-0 max-h-52 flex flex-col flex-wrap'>
                                {
                                    selectedTemplate.technicalSkills.map((skill)=>(
                                        <li className='font-semibold w-1/2 text-lg'>{skill}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        </>
                        }
                    </section>

                    <section className='mt-2 border-b-2 pb-2 border-black'>
                        {
                            selectedTemplate.softSkills && 
                            <>
                            <h2 className='text-2xl font-semibold'>Soft Skills</h2>
                        <div className='p-0.5'>
                            <ul className='space-y-0 max-h-48 flex flex-col flex-wrap'>
                                {
                                    selectedTemplate.softSkills.map((skill)=>(
                                        <li className='font-semibold text-lg'>{skill}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        </>
                        }
                    </section>
                    
                    <section className='border-b-2 border-black mt-2 pb-2'>
                        <h2 className='text-2xl font-semibold pb-2'>Languages</h2>
                        <div className='flex flex-col flex-wrap max-h-20'>

                        {
                          selectedTemplate.languages.map((language)=>(
                            <div className='flex items-center gap-3'>

                                    <div className='font-semibold min-w-1/2'>{language.language}</div>
                                    <progress value={language.familiarity} max={100} className='h-2 border  border-black progress progress-success'></progress>
                            </div>
                        
                      ))
                    }
                    </div>
                    </section>
                </div>
            </main>
        </div>
    </div>
  )
}

export default Resume6
