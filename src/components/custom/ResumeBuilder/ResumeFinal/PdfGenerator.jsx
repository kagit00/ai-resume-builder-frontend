import React from 'react';
import ReactDOM from 'react-dom/client';
import html2pdf from 'html2pdf.js';

const generatePdf = (resumePdfTitle, Component) => {

  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.margin = '0';
  container.style.padding = '0';
  document.body.appendChild(container);


  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      {Component}
    </React.StrictMode>
  );


  setTimeout(() => {

    const options = {
      margin: [0.5, 0, 0.8, 0],
      filename: `${resumePdfTitle}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, logging: true, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(options).from(container).save().finally(() => {
      // Cleanup
      root.unmount();
      document.body.removeChild(container);
    });
  }, 100); 
};

export default generatePdf;
