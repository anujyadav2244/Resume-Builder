import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";

// Create context
const FresherFormContext = createContext();

// Provider component
export const FresherFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    templateName:"",
    userId: "",
    name: "",
    contact: { email: "", phone: "", address: "" },
    jobTitle: "",
    careerObjective: "",
    education: [],
    technicalSkills: [],
    personalSkills: [],
    hobbies: [],
    certifications: [],
    languages: [],
    image: "", // Profile photo URL
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  // Function to update form data globally
  const updateFormData = (updatedValues) => {
    setFormData((prev) => ({
      ...prev,
      ...updatedValues,
    }));
  };

  return (
    <FresherFormContext.Provider
      value={{
        formData,
        setFormData: updateFormData, // Function to update data
        register,
        handleSubmit,
        getValues,
        setValue,
        errors,
      }}
    >
      {children}
    </FresherFormContext.Provider>
  );
};

// Custom hook for consuming the context
export const useFresherForm = () => useContext(FresherFormContext);
