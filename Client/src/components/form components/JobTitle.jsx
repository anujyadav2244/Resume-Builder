import { useEffect, useState } from "react";

const JobTitle = ({ nextStep, prevStep, jobTitle, setJobTitle }) => {
  const [error, setError] = useState(""); // Error handling

  // Handles input change
  const handleChange = (e) => {
    setJobTitle(e.target.value);
  };

  // Validate and proceed to next step
  const handleNext = () => {
    if (!jobTitle.trim()) {
      setError("❌ Job title cannot be empty!");
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
      <h2 className="text-xl font-bold mb-4">Step 9: Job Title</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Job Title Input */}
      <label className="block mb-2">Enter Your Job Title:</label>
      <input
        type="text"
        value={jobTitle}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="e.g., Software Engineer, Data Analyst"
      />

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
          onClick={handleNext} // Prevents moving forward if job title is empty
          className="p-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobTitle;
