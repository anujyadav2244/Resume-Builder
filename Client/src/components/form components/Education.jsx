import { useState } from "react";

const EducationForm = ({ nextStep, prevStep, education, setEducation }) => {
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
  });

  const [error, setError] = useState(""); // Error handling

  // Generate years dynamically from 1980 to current year + 5
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1980 + 6 }, (_, i) => 1980 + i);

  // Handles input changes
  const handleChange = (e) => {
    setNewEducation({ ...newEducation, [e.target.name]: e.target.value });
  };

  // Adds education entry with validation
  const addEducation = () => {
    const { degree, institution, startYear, endYear } = newEducation;

    if (!degree || !institution || !startYear || !endYear) {
      setError("❌ All fields are required!");
    } else if (parseInt(startYear) >= parseInt(endYear)) {
      setError("❌ Start Year must be smaller than End Year!");
    } else {
      setEducation([...education, newEducation]); // Save to parent state
      setNewEducation({ degree: "", institution: "", startYear: "", endYear: "" }); // Reset input fields
      setError(""); // Clear error
    }

    // Clear error message after 3 seconds
    setTimeout(() => setError(""), 3000);
  };

  return (
    <div className="p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Step 3: Education Details</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Degree Input */}
      <label className="block mb-2">Degree:</label>
      <input
        type="text"
        name="degree"
        value={newEducation.degree}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Institution Input */}
      <label className="block mb-2 mt-3">Institution:</label>
      <input
        type="text"
        name="institution"
        value={newEducation.institution}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      {/* Start Year Dropdown */}
      <label className="block mb-2 mt-3">Start Year:</label>
      <select
        name="startYear"
        value={newEducation.startYear}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select Start Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* End Year Dropdown */}
      <label className="block mb-2 mt-3">End Year:</label>
      <select
        name="endYear"
        value={newEducation.endYear}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select End Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Add Education Button */}
      <button
        type="button"
        onClick={addEducation}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Add Education
      </button>

      {/* Display Added Educations */}
      {education?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Added Education:</h3>
          <ul className="mt-2">
            {education.map((edu, index) => (
              <li key={index} className="p-3 border-b">
                🎓 <strong>{edu.degree}</strong> at {edu.institution} ({edu.startYear} - {edu.endYear})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="p-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
