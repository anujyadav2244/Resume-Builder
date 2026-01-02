import { useState, useEffect } from "react";
import axios from "axios";

const APIKEY = process.env.APIKEY
const ProfilePhoto = ({ nextStep, prevStep, image, setImage }) => {
  const [previewUrl, setPreviewUrl] = useState(image || null); // Stores preview URL
  const [selectedFile, setSelectedFile] = useState(null); // Stores selected file before upload
  const [error, setError] = useState(""); // Error handling
  const [loading, setLoading] = useState(""); // Stores upload progress

  // Handles file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("❌ Please select an image.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("❌ Only image files are allowed!");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
    setError(""); // Clear any previous error
  };

  // Uploads the image to Cloudinary using Axios
  const uploadImage = async () => {
    if (!selectedFile) {
      setError("❌ Please select an image before uploading!");
      return;
    }

    setLoading("Uploading... 0%");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "ResumeBuilder"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${APIKEY}/image/upload`, // Replace with your Cloudinary cloud name
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setLoading(`Uploading... ${progress}%`); // Display upload progress
          },
        }
      );

      if (response.data.secure_url) {
        setImage(response.data.secure_url); // Store Cloudinary URL in state
        setPreviewUrl(response.data.secure_url); // Update preview
        setError(""); // Clear any previous error
        console.log(response.data.secure_url)
      } else {
        setError("❌ Image upload failed. Please try again.");
      }
    } catch (error) {
      setError("❌ Error uploading image. Please check your connection.");
    } finally {
      setLoading("");
    }
  };

  // Prevent forward navigation if no Cloudinary URL is stored
  const handleNext = () => {
    if (!image) {
      setError("❌ Please upload an image before proceeding!");
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
      <h2 className="text-xl font-bold mb-4">Step 10: Upload Profile Photo</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border p-2 w-full"
      />

      {/* Preview Image */}
      {previewUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Preview:</h3>
          <img src={previewUrl} alt="Profile Preview" className="w-32 h-32 rounded-full mt-2 border" />
        </div>
      )}

      {/* Upload Button */}
      <button
        type="button"
        onClick={uploadImage}
        className="mt-4 p-2 bg-green-500 text-white rounded"
        disabled={loading}
      >
        {loading || "Upload to Cloudinary"}
      </button>

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
          onClick={handleNext} // Prevents moving forward if no image is uploaded
          className="p-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfilePhoto;
