import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InternResumeContext } from "../context/InternResumeContext";

function InternResumeForm() {
  const { internResume, setInternResume } = useContext(InternResumeContext);
  const navigate = useNavigate();
  const [newExperience, setNewExperience] = useState({ duration: "", jobTitle: "", company: "", responsibilities: "" });
  const [newSkill, setNewSkill] = useState("");
  const [hasExperience, setHasExperience] = useState(true); // State to track experience selection

  // Handle general input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternResume({ ...internResume, [name]: value });
  };

  // Handle education changes
  const handleEducationChange = (e, category) => {
    const { name, value } = e.target;
    setInternResume({
      ...internResume,
      [category]: { ...internResume[category], [name]: value }
    });
  };

  // Add experience
  const addExperience = () => {
    if (!newExperience.duration || !newExperience.jobTitle || !newExperience.company) return;
    setInternResume({ ...internResume, experience: [...internResume.experience, newExperience] });
    setNewExperience({ duration: "", jobTitle: "", company: "", responsibilities: "" });
  };

  // Add skill
  const addSkill = () => {
    if (!newSkill) return;
    setInternResume({ ...internResume, skills: [...internResume.skills, newSkill] });
    setNewSkill("");
  };

  // Handle radio button change
  const handleExperienceChange = (e) => {
    const value = e.target.value === "yes";
    setHasExperience(value);
    if (!value) {
      setInternResume({ ...internResume, experience: [] }); // Reset experience data
    }
  };

  // Handle form submission and navigate to resume
  const handleSubmit = () => {
    navigate("/intern-resume");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Internship Resume Form</h2>

      {/* Name & Contact */}
      <input type="text" name="name" placeholder="Full Name" className="border p-2 w-full mb-2" onChange={handleChange} />
      <input type="text" name="contact" placeholder="Cell No." className="border p-2 w-full mb-2" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-2" onChange={handleChange} />
      <input type="text" name="linkedin" placeholder="LinkedIn Profile" className="border p-2 w-full mb-2" onChange={handleChange} />

      {/* Experience Section */}
      <h3 className="text-xl font-semibold mt-4">Experience</h3>
      <div className="mb-2">
        <label className="mr-4">
          <input type="radio" name="experience" value="yes" checked={hasExperience} onChange={handleExperienceChange} />
          <span className="ml-2">I have experience</span>
        </label>
        <label>
          <input type="radio" name="experience" value="no" checked={!hasExperience} onChange={handleExperienceChange} />
          <span className="ml-2">I have no experience</span>
        </label>
      </div>

      {hasExperience && (
        <>
          <input type="text" placeholder="Duration (MMYY - MMYY)" className="border p-2 w-full mb-2" value={newExperience.duration} onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })} />
          <input type="text" placeholder="Job Title" className="border p-2 w-full mb-2" value={newExperience.jobTitle} onChange={(e) => setNewExperience({ ...newExperience, jobTitle: e.target.value })} />
          <input type="text" placeholder="Company Name" className="border p-2 w-full mb-2" value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} />
          <textarea placeholder="Responsibilities" className="border p-2 w-full mb-2" value={newExperience.responsibilities} onChange={(e) => setNewExperience({ ...newExperience, responsibilities: e.target.value })}></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={addExperience}>Add Experience</button>

          {/* Display Added Experiences */}
          {internResume.experience.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Added Experience</h3>
              <ul className="list-disc pl-5">
                {internResume.experience.map((exp, index) => (
                  <li key={index} className="border p-2 rounded-lg shadow-sm mb-2">
                    <p className="font-semibold">{exp.duration}</p>
                    <p>{exp.jobTitle} - <span className="font-medium">{exp.company}</span></p>
                    <p className="text-sm text-gray-600">{exp.responsibilities}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Education Section */}
      <h3 className="text-xl font-semibold mt-4">Education</h3>
      <input type="text" name="cgpa" placeholder="CGPA (Sem 1-4)" className="border p-2 w-full mb-2" onChange={(e) => handleEducationChange(e, "university")} />

      {/* High School (XII) */}
      <h4 className="text-lg font-semibold mt-2">High School (XII)</h4>
      <input type="text" name="stream" placeholder="Stream" className="border p-2 w-full mb-2" onChange={(e) => handleEducationChange(e, "highSchool")} />
      <input type="text" name="board" placeholder="Board" className="border p-2 w-full mb-2" onChange={(e) => handleEducationChange(e, "highSchool")} />
      <input type="text" name="institute" placeholder="Institute" className="border p-2 w-full mb-2" onChange={(e) => handleEducationChange(e, "highSchool")} />
      <input type="text" name="percentage" placeholder="Percentage" className="border p-2 w-full mb-2" onChange={(e) => handleEducationChange(e, "highSchool")} />

      {/* School Level (X) */}
      <h4 className="text-lg font-semibold mt-2">School Level (X)</h4>
      <input type="text" name="stream" placeholder="Stream" className="border p-2 w-full mb-2" onChange={(e) => handleEducationChange(e, "school")} />
      <input type="text" name="board" placeholder="Board" className="border p-2 w-full mb-2" onChange={(e) => handleEducationChange(e, "school")} />
      <input type="text" name="institute" placeholder="Institute" className="border p-2 w-full mb-2" onChange={(e) => handleEducationChange(e, "school")} />
      <input type="text" name="percentage" placeholder="Percentage" className="border p-2 w-full mb-2" onChange={(e) => handleEducationChange(e, "school")} />

      {/* Skills Section */}
      <h3 className="text-xl font-semibold mt-4">Skills</h3>
      <input type="text" placeholder="Skill" className="border p-2 w-full mb-2" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={addSkill}>Add Skill</button>

      {/* Display Added Skills */}
      <div className="flex flex-wrap gap-2 mt-2">
        {internResume.skills.map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-gray-200 text-black rounded-lg text-sm">
            {skill}
          </span>
        ))}
      </div>

      {/* Submit Button */}
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg mt-6 w-full text-xl font-semibold hover:bg-purple-700" onClick={handleSubmit}>
        Submit & View Resume
      </button>
    </div>
  );
}

export default InternResumeForm;
