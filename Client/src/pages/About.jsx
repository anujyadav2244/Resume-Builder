import React from 'react';
import logo from '../assets/Builder.png'
function About() {
    const owners = ['Akshat Gohil','Parth Patel','Anuj Yadav','Vedant Rana']
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Project Introduction</h2>
        <p className="text-lg">
          This project is developed by a team of passionate individuals: 
            {
                owners.map((owner, index)=>{
                    return(
                        <div key={index} className='flex items-center gap-4 py-1'>
                            <div>
                              
                                <img src={logo} alt="" className='w-10 h-10' />
                            </div>
                            <div>
                                {owner}
                            </div>
                        </div>
                    )
                })
            }
           We came together to create a seamless platform that aims to simplify the resume-building process. Our goal is to make professional resume creation accessible to everyone, no matter their experience or background. 
        </p>
      </section>

      <section className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold">Mission</h2>
        <p className="text-lg">
          Our mission is to empower job seekers by providing an easy-to-use, efficient, and free resume-building platform. We aim to help individuals create professional resumes that will increase their chances of landing their dream job.
        </p>
      </section>

      <section className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold">Vision</h2>
        <p className="text-lg">
          We envision a world where job seekers have access to the tools they need to showcase their skills and experience confidently. By improving the resume-building process, we hope to support individuals in their professional journey and contribute to a brighter future for everyone.
        </p>
      </section>
      <section className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold">Connect with Me</h2>
        <p className="text-lg">
          Have any questions or want to engage? Feel free to <span className="font-semibold">connect with me</span> on LinkedIn.
        </p>
        <a 
          href="https://www.linkedin.com/in/akshat-gohil-6345b6323/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 font-semibold underline"
        >
          Click here to visit my LinkedIn
        </a>
      </section>
    </div>
  );
}

export default About;
