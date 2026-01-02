import { useState, useEffect } from "react";

const FresherCertification = ({ nextStep, prevStep, certifications, setCertifications }) => {
  const [newCertificate, setNewCertificate] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState(""); // Error handling

  // Handles input change
  const handleChange = (e) => {
    setNewCertificate({ ...newCertificate, [e.target.name]: e.target.value });
  };

  // Adds certification to the list
  const addCertificate = () => {
    const { title, description } = newCertificate;

    if (!title.trim() || !description.trim()) {
      setError("❌ Both title and description are required!");
      return;
    } else if (
      certifications.find(
        (cert) => cert.title.toLowerCase() === title.toLowerCase()
      )
    ) {
      setError("❌ Certification with this title already exists!");
      return;
    } else {
      setCertifications([...certifications, newCertificate]); // Save to parent state
      setNewCertificate({ title: "", description: "" }); // Clear input fields
      setError(""); // Clear error
    }
  };

  // Remove a certification
  const removeCertificate = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  // Prevent forward navigation if no certifications are added
  const handleNext = () => {
    if (certifications.length === 0) {
      setError("❌ Please add at least one certification before proceeding!");
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
      <h2 className="text-xl font-bold mb-4">Step 7: Certifications</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Certification Title Input */}
      <label className="block mb-2">Certification Title:</label>
      <input
        type="text"
        name="title"
        value={newCertificate.title}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="e.g., AWS Certified Developer"
      />

      {/* Certification Description Input */}
      <label className="block mb-2 mt-3">Description:</label>
      <textarea
        name="description"
        value={newCertificate.description}
        onChange={handleChange}
        className="border p-2 w-full h-20 resize-none"
        placeholder="e.g., A certification for cloud development on AWS."
      />

      {/* Add Certification Button */}
      <button
        type="button"
        onClick={addCertificate}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Add Certification
      </button>

      {/* Display Added Certifications */}
      {certifications.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Added Certifications:</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {certifications.map((cert, index) => (
              <li key={index} className="p-3 border-b bg-gray-200 rounded flex justify-between items-center">
                <div>
                  <strong>{cert.title}</strong>: {cert.description}
                </div>
                <button
                  onClick={() => removeCertificate(index)}
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
          onClick={handleNext} // Prevents moving forward if no certifications added
          className="p-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FresherCertification;
