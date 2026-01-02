  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useUser } from '../context/UserContext';

  const APIKEY = process.env.APIKEY
  function ResumeForm() {
    const {userId} = useUser()
    const [resumeData, setResumeData] = useState({
      userId,
      templateName: '',
      name: '',
      jobTitle: '',
      contact: {
        phone: '',
        email: '',
        address: ''
      },
      technicalSkills: [],
      hobbies: [],
      careerObjective: '',
      education: [],
      personalSkills: [],
      certifications: [],
      languages: [],
      image: '',  
    });

    const [newHobby, setNewHobby] = useState('');
    const [newSkill, setNewSkill] = useState('');
    const [newEducation, setNewEducation] = useState({
      degree: '',
      institution: '',
      startYear: '',
      endYear: ''
    });
    const [newPersonalSkill, setNewPersonalSkill] = useState('');
    const [newCertificate, setNewCertificate] = useState({
      title: '',
      description: ''
    });
    const [newLanguage, setNewLanguage] = useState({
      language: '',
      familiarity: ''
    });

    const [imagePreview, setImagePreview] = useState(null); // Image preview state
    const [uploading, setUploading] = useState(false); 
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.includes('.')) {
        const keys = name.split('.');
        setResumeData((prevData) => ({
          ...prevData,
          [keys[0]]: {
            ...prevData[keys[0]],
            [keys[1]]: keys[1] === "phone" ? parseInt(value, 10) || "" : value, // Convert phone to integer
          },
        }));
      } else {
        setResumeData({
          ...resumeData,
          [name]: value,
        });
      }
    };
    

    const handleAddHobby = () => {
      if (newHobby.trim()) {
        setResumeData({
          ...resumeData,
          hobbies: [...resumeData.hobbies, newHobby]
        });
        setNewHobby('');
      }
    };

    const handleAddSkill = () => {
      if (newSkill.trim()) {
        setResumeData({
          ...resumeData,
          technicalSkills: [...resumeData.technicalSkills, newSkill]
        });
        setNewSkill('');
      }
    };

    const handleAddEducation = () => {
      if (newEducation.degree.trim() && newEducation.institution.trim() && newEducation.startYear && newEducation.endYear) {
        setResumeData({
          ...resumeData,
          education: [...resumeData.education, {
            ...newEducation,
            startYear: parseInt(newEducation.startYear, 10),
            endYear: parseInt(newEducation.endYear, 10)
          }]
        });
        setNewEducation({
          degree: '',
          institution: '',
          startYear: '',
          endYear: ''
        });
      }
    };
    

    const handleAddPersonalSkill = () => {
      if (newPersonalSkill.trim()) {
        setResumeData({
          ...resumeData,
          personalSkills: [...resumeData.personalSkills, newPersonalSkill]
        });
        setNewPersonalSkill('');
      }
    };

    const handleAddCertificate = () => {
      if (newCertificate.title.trim() && newCertificate.description.trim()) {
        setResumeData({
          ...resumeData,
          certifications: [...resumeData.certifications, newCertificate]
        });
        setNewCertificate({
          title: '',
          description: ''
        });
      }
    };

    const handleAddLanguage = () => {
      if (newLanguage.language.trim() && newLanguage.familiarity.trim()) {
        setResumeData({
          ...resumeData,
          languages: [...resumeData.languages, newLanguage]
        });
        setNewLanguage({
          language: '',
          familiarity: ''
        });
      }
    };

    const handleEducationChange = (e) => {
      const { name, value } = e.target;
      setNewEducation({
        ...newEducation,
        [name]: name === "startYear" || name === "endYear" ? parseInt(value, 10) || "" : value
      });
    };
    

    const handleCertificateChange = (e) => {
      const { name, value } = e.target;
      setNewCertificate({
        ...newCertificate,
        [name]: value
      });
    };

    const handleLanguageChange = (e) => {
      const { name, value } = e.target;
      setNewLanguage({
        ...newLanguage,
        [name]: value
      });
    };

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
            `https://api.cloudinary.com/v1_1/${APIKEY}/upload`, // Replace with your Cloudinary cloud name
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

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        console.log(resumeData);
        const response = await axios.post(
          "http://localhost:8080/api/beginner-resume/add",
          resumeData,
          { headers: { "Content-Type": "application/json" } }
        );

        setMessage({ text: "Resume template saved successfully!", type: "success" });

        // Optionally, reset the form
        setResumeData({
          templateName: '',
          name: '',
          jobTitle: '',
          contact: { phone: '', email: '', address: '' },
          technicalSkills: [],
          hobbies: [],
          careerObjective: '',
          education: [],
          personalSkills: [],
          certifications: [],
          languages: [],
          image: '',
        });

      } catch (error) {
        console.error("Error submitting form:", error);
        setMessage({ text: "Failed to save resume. Please try again!", type: "error" });
      }
    };

    return (
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Template</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Template Input Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
            <input type="text" name="name" value={resumeData.name} onChange={handleChange} className="w-full border p-2 rounded-lg" placeholder='John Doe' />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title:</label>
            <input type="text" name="jobTitle" value={resumeData.jobTitle} onChange={handleChange} className="w-full border p-2 rounded-lg" placeholder='Web Developer' />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone:</label>
            <input type="number" name="contact.phone" value={resumeData.contact.phone} onChange={(e) => handleChange({ ...e, name: 'contact.phone' })} className="w-full border p-2 rounded-lg" placeholder='9090909090' />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
            <input type="email" name="contact.email" value={resumeData.contact.email} onChange={(e) => handleChange({ ...e, name: 'contact.email' })} className="w-full border p-2 rounded-lg" placeholder='johndoe@gmail.com' />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address:</label>
            <textarea name="contact.address" value={resumeData.contact.address} onChange={(e) => handleChange({ ...e, name: 'contact.address' })} className="w-full border p-2 rounded-lg"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Career Objective:</label>
            <textarea name="careerObjective" value={resumeData.careerObjective} onChange={handleChange} className="w-full border p-2 rounded-lg"></textarea>
          </div>
          
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image:</label>
            <input type="file" onChange={handleImageChange} className="w-full border p-2 rounded-lg" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-full" />}
          </div>

          {/* Other Fields (Skills, Hobbies, Education, etc.) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills:</label>
            <div className="flex gap-2">
              <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="w-full border p-2 rounded-lg" placeholder='Eg.React.js' />
              <button type="button" onClick={handleAddSkill} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {resumeData.technicalSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies:</label>
            <div className="flex gap-2">
              <input type="text" value={newHobby} onChange={(e) => setNewHobby(e.target.value)} className="w-full border p-2 rounded-lg" placeholder='Eg.Chess' />
              <button type="button" onClick={handleAddHobby} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {resumeData.hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Education:</label>
            <div>
              <input type="text" name="degree" value={newEducation.degree} onChange={handleEducationChange} className="w-full border p-2 rounded-lg" placeholder="Eg. B.Sc.IT" />
              <input type="text" name="institution" value={newEducation.institution} onChange={handleEducationChange} className="w-full border p-2 rounded-lg" placeholder="Eg. Xavier's College" />
              <input type="text" name="startYear" value={newEducation.startYear} onChange={handleEducationChange} className="w-full border p-2 rounded-lg" placeholder="Eg.2023"/>
              <input type="text" name="endYear" value={newEducation.endYear} onChange={handleEducationChange} className="w-full border p-2 rounded-lg" placeholder="Eg. 2026" />
              <button type="button" onClick={handleAddEducation} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Education</button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {resumeData.education.map((education, index) => (
                <li key={index}>{education.degree}, {education.institution} ({education.startYear} - {education.endYear})</li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Personal Skills:</label>
            <div className="flex gap-2">
              <input type="text" value={newPersonalSkill} onChange={(e) => setNewPersonalSkill(e.target.value)} className="w-full border p-2 rounded-lg" placeholder='Eg. Teamwork'/>
              <button type="button" onClick={handleAddPersonalSkill} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {resumeData.personalSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certifications:</label>
            <div className="flex gap-2">
              <input type="text" name="title" value={newCertificate.title} onChange={handleCertificateChange} className="w-full border p-2 rounded-lg" placeholder="Certification Title" />
              <input type="text" name="description" value={newCertificate.description} onChange={handleCertificateChange} className="w-full border p-2 rounded-lg" placeholder="Certification Description" />
              <button type="button" onClick={handleAddCertificate} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {resumeData.certifications.map((cert, index) => (
                <li key={index}>{cert.title}: {cert.description}</li>
              ))}
            </ul>
          </div>
          {/* Languages Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Languages:</label>
            <div className="flex gap-2">
              <input type="text" name="language" value={newLanguage.language} onChange={handleLanguageChange} className="w-full border p-2 rounded-lg" placeholder="Language" />
              <input type="number" name="familiarity" value={newLanguage.familiarity} onChange={handleLanguageChange} className="w-full border p-2 rounded-lg" placeholder="Familiarity % (out of 100)" />
              <button type="button" onClick={handleAddLanguage} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
            </div>
            <ul className="list-disc pl-5 mt-2">
              {resumeData.languages.map((lang, index) => (
                <li key={index}>{lang.language}: {lang.familiarity}%</li>
              ))}
            </ul>
          </div>

          {/* Template Saving */}
          <div className='py-4'>
            <label className="block text-sm font-medium text-gray-700 mb-2">Save Template as: </label>
            <input type="text" name="templateName" value={resumeData.templateName} onChange={handleChange} className="w-full border p-2 rounded-lg" placeholder="Eg. John Doe's Template"/>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Save Template</button>
        </form>
        {message.text && (
          <div className={`p-3 mb-4 rounded-lg text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message.text}
          </div>
        )}

      </div>
    );
  }

  export default ResumeForm;
