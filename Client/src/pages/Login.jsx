import { BiKey, BiUser } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function Login() {
  const location = useLocation();
  const {setUserId, setUserEmail} = useUser();
  // Define state variables
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent page reload

    // Log form data to the console
    console.log({
      email,
      password
    });

    // Example of error handling (can be updated to actual logic)
    if (!email || !password) {
      setError('Please fill in both email and password');
      setTimeout(() => {
        setError('');
      }, 3000);
    } else {
      try
      {
        const response = await axios.post('http://localhost:8080/api/auth/login',{email,password});
        if(response.data)
        {
          if(location.pathname.includes('/owner-login'))
          {
            setUserId(response.data);
            navigate('/owner-dashboard');
            return;
          }
          setUserId(response.data);
          setUserEmail(email);
          localStorage.setItem("userId",response.data);
          navigate("/");
        }
      }
      catch(error)
      {
        setError(error.response.data)
      }
    }
  };

  return (
    <div className={`flex justify-center px-5 ${location.pathname.includes('/owner-login')?'py-20':''}`}>
      <form className='space-y-6 w-full max-w-md' onSubmit={handleSubmit}>
        <h1 className='text-3xl font-bold text-center pb-5'>Login</h1>

        <label className="input input-bordered flex items-center gap-4 w-full">
          <span className='text-xl'>
            <BiUser />
          </span>
          <input
            type="email"
            name='email'
            className="grow w-full"
            placeholder="Registered Email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-4 w-full">
          <span className='text-xl'>
            <BiKey />
          </span>
          <input
            type="password"
            name='password'
            className="grow w-full"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* Display error or success messages */}
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
        {success && <p className="text-green-500 text-center font-semibold">{success}</p>}

       {!location.pathname.includes('/owner-login') && <div className='text-lg flex justify-center space-x-1'>
          <span>Don't Have an Account? Register </span>
          <span className='text-accent font-semibold'>
            <Link to='/register'>
              Here
            </Link>
          </span>
        </div>}

        <div className='flex justify-center'>
          <button type="submit" className='btn btn-outline px-7 text-lg flex'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
