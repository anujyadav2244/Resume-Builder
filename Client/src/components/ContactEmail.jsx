import React from 'react'
import logo from '../assets/Builder.png'

function ContactEmail() {
    const builders = [{name: 'Anuj Yadav', email: 'anujyadavjnp02@gmail.com'},{name: 'Akshat Gohil', email: 'akshatgohil4243@gmail.com'},{name: 'Vedant Rana', email:'vedantranayt@gmail.com'},{name: 'Parth Patel', email: 'pp4303686@gmail.com'}]
  return (
      <div className='w-full text-2xl font-bold pt-10 lg:pt-0 px-0'>
                    <div className='py-3'>For Urgent Queries, Contact Our Builders Directly Here: </div>
                    <div className='space-y-4'>
                        {
                            builders && builders.map((builder, index) => {
                                return (
                                    <div className="chat chat-start -z-0" key={index}>
                                        <div className="chat-image avatar">
                                            <div className="w-14 md:w-16 rounded-full hover:scale-125 transition-transform">
                                                <img
                                                    alt="Tailwind CSS chat bubble component"
                                                    src={logo}
                                                     />
                                            </div>
                                        </div>
                                        <div className="chat-bubble text-lg md:text-xl lg:text-2xl py-1 flex items-center bg-base-300 text-base-content">
                                            <span>Hi, I am {builder.name} Contact Me Here at: <a href={`mailto:${builder.email}`} className="text-blue-500 hover:underline">{builder.email}</a></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
  )
}

export default ContactEmail
