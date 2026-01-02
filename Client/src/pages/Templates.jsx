import React, { useEffect, useState } from "react";
import SelectCategory from "../components/SelectCategory.jsx";
import FresherResume1 from "../assets/FresherResume1.png";
import FresherResume2 from "../assets/FresherResume2.jpg";
import FresherResume3 from "../assets/FresherResume3.png";
import FresherResume4 from "../assets/FresherResume4.png";
import FresherResume5 from "../assets/FresherResume5.jpg";
import ExperiencedResume1 from "../assets/ExperiencedResume1.jpg";
import ExperiencedResume2 from "../assets/ExperiencedResume2.jpg";
import ExperiencedResume3 from "../assets/ExperiencedResume3.jpg";
import ExperiencedResume5 from "../assets/ExperiencedResume5.jpg";
import ExperiencedResume4 from '../assets/ExperiencedResume4.jpg'
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import axios from "axios";
import HelpMenu from '../components/HelpMenu.jsx'
function Templates() {
  const {userId} = useUser();
  const { beginnerUserTemplates, experiencedUserTemplates, setBeginnerUserTemplates, setExperiencedUserTemplates, selectedTemplate, setSelectedTemplate } = useUser();
  const navigate = useNavigate();

  const beginner = [
    { image: FresherResume1, path: "/resume1" },
    { image: FresherResume2, path: "/resume2" },
    { image: FresherResume3, path: "/resume3" },
    { image: FresherResume4, path: "/resume4" },
    { image: FresherResume5, path: "/resume5" },
  ];

  const experienced = [
    { image: ExperiencedResume1, path: "/resume6" },
    { image: ExperiencedResume2, path: "/resume7" },
    { image: ExperiencedResume3, path: "/resume8" },
    {
      image: ExperiencedResume4, path: '/resume9'
    },
    { image: ExperiencedResume5, path: "/resume10" },
  ];

  const [category, setCategory] = useState("Fresher");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    const fetchUserTemplates = async () => {
      try {
        if(category==='Fresher')
        {
          const response = await axios.get(`http://localhost:8080/api/beginner-resume/get-by-userId?userId=${userId}`);
          setBeginnerUserTemplates(response.data);
        }
        else
        {
          const response = await axios.get(`http://localhost:8080/api/experienced-resume/get-by-userId?userId=${userId}`);
          setExperiencedUserTemplates(response.data);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchUserTemplates();
  }, [category]);

  const handleTemplateClick = (template) => {
    // Toggle selected template if it's the same one
    if (selectedTemplate?.id === template.id) {
      setSelectedTemplate(null); // Deselect if the same template is clicked again
    } else {
      setSelectedTemplate(template);
      console.log(selectedTemplate)
    }
  };

  return (
    <>
      <SelectCategory setCategory={setCategory} category={category} />
      <div className="px-5 py-2 space-y-3">
        <div className="flex justify-between">
          <button className="btn btn-outline text-base" onClick={() =>
             {!userId?navigate('/login'):category === 'Fresher'?navigate("/template/add-fresher"):navigate("/template/add-experienced")}
             }>
            Add {category === "Fresher" ? "Fresher" : "Experienced"} Template
          </button>
          <HelpMenu/>
        </div>

        {/* Custom Templates Section */}
        <div className="flex flex-wrap gap-3">
          {category === "Fresher"
            ? (beginnerUserTemplates && beginnerUserTemplates.map((template, index) => (
              <div
                key={index}
                className={`p-2 text-lg cursor-pointer rounded-lg bg-base-300 ${selectedTemplate?.id === template.id ? 'bg-primary text-primary-content' : ''}`}
                onClick={() => 
                  handleTemplateClick(template)
                }
              >
                {template.templateName || "Unnamed Template"}
              </div>)
            ))
            : (experiencedUserTemplates && experiencedUserTemplates.map((template, index) => (
              <div
                key={index}
                className={`p-2 text-lg cursor-pointer rounded-lg bg-base-300 ${selectedTemplate?.id === template.id ? 'bg-primary text-primary-content' : ''}`}
                onClick={() => handleTemplateClick(template)}

              >
                {template.name || "Unnamed Template"}
              </div>)
            ))}
        </div>
      </div>

      {/* Predefined Resume Templates Section */}
      <div className="flex flex-wrap gap-4 lg:px-4 justify-center lg:justify-start py-3">
        {category === "Fresher"
          ? beginner.map((resume, index) => (
            <div
              key={index}
              className="h-96 w-80 rounded-lg border border-black overflow-hidden cursor-pointer"
              onClick={() => {!userId?navigate('/login'):navigate(resume.path)}}
            >
              <img src={resume.image} className="object-fill w-full h-full" alt="Fresher Resume Template" />
            </div>
          ))
          : experienced.map((resume, index) => (
            <div
              key={index}
              className="h-96 w-80 rounded-lg border border-black overflow-hidden cursor-pointer"
              onClick={() => {!userId?navigate('/login'):navigate(resume.path)}}
            >
              <img src={resume.image} className="object-fill w-full h-full" alt="Experienced Resume Template" />
            </div>
          ))}
      </div>
    </>
  );
}

export default Templates;
