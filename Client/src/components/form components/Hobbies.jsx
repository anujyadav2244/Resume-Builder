import { useState, useEffect } from "react";

const Hobbies = ({ nextStep, prevStep, hobbies, setHobbies }) => {
  const [hobby, setHobby] = useState(""); // Input field for new hobby
  const [error, setError] = useState(""); // Error handling

  // Handles input change
  const handleChange = (e) => {
    setHobby(e.target.value);
  };

  // Adds hobby to the list
  const addHobby = () => {
    if (!hobby.trim()) {
      setError("❌ Hobby cannot be empty!");
      return;
    } else if (hobbies.find((h) => h.toLowerCase() === hobby.toLowerCase())) {
      setError("❌ Hobby already exists!");
      return;
    } else {
      setHobbies([...hobbies, hobby.trim()]); // Save to parent state
      setHobby(""); // Clear input
      setError(""); // Clear error
    }
  };

  // Remove a hobby
  const removeHobby = (index) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
  };

  // Prevent forward navigation if no hobbies are added
  const handleNext = () => {
    if (hobbies.length === 0) {
      setError("❌ Please add at least one hobby before proceeding!");
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
      <h2 className="text-xl font-bold mb-4">Step 6: Hobbies</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Hobby Input Field */}
      <label className="block mb-2">Enter a Hobby:</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={hobby}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="e.g., Reading, Painting, Traveling"
        />
        <button
          type="button"
          onClick={addHobby}
          className="bg-green-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Display Added Hobbies */}
      {hobbies.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Added Hobbies:</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {hobbies.map((h, index) => (
              <li key={index} className="flex items-center gap-2 p-2 bg-gray-200 rounded">
                {h}
                <button
                  onClick={() => removeHobby(index)}
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
          onClick={handleNext} // Prevents moving forward if no hobbies added
          className="p-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Hobbies;
