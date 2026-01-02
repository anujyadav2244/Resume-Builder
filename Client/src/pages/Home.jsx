import { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import Timeline from "../components/Timeline";
import CTA from "../components/CTA";
import Features from "../components/Features";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [gradientPosition, setGradientPosition] = useState("0%");

  useEffect(() => {
    let position = 0;

    const interval = setInterval(() => {
      position = (position + 10) % 100; // Move gradient to the right
      setGradientPosition(`${position}%`);
    }, 200); // Smooth movement

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {show && (
        <div
          className="cursor-pointer text-sm md:text-lg alert shadow-lg flex justify-between p-2 md:p-4 rounded-lg font-bold text-white transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, #ffd700 0%, #ff8c00 30%, #8a2be2 70%, #4b0082 100%)`,
            backgroundSize: "200% 200%",
            backgroundPosition: `${gradientPosition} 50%`,
            transition: "background-position 0.5s ease-in-out"
          }}
        >
          <span onClick={()=>navigate('/intern-resume-form')}>🚀 Important Update: New Internship Fair Resume Added! Make One For Yourself Now!</span>
          <button onClick={() => setShow(false)} className="btn btn-sm bg-black bg-opacity-40 text-white">✖</button>
        </div>
      )}
      <Carousel />
      <Timeline />
      <Features />
      <CTA />
    </div>
  );
}

export default Home;
