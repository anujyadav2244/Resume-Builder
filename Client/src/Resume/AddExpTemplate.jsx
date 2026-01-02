import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const APIKEY = process.env.APIKEY
function AddExpTemplate() {
  const { userId } = useUser();
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('');
  const [resumeData, setResumeData] = useState({
    userId,
    templateName: '',
    name: '',
    jobTitle: '',
    contact: {
      phone: '',
      email: '',
      address: '',
      linkedin: ''
    },
    workExperience: [],
    technicalSkills: [],
    softSkills: [],
    hobbies: [],
    achievements: [],
    professionalSummary: '',
    education: [],
    certifications: [],
    languages: [],
    image: ''
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview Image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ResumeBuilder"); // Replace with your Cloudinary upload preset

      setUploading(true);
      try {
        console.log('Inside Cloudinary')
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${APIKEY}/image/upload`, // Replace with your Cloudinary cloud name
          formData
        );
        setResumeData({ ...resumeData, image: response.data.secure_url });
        setUploading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setUploading(false);
      }
    }
  };

  const [newWorkExperience, setNewWorkExperience] = useState({
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    responsibilities: []
  });
  const [newResponsibility, setNewResponsibility] = useState('');

  const handleAddResponsibility = () => {
    if (newResponsibility.trim() !== '') {
      setNewWorkExperience((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility]
      }));
      setNewResponsibility(''); // Clear input
    }
  };

  const handleAddWorkExperience = () => {
    if (newWorkExperience.position && newWorkExperience.company) {
      setResumeData((prev) => ({
        ...prev,
        workExperience: [...prev.workExperience, newWorkExperience]
      }));
      setNewWorkExperience({
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        responsibilities: []
      });
    }
  };

  const [imagePreview, setImagePreview] = useState(null); // Image preview state
  const [uploading, setUploading] = useState(false);
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    startYear: '',
    endYear: ''
  });
  const [newCertificate, setNewCertificate] = useState({
    title: '',
    institution: '',
    year: ''
  });
  const [newLanguage, setNewLanguage] = useState({
    language: '',
    familiarity: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      [name]: value,
    });
  };

  const handleNestedChange = (e, key) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      [key]: {
        ...resumeData[key],
        [name]: value,
      },
    });
  };

  const handleAddTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      setResumeData({
        ...resumeData,
        technicalSkills: [...resumeData.technicalSkills, newTechnicalSkill]
      });
      setNewTechnicalSkill('');
    }
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setResumeData({
        ...resumeData,
        softSkills: [...resumeData.softSkills, newSoftSkill]
      });
      setNewSoftSkill('');
    }
  };

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      setResumeData({
        ...resumeData,
        hobbies: [...resumeData.hobbies, newHobby] // Add hobby to the array
      });
      setNewHobby(''); // Clear the input field
    }
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setResumeData({
        ...resumeData,
        achievements: [...resumeData.achievements, newAchievement] // Add achievement to the array
      });
      setNewAchievement(''); // Clear the input field
    }
  };

  const handleAddEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, newEducation] // Add education to the array
      });
      setNewEducation({ degree: '', institution: '', startYear: '', endYear: '' }); // Clear the input fields
    }
  };

  const handleAddCertification = () => {
    if (newCertificate.title.trim() && newCertificate.institution.trim()) {
      setResumeData({
        ...resumeData,
        certifications: [...resumeData.certifications, newCertificate] // Add certification to the array
      });
      setNewCertificate({ title: '', institution: '', year: '' }); // Clear the input fields
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.language.trim() && newLanguage.familiarity.trim()) {
      setResumeData({
        ...resumeData,
        languages: [...resumeData.languages, { language: newLanguage.language, familiarity: parseInt(newLanguage.familiarity, 10) || 0 }] // Add language to the array
      });
      setNewLanguage({ language: '', familiarity: '' }); // Clear the input fields
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/experienced-resume/add", // Replace with your actual endpoint
        resumeData
      );
      alert("Resume added successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error adding resume:", error);
      alert("Failed to add resume");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Experience Template</h2>
      <form className="space-y-6" onSubmit={handleSave} onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}>
        {/* Basic Information Inputs */}


        <input type="text" name="name" value={resumeData.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded-lg" />
        <input type="text" name="jobTitle" value={resumeData.jobTitle} onChange={handleChange} placeholder="Job Title" className="w-full border p-2 rounded-lg" />
        <input type="text" name="phone" value={resumeData.contact.phone} onChange={(e) => handleNestedChange(e, "contact")} placeholder="Phone" className="w-full border p-2 rounded-lg" />
        <input type="email" name="email" value={resumeData.contact.email} onChange={(e) => handleNestedChange(e, "contact")} placeholder="Email" className="w-full border p-2 rounded-lg" />
        <textarea name="address" value={resumeData.contact.address} onChange={(e) => handleNestedChange(e, "contact")} placeholder="Address" className="w-full border p-2 rounded-lg"></textarea>
        <textarea name="professionalSummary" value={resumeData.professionalSummary} onChange={handleChange} placeholder="Professional Summary" className="w-full border p-2 rounded-lg"></textarea>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image:</label>
          <input type="file" onChange={handleImageChange} className="w-full border p-2 rounded-lg" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-full" />}
        </div>
        {/* Skills */}
        <div>
          <h3>Technical Skills</h3>
          <input
            type="text"
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            placeholder="Enter a technical skill"
            className='w-full border p-2 rounded-lg'
          />
          <button type="button" onClick={handleAddTechnicalSkill} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Add Technical Skill</button>
          <ul>
            {resumeData.technicalSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Soft Skills</h3>
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="Enter a soft skill"
            className='w-full border p-2 rounded-lg'
          />
          <button type="button" onClick={handleAddSoftSkill} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Add Soft Skill</button>
          <ul>
            {resumeData.softSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Add Work Experience</h3>

          <input
            type="text"
            placeholder="Job Title"
            value={newWorkExperience.position}
            className='w-full border p-2 rounded-lg'
            onChange={(e) =>
              setNewWorkExperience({ ...newWorkExperience, position: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Company"
            value={newWorkExperience.company}
            className='w-full border p-2 rounded-lg'
            onChange={(e) =>
              setNewWorkExperience({ ...newWorkExperience, company: e.target.value })
            }
          />

          <input
            type="date"
            placeholder="Start Date"
            value={newWorkExperience.startDate}
            className='w-full border p-2 rounded-lg'
            onChange={(e) =>
              setNewWorkExperience({ ...newWorkExperience, startDate: e.target.value })
            }
          />

          <input
            type="date"
            placeholder="End Date"
            value={newWorkExperience.endDate}
            className='w-full border p-2 rounded-lg'
            onChange={(e) =>
              setNewWorkExperience({ ...newWorkExperience, endDate: e.target.value })
            }
          />

          {/* Responsibility Input & Add Button */}
          <div>
            <input
              type="text"
              placeholder="Enter Responsibility"
              value={newResponsibility}
              className='w-full border p-2 rounded-lg'
              onChange={(e) => setNewResponsibility(e.target.value)}
            />
            <button type="button" onClick={handleAddResponsibility} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
              Add Responsibility
            </button>
          </div>

          {/* Display Added Responsibilities */}
          <ul>
            {newWorkExperience.responsibilities.map((res, index) => (
              <li key={index}>{res}</li>
            ))}
          </ul>

          <button type="button" onClick={handleAddWorkExperience} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
            Add Work Experience
          </button>
        </div>
        <div>
          <h2>Work Experience</h2>
          {resumeData.workExperience.length > 0 ? (
            resumeData.workExperience.map((exp, index) => (
              <div key={index} className="work-exp-card">
                <h3>{exp.title} at {exp.company}</h3>
                <p><strong>Start Date:</strong> {exp.startDate}</p>
                <p><strong>End Date:</strong> {exp.endDate}</p>
                <h4>Responsibilities:</h4>
                <ul>
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No work experience added yet.</p>
          )}
        </div>

        {/* Hobbies */}
        <div>
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="Add Hobby"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <button type="button" onClick={handleAddHobby} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add Hobby
          </button>
          <ul className="mt-2">
            {resumeData.hobbies.map((hobby, index) => (
              <li key={index} className="text-gray-700">{hobby}</li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        <div>
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            placeholder="Add Achievement"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <button type="button" onClick={handleAddAchievement} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add Achievement
          </button>
          <ul className="mt-2">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="text-gray-700">{achievement}</li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div>
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            placeholder="Degree"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <input
            type="text"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            placeholder="institution"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <input
            type="text"
            value={newEducation.startYear}
            onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
            placeholder="Start Year"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <input
            type="text"
            value={newEducation.endYear}
            onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
            placeholder="End Year"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <button type="button" onClick={handleAddEducation} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add Education
          </button>
          <ul className="mt-2">
            {resumeData.education.map((edu, index) => (
              <li key={index} className="text-gray-700">{edu.degree} from {edu.institution} ({edu.startYear} - {edu.endYear})</li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div>
          <input
            type="text"
            value={newCertificate.title}
            onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
            placeholder="Certification Title"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <input
            type="text"
            value={newCertificate.institution}
            onChange={(e) => setNewCertificate({ ...newCertificate, institution: e.target.value })}
            placeholder="Institution"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <input
            type="text"
            value={newCertificate.year}
            onChange={(e) => setNewCertificate({ ...newCertificate, year: e.target.value })}
            placeholder="Year"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <button type="button" onClick={handleAddCertification} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add Certification
          </button>
          <ul className="mt-2">
            {resumeData.certifications.map((cert, index) => (
              <li key={index} className="text-gray-700">{cert.title} from {cert.institution} ({cert.year})</li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div>
          <input
            type="text"
            value={newLanguage.language}
            onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
            placeholder="Language"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <input
            type="number"
            value={newLanguage.familiarity}
            onChange={(e) => setNewLanguage({ ...newLanguage, familiarity: e.target.value })}
            placeholder="Familiarity"
            className="w-full border p-2 rounded-lg mb-2"
          />
          <button type="button" onClick={handleAddLanguage} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Add Language
          </button>
          <ul className="mt-2">
            {resumeData.languages.map((lang, index) => (
              <li key={index} className="text-gray-700">{lang.language} ({lang.familiarity})</li>
            ))}
          </ul>
        </div>
        <input type="text" name="templateName" value={resumeData.templateName} onChange={handleChange} placeholder="Template Name" className="w-full border p-2 rounded-lg" />

        {/* Save Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Save Resume
        </button>
        {
          error && <div className='text-xl font-semibold text-error'>{error}</div>
        }
        {
          success && <div className='text-xl font-semibold text-success'>{success}</div>
        }
      </form>
    </div>
  );
}

export default AddExpTemplate;
