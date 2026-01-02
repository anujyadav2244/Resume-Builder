import React from 'react'
import logo from '../assets/Builder.png'
function Features() {
    const features = ['Free Access to All Features','Intuitive User-Friendly Interface','Wide Range of Customizable Templates','Preview and Download Functionality']
    return (
        <div className='text-center text-3xl font-bold md:py-10'>
            <h1 className='py-2'>Why Choose Us?</h1>
            <div className='py-3 flex flex-col justify-center gap-4 lg:px-5'>
            {
                features && features.map((feature,index) => {
                    return(
                        <div className="chat chat-start -z-0" key={feature}>
                        <div className="chat-image avatar">
                            <div className="w-14 md:w-16 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src={logo} />
                            </div>
                        </div>
                        <div className="chat-bubble text-lg md:text-xl lg:text-2xl py-1 flex items-center bg-base-300 text-base-content">{feature}</div>
                    </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Features
