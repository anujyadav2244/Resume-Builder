import { BiEnvelope, BiKey } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from "axios";
import { useUser } from '../context/UserContext';

function Register() {
  const { setUserEmail } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState(1); // Mode 1: Email/Pass, Mode 2: OTP
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus(); // Move to next input
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus(); // Move focus back
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 1) {
      if (!email || !password || !confirmPassword) {
        setError("Enter all fields first");
      } else if (password !== confirmPassword) {
        setError("Passwords do not match");
      } else {
        try {
          setLoading(true);
          const response = await axios.post('http://localhost:8080/api/auth/register-otp', { email });
          setLoading(false);

          if (response.data) {
            setUserEmail(email);
            setMode(2);
          }
        } catch (error) {
          setLoading(false);
          setError(error.response?.data || 'An error occurred during registration');
        }
      }
    } else if (mode === 2) {
      const otpValue = otp.join(''); // Join the OTP digits
      if (otpValue.length !== 6) {
        setError("Enter the complete 6-digit OTP");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8080/api/auth/verify-otp', { email, password, otp: otpValue });
        setLoading(false);

        if (response.data) {
          setSuccess('Registration successful!');
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (error) {
        setLoading(false);
        setError(error.response?.data || 'Invalid OTP');
      }
    }

    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
  };

  return (
    <div>
      <form className='flex flex-col items-center space-y-6' onSubmit={handleSubmit}>
        <h1 className='text-3xl font-bold text-center pb-5'>Register</h1>
        {mode === 2 && <div className='font-semibold text-xl'>OTP has been sent successfully to <span className='text-success'>{email}</span></div>}
        {mode === 1 ? (
          <>
            <label className="input input-bordered flex items-center gap-4 w-full md:max-w-md">
              <span className='text-xl'><BiEnvelope /></span>
              <input
                type="email"
                name="email"
                className="grow w-full"
                placeholder="Email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-4 w-full md:max-w-md">
              <span className='text-xl'><BiKey /></span>
              <input
                type="password"
                name="password"
                className="grow w-full"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-4 w-full md:max-w-md">
              <span className='text-xl'><BiKey /></span>
              <input
                type="password"
                name="confirmPassword"
                className="grow w-full"
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </>
        ) : (
          <div className="flex space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                autoFocus = {index===0}
                className="w-12 h-12 text-xl text-center border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>
        )}

        {mode === 1 && (
          <div className='text-lg'>
            <span>Already have an account? Login </span>
            <span className='text-accent font-semibold'>
              <Link to='/login'>Here</Link>
            </span>
          </div>
        )}

        <div className='text-lg font-semibold'>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>

        <div>
          <button type="submit" className='btn btn-outline px-7 text-lg flex' disabled={loading}>
            {loading ? <span className="loading loading-spinner text-secondary"></span> : mode === 1 ? "Register" : "Verify OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
