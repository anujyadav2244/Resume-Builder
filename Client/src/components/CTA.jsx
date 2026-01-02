import React from 'react'
import { useNavigate } from 'react-router-dom'

function CTA() {
  const navigate = useNavigate()
  return (
    <div className='py-10'>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6 text-lg lg:text-xl px-1 text-center">Join job seekers who have transformed their careers with our tools.</p>
        <button className="btn btn-outline rounded-box px-5 text-lg" onClick={()=>navigate('/templates')}>Create Your Resume</button>
      </div>
    </div>
  )
}

export default CTA
