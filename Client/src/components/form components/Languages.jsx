import { useState, useEffect } from "react";

const Languages = ({ nextStep, prevStep, languages, setLanguages }) => {
  const [newLanguage, setNewLanguage] = useState({
    language: "",
    familiarity: "",
  });

  const [error, setError] = useState(""); // Error handling

  // Handles input change
  const handleChange = (e) => {
    setNewLanguage({ ...newLanguage, [e.target.name]: e.target.value });
  };

  // Adds language to the list
  const addLanguage = () => {
    const { language, familiarity } = newLanguage;
    const familiarityNum = Number(familiarity);

    if (!language.trim() || !familiarity.trim()) {
      setError("❌ Both language and familiarity are required!");
      return;
    } else if (
      languages.find(
        (lang) => lang.language.toLowerCase() === language.toLowerCase()
      )
    ) {
      setError("❌ Language already exists!");
      return;
    } else if (isNaN(familiarityNum) || familiarityNum < 0 || familiarityNum > 100) {
      setError("❌ Familiarity must be a number between 0 and 100!");
      return;
    } else {
      setLanguages([...languages, { language, familiarity: familiarityNum }]); // Save to parent state
      setNewLanguage({ language: "", familiarity: "" }); // Clear input fields
      setError(""); // Clear error
    }
  };

  // Remove a language
  const removeLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  // Prevent forward navigation if no languages are added
  const handleNext = () => {
    if (languages.length === 0) {
      setError("❌ Please add at least one language before proceeding!");
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
      <h2 className="text-xl font-bold mb-4">Step 8: Languages</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Language Input Field */}
      <label className="block mb-2">Language:</label>
      <input
        type="text"
        name="language"
        value={newLanguage.language}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="e.g., English, Spanish, Hindi"
      />

      {/* Familiarity Input Field */}
      <label className="block mb-2 mt-3">Familiarity (out of 100):</label>
      <input
        type="number"
        name="familiarity"
        value={newLanguage.familiarity}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="e.g., 80 (0-100)"
      />

      {/* Add Language Button */}
      <button
        type="button"
        onClick={addLanguage}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Add Language
      </button>

      {/* Display Added Languages */}
      {languages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Added Languages:</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {languages.map((lang, index) => (
              <li key={index} className="p-3 border-b bg-gray-200 rounded flex justify-between items-center">
                <div>
                  <strong>{lang.language}</strong>: {lang.familiarity}/100
                </div>
                <button
                  onClick={() => removeLanguage(index)}
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
          onClick={handleNext} // Prevents moving forward if no languages added
          className="p-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Languages;
