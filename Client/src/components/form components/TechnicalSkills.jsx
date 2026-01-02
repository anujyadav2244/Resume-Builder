import { useState, useEffect } from "react";

const TechnicalSkills = ({ nextStep, prevStep, technicalSkills, setTechnicalSkills }) => {
  const [skill, setSkill] = useState(""); // Input field for new skill
  const [error, setError] = useState(""); // Error handling

  // Handles input change
  const handleChange = (e) => {
    setSkill(e.target.value);
  };

  // Adds skill to the list
  const addSkill = () => {
    if (!skill.trim()) {
      setError("❌ Skill cannot be empty!");
      return;
    } else if (technicalSkills.find((s) => s.toLowerCase() === skill.toLowerCase())) {
      setError("❌ Skill already exists!");
      return;
    } else {
      setTechnicalSkills([...technicalSkills, skill.trim()]); // Save to parent state
      setSkill(""); // Clear input
      setError(""); // Clear error
    }
  };

  // Remove a skill
  const removeSkill = (index) => {
    const updatedSkills = technicalSkills.filter((_, i) => i !== index);
    setTechnicalSkills(updatedSkills);
  };

  // Prevent forward navigation if no skills are added
  const handleNext = () => {
    if (technicalSkills.length === 0) {
      setError("❌ Please add at least one skill before proceeding!");
      return;
    }
    nextStep();
  };

  // Clear error messages after 4000ms
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [error]);

  return (
    <div className="p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Step 4: Technical Skills</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Skill Input Field */}
      <label className="block mb-2">Enter a Skill:</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={skill}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="e.g., JavaScript, Python, React"
        />
        <button
          type="button"
          onClick={addSkill}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Display Added Skills */}
      {technicalSkills.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Added Skills:</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {technicalSkills.map((s, index) => (
              <li key={index} className="flex items-center gap-2 p-2 bg-gray-200 rounded">
                {s}
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-500 font-bold"
                >
                  ✖
                </button>
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
          onClick={handleNext} // Now prevents navigation if no skills
          className="p-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TechnicalSkills;
