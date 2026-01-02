import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Builder.png';
import { BiHome, BiPlus, BiUser } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext.jsx';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [dark, setDark] = useState(false);
    const {userId,setUserId} = useUser()

    const handleThemeToggle = () => {
        setDark(!dark);
    }
    useEffect(() => {
        setUserId(localStorage.getItem('userId')||null)
        console.log(userId)
        if (dark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light')
        }
    })
    return (
        <div className="fixed top-0 left-0 z-50  bg-base-100 navbar px-3">
            <div onClick={()=>navigate('/')}>
                <img
                    src={logo}
                    alt=""
                    className="w-16 h-16 md:w-20 md:h-20 lg:h-20 lg:w-24 cursor-pointer px-1"
                />
            </div>
            <div className="flex justify-between lg:flex-1 w-full">
                <div className="btn btn-ghost text-2xl md:text-3xl">Resume Builder</div>
                <div className='lg:hidden'>
                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onChange={handleThemeToggle} />

                        {/* sun icon */}
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
            </div>

            {/* Hidden For Small Device */}
            <div className="hidden lg:flex justify-between gap-6 items-center">
                <div className="cursor-pointer">
                    <div className="space-x-3">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-lg btn btn-ghost ${isActive ? 'link-success' : 'link-info'}`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/templates"
                            className={({ isActive }) =>
                                `text-lg btn btn-ghost ${isActive ? 'link-success' : 'link-info'}`
                            }
                        >
                            Templates
                        </NavLink>

                        <NavLink
                            to="/contact-us"
                            className={({ isActive }) =>
                                `text-lg btn btn-ghost ${isActive ? 'link-success' : 'link-info'}`
                            }
                        >
                            Contact Us
                        </NavLink>

                        <NavLink
                                to="/about-us"
                                className={({ isActive }) =>
                                    `text-lg btn btn-ghost ${isActive ? 'link-success' : 'link-info'}`
                                }
                            >
                                About Us
                            </NavLink>
                        {!userId && <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `text-lg btn btn-ghost ${isActive ? 'link-success' : 'link-info'}`
                            }
                        >
                            Login
                        </NavLink>}
                    </div>
                </div>

                {/* User Profile Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <BiUser size={44} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                    >
                        <li>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) => `${isActive ? 'link-success' : 'link-info'}`}
                            >
                                Profile
                            </NavLink>
                        </li>

                        {/* Night Mode Toggle Inside Profile Dropdown */}
                        <li>
                            <label className="swap swap-flip text-3xl cursor-pointer">
                                {/* Hidden checkbox controls the state */}
                                <input type="checkbox" checked={dark} onChange={handleThemeToggle} />
                                <div className="swap-on">🌙</div>
                                <div className="swap-off">🌞</div>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            {/* For Small Devices */}
            <div className="fixed bottom-0 bg-base-100 z-auto lg:hidden btm-nav">
                <button
                    className={`${location.pathname === '/' ? 'active' : ''} text-2xl md:text-3xl`}
                    onClick={() => navigate('/')}
                >
                    <BiHome />
                </button>
                <button
                    className={`${location.pathname === '/templates' ? 'active' : ''} text-2xl md:text-3xl`}
                    onClick={() => navigate('/templates')}
                >
                    <BiPlus />
                </button>
                <div className='flex justify-center'>
                    <div className="dropdown dropdown-top dropdown-end">
                        <div tabIndex={0} className="btn btn-ghost m-1"><span className='text-2xl md:text-3xl'><BsThreeDotsVertical /></span></div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow text-base">
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) => `${isActive ? 'link-success' : 'link-info'}`}
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact-us"
                                    className={({ isActive }) => `${isActive ? 'link-success' : 'link-info'}`}
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                            <NavLink
                                to="/about-us"
                                className={({ isActive }) =>
                                    `${isActive ? 'link-success' : 'link-info'}`
                                }
                            >
                                About Us
                            </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
