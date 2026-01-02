import { useState } from "react";
import axios from "axios";
import PersonalDetails from "../components/form components/PersonalDetails.jsx";
import CareerObjective from "../components/form components/CareerObjective.jsx";
import EducationForm from "../components/form components/Education.jsx";
import TechnicalSkills from "../components/form components/TechnicalSkills.jsx";
import PersonalSkills from "../components/form components/PersonalSkills.jsx";
import Hobbies from "../components/form components/Hobbies.jsx";
import FresherCertification from "../components/form components/FresherCertificate.jsx";
import Languages from "../components/form components/Languages.jsx";
import JobTitle from "../components/form components/JobTitle.jsx";
import ProfilePhoto from "../components/form components/ProfilePhoto.jsx";
import TemplateName from "../components/form components/TemplateName.jsx";
import { useUser } from "../context/UserContext.jsx";

const AddBeginner = () => {
  const { userId } = useUser();
  const [step, setStep] = useState(1); // Step tracking
  const [message, setMessage] = useState(null); // Message state

  // Manage state for each step
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    contact: { email: "", phone: "", address: "" },
  });

  const [careerObjective, setCareerObjective] = useState("");
  const [education, setEducation] = useState([]);
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [personalSkills, setPersonalSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [image, setImage] = useState("");
  const [templateName, setTemplateName] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Function to submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      userId,
      templateName,
      name: personalDetails.name,
      jobTitle,
      contact: personalDetails.contact,
      technicalSkills,
      hobbies,
      careerObjective,
      education,
      personalSkills,
      certifications,
      languages,
      image,
    };
    console.log(finalData)
    try {
      console.log("Submitting Data:", finalData);
      const response = await axios.post(
        "http://localhost:8080/api/beginner-resume/add",
        finalData,
      );

      setMessage({ text: "Resume template saved successfully!", type: "success" });

      // Optionally, reset the form
      setPersonalDetails({ name: "", contact: { email: "", phone: "", address: "" } });
      setCareerObjective("");
      setEducation([]);
      setTechnicalSkills([]);
      setPersonalSkills([]);
      setHobbies([]);
      setCertifications([]);
      setLanguages([]);
      setJobTitle("");
      setImage("");
      setTemplateName("");
      setStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage({ text: "Failed to save resume. Please try again!", type: "error" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {/* Display success or error message */}
      {message && (
        <p className={`p-2 text-center rounded ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {message.text}
        </p>
      )}

      {step === 1 && <PersonalDetails nextStep={nextStep} personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} />}
      {step === 2 && <CareerObjective nextStep={nextStep} prevStep={prevStep} careerObjective={careerObjective} setCareerObjective={setCareerObjective} />}
      {step === 3 && <EducationForm nextStep={nextStep} prevStep={prevStep} education={education} setEducation={setEducation} />}
      {step === 4 && <TechnicalSkills nextStep={nextStep} prevStep={prevStep} technicalSkills={technicalSkills} setTechnicalSkills={setTechnicalSkills} />}
      {step === 5 && <PersonalSkills nextStep={nextStep} prevStep={prevStep} personalSkills={personalSkills} setPersonalSkills={setPersonalSkills} />}
      {step === 6 && <Hobbies nextStep={nextStep} prevStep={prevStep} hobbies={hobbies} setHobbies={setHobbies} />}
      {step === 7 && <FresherCertification nextStep={nextStep} prevStep={prevStep} certifications={certifications} setCertifications={setCertifications} />}
      {step === 8 && <Languages nextStep={nextStep} prevStep={prevStep} languages={languages} setLanguages={setLanguages} />}
      {step === 9 && <JobTitle nextStep={nextStep} prevStep={prevStep} jobTitle={jobTitle} setJobTitle={setJobTitle} />}
      {step === 10 && <ProfilePhoto nextStep={nextStep} prevStep={prevStep} image={image} setImage={setImage} />}
      {step === 11 && <TemplateName nextStep={nextStep} prevStep={prevStep} templateName={templateName} setTemplateName={setTemplateName} />}

      {/* Submit Button on the last step */}
      {step === 12 && (
        <div className="p-5 border rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Final Step: Review & Submit</h2>
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-600 text-white rounded w-full"
          >
            Submit Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBeginner;
