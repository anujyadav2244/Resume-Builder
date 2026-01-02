import { useState } from "react";
import { BiHelpCircle } from "react-icons/bi";

export default function HelpMenu() {
  const [step, setStep] = useState(1);

  const steps = [
    "User Templates store your data, so you don’t have to enter the same details repeatedly.",
    "You can create multiple templates with different data for different types of resumes.",
    "Simply select a saved template while making a resume to auto-fill details.",
  ];

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-circle">
        <BiHelpCircle size={32} />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content bg-base-100 rounded-box w-64 p-4 shadow-lg"
      >
        <p className="text-sm">{steps[step - 1]}</p>

        <div className="flex justify-between mt-3">
          <button
            className="btn btn-sm"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
          >
            Prev
          </button>
          <button
            className="btn btn-sm"
            disabled={step === steps.length}
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
