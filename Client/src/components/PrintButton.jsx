import React from "react";

const PrintButton = ({ text = "Print Resume" }) => {
  const handlePrint = () => {
    const noPrintElements = document.querySelectorAll(".no-print");
    noPrintElements.forEach((el) => (el.style.display = "none"));

    window.print();

    setTimeout(() => {
      noPrintElements.forEach((el) => (el.style.display = ""));
    }, 500);
  };

  return (
    <button
      className="px-4 py-2 bg-gray-800 rounded-lg text-white"
      onClick={handlePrint}
    >
      {text}
    </button>
  );
};

export default PrintButton;
