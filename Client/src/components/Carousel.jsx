import React from 'react'
import image1 from '../assets/FresherResume5.jpg'
import image2 from '../assets/FresherResume4.png'
import image3 from '../assets/ExperiencedResume1.jpg'
import { useNavigate } from 'react-router-dom'

function Carousel() {
  const navigate = useNavigate()
  return (
    <div>
      
      <div className='flex flex-col lg:flex-row items-center justify-evenly  md:py-6 lg:py-16'>

        <div className='lg:w-3/5'>
          <h1 className='primary-content text-2xl md:text-3xl lg:text-4xl py-3 font-bold text-center'>
            Transform Your Career Story with Our Easy-to-Use Templates
          </h1>
          <div className='text-center py-3 px-2 text-md md:text-lg lg:text-lg text-base-content'>
          Design the perfect resume with ease using our expertly crafted templates. Our platform gives you the flexibility to showcase your skills and accomplishments in a clean, modern format. Whether you're entering the job market or looking to update your career profile, our templates are the perfect starting point.
          </div>
          <div className='flex justify-center py-4'>
            <button className='btn rounded-box btn-outline text-lg' onClick={()=>navigate('/templates')}>Choose A Template</button>
          </div>

        </div>

        <div className="carousel rounded-box w-64 md:w-72 lg:w-80  shadow-xl border border-gray-500/80">
          <div className="carousel-item w-full transition-transform duration-300 hover:-translate-x-10">
            <img
              src={image1}
              className="w-full"
              alt="Resume Image 1" />
          </div>
          <div className="carousel-item w-full">
            <img
              src={image2}
              className="w-full"
              alt="Resume Image 2" />
          </div>
          <div className="carousel-item w-full">
            <img
              src={image3}
              className="w-full"
              alt="Resume Image 3" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel
