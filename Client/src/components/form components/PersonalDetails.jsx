import { useState } from "react";

const PersonalDetails = ({ nextStep, personalDetails, setPersonalDetails }) => {
  const [errors, setErrors] = useState({}); // Store validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested object (contact)
    if (name.includes("contact.")) {
      const field = name.split(".")[1]; // Extract 'email', 'phone', or 'address'
      setPersonalDetails({
        ...personalDetails,
        contact: { ...personalDetails.contact, [field]: value },
      });
    } else {
      setPersonalDetails({ ...personalDetails, [name]: value });
    }
  };

  const validateForm = () => {
    let newErrors = {}; // Store errors

    // Name Validation
    if (!personalDetails.name?.trim()) {
      newErrors.name = "❌ Please enter your full name!";
    }

    // Email Validation
    if (!personalDetails.contact.email?.trim()) {
      newErrors.email = "❌ Email cannot be empty!";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(personalDetails.contact.email)) {
      newErrors.email = "❌ Enter a valid email format!";
    }

    // Phone Validation
    if (!personalDetails.contact.phone?.trim()) {
      newErrors.phone = "❌ Phone number is required!";
    } else if (personalDetails.contact.phone.length < 10) {
      newErrors.phone = "❌ Phone number must be at least 10 digits!";
    }

    // Address Validation
    if (!personalDetails.contact.address?.trim()) {
      newErrors.address = "❌ Address field cannot be empty!";
    }

    setErrors(newErrors); // Update error state

    // Clear errors after 4 seconds
    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        setErrors({});
      }, 4000);
    }

    return Object.keys(newErrors).length === 0; // Return `true` if no errors
  };

  const onNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Step 1 Data Saved:", personalDetails);
      nextStep();
    }
  };

  return (
    <form onSubmit={onNext} className="p-5 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Step 1: Contact Information</h2>

      {/* Name Input */}
      <label className="block mb-2">Full Name:</label>
      <input
        type="text"
        name="name"
        value={personalDetails.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}

      {/* Email Input */}
      <label className="block mb-2 mt-3">Email Address:</label>
      <input
        type="email"
        name="contact.email"
        value={personalDetails.contact.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      {/* Phone Input */}
      <label className="block mb-2 mt-3">Phone Number:</label>
      <input
        type="text"
        name="contact.phone"
        value={personalDetails.contact.phone}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      {errors.phone && <p className="text-red-500">{errors.phone}</p>}

      {/* Address Input */}
      <label className="block mb-2 mt-3">Residential Address:</label>
      <input
        type="text"
        name="contact.address"
        value={personalDetails.contact.address}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      {errors.address && <p className="text-red-500">{errors.address}</p>}

      {/* Next Button */}
      <button type="submit" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
    </form>
  );
};

export default PersonalDetails;
