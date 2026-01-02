import React from 'react';

const PrintComponent = () => {
  const handlePrint = () => {
    window.print();  // Opens the browser's print dialog
  };

  return (
    <div>
      <button onClick={handlePrint}>Open Print Dialog</button>
      <div>
        <h1>Content to Print</h1>
        <p>This content will be printed when you open the print dialog.</p>
      </div>
    </div>
  );
};

export default PrintComponent;
