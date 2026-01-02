import React from 'react'
import ContactEmail from '../components/ContactEmail'
import ContactForm from '../components/ContactForm'

function Contact() {

    const faqs = [
        { question: 'How do I create a resume?', answer: 'To create a resume, simply choose a template from our selection, then fill in the required fields such as your personal details, education, work experience, and skills. Once you’re done, you can download your resume in PDF format.' },
        { question: ' Is there a limit to how many resumes I can create?', answer: 'There’s no limit! You can create and download as many resumes as you need.' },
        { question: ' How do I contact support if I have a problem?', answer: "You can contact support by filling out the contact form on this page. Simply provide your name, email, and message, and our team will get back to you as soon as possible. If your issue is urgent, you can directly tap on email at the above addresses, and we'll make sure to reply within a couple of hours." }
    ]
    return (
        <div>
            <div className='w-screen lg:flex gap-16 px-2'>
                <ContactForm />
                <ContactEmail />
            </div>
            <div className='px-4 py-20'>
                <h1 className='text-2xl font-bold py-3'>FAQs</h1>
                <div className="join join-vertical w-full rounded-box border border-gray-400">
                    {
                        faqs && faqs.map((faq) =>
                            <div className="collapse collapse-arrow join-item border-base-300 border">
                                <input type="radio" name="my-accordion-4" />
                                <div className="collapse-title text-xl font-medium">{faq.question}</div>
                                <div className="collapse-content text-lg">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Contact
