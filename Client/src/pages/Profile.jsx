import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BiUser, BiKey } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Profile() {
  const navigate = useNavigate();
  const { userId, userEmail } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  const [email, setEmail] = useState('');
  const [passwordLength, setPasswordLength] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState(0); // 0: Profile, 1: OTP Verification, 2: New Password
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const otpRefs = useRef([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!userId) {
          setError("Please Log In First");
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/auth/fetch?id=${userId}`);
        if (response.data) {
          setEmail(response.data.email);
          setPasswordLength(response.data.passwordLength);
        }
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch user details.');
      }
    };

    fetchUserDetails();
  }, []);

  // OTP Handling
  const handleChangeOtp = (index, e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleRequestOtp = async () => {
    try {
      if(!userId)
        return
      setError('');
      setSuccess('');
      setLoading(true);
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });

      if (response.data) {
        setMode(1);
        setSuccess('OTP sent to your email.');
        setLoading(false);
      }
    } catch (error) {
      setError(error.response?.data || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError("Enter complete OTP!");
      return;
    }
  
    if (!newPassword || !confirmNewPassword) {
      setError("Please enter both password fields.");
      return;
    }
  
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      setError('');
      console.log("Sending request with:", { email, otp: enteredOtp, newPassword });
  
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', { 
        email, 
        otp: enteredOtp, 
        newPassword 
      });
  
      console.log("Response:", response.data);
  
      if (response.data) {
        setSuccess("Password Changed Successfully!");
        setTimeout(() => {
          setSuccess("");
          setMode(0);
        }, 2000);
      }
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      setError(error.response?.data || 'Invalid OTP');
    }
  };
  
  return (
    <div className='px-1 space-y-4'>
      {/* Profile Section */}
      {mode === 0 && (
        <div className='border border-gray-500 flex flex-col lg:flex-row lg:items-center p-4 rounded-lg px-5 md:space-x-10'>
          <div className='my-4 text-8xl overflow-hidden bg-base-300 w-fit text-base-content rounded-full border'>
            <BiUser />
          </div>
          <div className='text-xl text-base-content space-y-2'>
            <div className='md:flex gap-4'>
              <div><strong>Email:</strong></div>
              <div>{email || 'NA'}</div>
            </div>

            <div className='md:flex items-center gap-4'>
              <div><strong>Password:</strong></div>
              <div>{passwordLength ? '●'.repeat(passwordLength) : 'NA'}</div>
              <div className='my-2 md:my-0'>
                <button className='btn btn-outline px-3 rounded-box' onClick={handleRequestOtp} disabled={!userId}>
                  {loading ? (<span className="loading loading-spinner text-accent"></span>):("Change Password")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification */}
      {mode === 1 && (
        <div className='border border-gray-500 p-4 rounded-lg space-y-4 text-center'>
          <h2 className='text-2xl font-semibold'>Enter OTP & New Password</h2>
          <p className='text-base'>OTP has been sent to {email}</p>

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                maxLength="1"
                className="w-10 h-12 text-center text-xl border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none"
                value={digit}
                onChange={(e) => handleChangeOtp(index, e)}
                onKeyDown={(e) => handleBackspace(index, e)}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* New Password Input Fields */}
          <div className='flex flex-col items-center gap-3'>

          <label className="input input-bordered flex items-center gap-4 w-full md:max-w-md">
            <BiKey className='text-xl' />
            <input
              type="password"
              className="grow w-full"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-4 w-full md:max-w-md">
            <BiKey className='text-xl' />
            <input
              type="password"
              className="grow w-full"
              placeholder="Confirm Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </label>

          <button className='btn btn-outline px-4' onClick={handleVerifyOtp}>
            Verify OTP & Update Password
          </button>
        </div>
        {success && <div className='text-green-500 font-semibold text-xl'>{success}</div>}
        {error && <div className='text-red-500 font-semibold text-xl'>{error}</div>}
        </div>
      )}

      {/* Error and Success Messages */}
        {mode === 0 && <div>
              {success && <div className='text-green-500 font-semibold text-xl'>{success}</div>}
              {error && <div className='text-red-500 font-semibold text-xl'>{error}</div>}
        </div>}
      {/* Logout Button */}
        <div className='border border-gray-500 p-4 rounded-lg'>
          <button className='btn btn-outline px-3 py-2' onClick={handleLogout} disabled={!userId}>
            Logout
          </button>
        </div>
  
    </div>
  );
}

export default Profile;
