import React, { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ContactForm() {
    const navigate = useNavigate()
    const {userEmail, setUserEmail, userId} = useUser();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    useEffect(() => {
        if (!userId) {
            return;
        }

        axios
            .get(`http://localhost:8080/api/auth/fetch?id=${userId}`)
            .then((response) => {
                if (response.data.email) {
                    setUserEmail(response.data.email);
                }
            })
            .catch((error) => {
                setError("Failed to fetch user details.");
                console.error(error);
            });
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!name || !userEmail || !message) {
            setError("All fields are required!");
            return;
        }

        const contactData = {
            name,
            email: userEmail,  // Auto-filled email from user context
            message,
        };

        try {
            const response = await axios.post('http://localhost:8080/api/contact-requests/add', contactData);
            setSuccess(response.data); // Show success message from backend
            setError('');
            setName('');
            setMessage('');
        } catch (err) {
            setError("Failed to submit the request. Please try again.");
            setSuccess('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-3 w-full'>
            <h1 className='text-2xl py-3 font-bold'>Have Questions? Contact Us</h1>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Name Input */}
            <label className="input input-bordered flex items-center gap-4 lg:max-w-4xl">
                <span className='text-lg'><BiUser /></span>
                <input
                    type="text"
                    className="grow"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>

            {/* Message Input */}
            <label className='flex'>
                <textarea
                    className="textarea textarea-bordered w-full h-48 lg:max-w-4xl"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
            </label>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className='btn btn-outline rounded-box px-7 text-lg'
                    onClick={(e) => {
                        if (!userId) {
                            e.preventDefault(); // Prevent form submission
                            navigate('/login'); // Redirect to login if not logged in
                        }
                    }}
                >
                    Submit
                </button>
            </div>
        </form>    )
}

export default ContactForm
