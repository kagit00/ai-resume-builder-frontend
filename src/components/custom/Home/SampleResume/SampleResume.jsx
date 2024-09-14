import { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'; 
import Modal from '@mui/material/Modal';

const SampleResume = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section className="relative w-full py-10 md:py-16 bg-gray-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
                    {/* Text Section */}
                    <div className="flex-1 text-center md:text-center">
                        <h2 className="text-3xl font-light sm:text-4xl md:text-5xl text-gray-100">
                            See a Sample Resume
                        </h2>
                        <p className="mx-auto max-w-md text-gray-300 text-lg md:text-xl mt-4">
                            Click on the resume at right side and get an insight.
                        </p>
                    </div>

                    {/* Resume Image Preview */}
                    <div className="relative flex-1 flex flex-col items-center md:items-start">
                        <div className="relative rounded-lg overflow-hidden shadow-md w-full max-w-sm">
                            <img
                                src="./1.png"
                                alt="Sample Resume"
                                className="object-contain w-full h-[500px] md:h-[600px] lg:h-[700px] cursor-pointer"
                                onClick={openModal}
                            />
                            <button
                                className="absolute top-2 right-2 p-2 bg-gray-700 rounded-full text-gray-100 hover:bg-gray-600"
                                onClick={openModal}
                            >
                                <MagnifyingGlassIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for viewing PDF */}
            <Modal open={isModalOpen} onClose={closeModal}>
                <div className="relative flex justify-center items-center h-screen">
                    <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] overflow-auto">
                        {/* Close Icon */}
                        <button
                            className="absolute top-2 right-2 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600 z-10"
                            onClick={closeModal}
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        {/* React PDF Viewer */}
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                            <Viewer fileUrl="./sample_resume.pdf" /> {/* Replace with your actual PDF */}
                        </Worker>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default SampleResume;
