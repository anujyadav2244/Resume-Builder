import { useState, useEffect } from "react";

const TemplateName = ({ nextStep, prevStep, templateName, setTemplateName }) => {
  const [error, setError] = useState(""); // Error handling

  // Handles input change
  const handleChange = (e) => {
    setTemplateName(e.target.value);
  };

  // Validate and proceed to next step
  const handleNext = () => {
    if (!templateName.trim()) {
      setError("❌ Template name cannot be empty!");
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
      <h2 className="text-xl font-bold mb-4">Step 10: Select Template Name</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Template Name Input */}
      <label className="block mb-2">Enter Template Name:</label>
      <input
        type="text"
        value={templateName}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="e.g., Modern Template, Professional Resume"
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
          onClick={handleNext} // Prevents moving forward if template name is empty
          className="p-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TemplateName;
