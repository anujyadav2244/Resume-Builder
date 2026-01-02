import { useState } from "react";

const CareerObjective = ({ nextStep, prevStep, careerObjective, setCareerObjective }) => {
  const [error, setError] = useState(""); // Store validation error

  const handleChange = (e) => {
    setCareerObjective(e.target.value);
  };

  const validateForm = () => {
    let newError = "";

    // Career Objective Validation
    if (!careerObjective.trim()) {
      newError = "❌ Career Objective cannot be empty!";
    } else if (careerObjective.length < 20) {
      newError = "❌ Career Objective must be at least 20 characters!";
    }

    setError(newError);

    // Clear error after 4 seconds
    if (newError) {
      setTimeout(() => {
        setError("");
      }, 4000);
      return false;
    }

    return true;
  };

  const onNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Career Objective Saved:", careerObjective);
      nextStep();
    }
  };

  return (
    <form onSubmit={onNext} className="p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Step 2: Career Objective</h2>

      {/* Career Objective Input */}
      <label className="block mb-2">Career Objective:</label>
      <textarea
        value={careerObjective}
        onChange={handleChange}
        className="border p-2 w-full h-28 resize-none"
        placeholder="Write your career objective..."
      />
      {error && <p className="text-red-500">{error}</p>}

      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-between">
        <button type="button" onClick={prevStep} className="p-2 bg-gray-500 text-white rounded">
          Back
        </button>
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Next
        </button>
      </div>
    </form>
  );
};

export default CareerObjective;
