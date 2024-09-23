import { FaFilePdf, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiIndeed } from 'react-icons/si';
import Header from '@/components/custom/Home/Header/GlobalHeader.jsx';
import generatePdf from '@/components/custom/ResumeBuilder/ResumeFinal/PdfGenerator';
import { useLocation } from 'react-router-dom';
import FinalResume from '@/components/custom/ResumeBuilder/ResumeFinal/FinalResume';

const ResumeSuccessPage = () => {
    const location = useLocation();
    const {
        resumePdfTitle,
        userDetails,
        addedSummary,
        addedAdditionalDetails,
        experienceList,
        educationList,
        projectsList,
        skills,
        languagesList
    } = location.state || {};

    const handleDownload = () => {
        generatePdf(resumePdfTitle,
            <FinalResume
                userDetails={userDetails}
                addedSummary={addedSummary}
                addedAdditionalDetails={addedAdditionalDetails}
                experienceList={experienceList}
                educationList={educationList}
                projectsList={projectsList}
                skills={skills}
                languagesList={languagesList}
            />
        )
    };

    const handleShareLinkedIn = () => {
        window.open('https://www.linkedin.com', '_blank');
    };

    const handleShareIndeed = () => {
        window.open('https://www.indeed.com', '_blank');
    };

    const handleEmail = () => {
        window.open('mailto:?subject=Resume&body=Check out my resume!');
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                {/* Success Message */}
                <h2 className="text-5xl font-thin mb-4 leading-relaxed">You have Finished Your Resume Editing Successfully!</h2>
                <p className="text-lg text-gray-300 mb-8 text-center font-normal">
                    Now you can download your resume and share it with your potential employers.
                </p>

                {/* Icons for different actions */}
                <div className="flex space-x-6">
                    {/* Download PDF */}
                    <div
                        className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110"
                        onClick={handleDownload}
                    >
                        <FaFilePdf size={40} className="text-red-500" />
                        <span className="text-sm mt-2">Download</span>
                    </div>

                    {/* LinkedIn */}
                    <div
                        className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110"
                        onClick={handleShareLinkedIn}
                    >
                        <FaLinkedin size={40} className="text-blue-600" />
                        <span className="text-sm mt-2">LinkedIn</span>
                    </div>

                    {/* Indeed */}
                    <div
                        className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110"
                        onClick={handleShareIndeed}
                    >
                        <SiIndeed size={40} className="text-blue-500" />
                        <span className="text-sm mt-2">Indeed</span>
                    </div>

                    {/* Email */}
                    <div
                        className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110"
                        onClick={handleEmail}
                    >
                        <FaEnvelope size={40} className="text-yellow-400" />
                        <span className="text-sm mt-2">Email</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumeSuccessPage;
