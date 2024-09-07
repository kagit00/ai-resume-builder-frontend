import React from 'react';
import ReactDOM from 'react-dom/client';
import html2pdf from 'html2pdf.js';

const generatePdf = (resumePdfTitle, Component) => {
  // Create a temporary container with adjusted styling
  const container = document.createElement('div');
  container.style.width = '100%'; // Ensure full width
  container.style.margin = '0';   // Remove margin
  container.style.padding = '0';  // Remove padding
  document.body.appendChild(container);

  // Create a root and render the component into the temporary container
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      {Component}
    </React.StrictMode>
  );

  // Wait for the component to be fully rendered before generating the PDF
  setTimeout(() => {
    // Define PDF options
    const options = {
      margin: 0,
      filename: `${resumePdfTitle}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, useCORS: true }, // Adjust scale if needed
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF from the rendered component
    html2pdf().set(options).from(container).save().finally(() => {
      // Cleanup
      root.unmount();
      document.body.removeChild(container);
    });
  }, 100); // Small delay to ensure rendering is complete
};

export default generatePdf;
