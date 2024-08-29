import React from 'react';
import { saveEducation } from '@/services/ApiService';

const EducationForm = ({ education, setEducation, educationList, setEducationList, editingIndex, setEditingIndex, resume }) => {
    const handleEducationDetailChange = (e) => {
        setEducation({ ...education, [e.target.name]: e.target.value });
    };

    const handleAddEducation = async () => {
        if (editingIndex !== null) {
            const updatedEducationList = educationList.map((ed, index) =>
                index === editingIndex ? education : ed
            );
            setEducationList(updatedEducationList);
            setEditingIndex(null);
        } else {
            setEducationList([...educationList, education]);
        }
        await saveEducation(education, resume.id)
        setEducation({ title: '', organization: '', location: '', startDate: '', endDate: '', description: '' });
    };

    const handleDeleteEducation = (indexToRemove) => {
        const updatedEducationList = educationList.filter((_, index) => index !== indexToRemove);
        setEducationList(updatedEducationList);
    };

    const handleEditEducation = (indexToEdit) => {
        const educationToEdit = educationList[indexToEdit];
        setEducation(educationToEdit);
        setEditingIndex(indexToEdit);
    };

    return (
        <div>
            <>
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="title">
                        Degree or Equivalent
                    </label>
                    <input
                        id="title"
                        name="title"
                        value={education.title}
                        onChange={handleEducationDetailChange}
                        className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                        placeholder="Degree or Equivalent"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        id="location"
                        name="location"
                        value={education.location}
                        onChange={handleEducationDetailChange}
                        className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                        placeholder="Location"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="organization">
                        School/University Name
                    </label>
                    <input
                        id="organization"
                        name="organization"
                        value={education.organization}
                        onChange={handleEducationDetailChange}
                        className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                        placeholder="School/University Name"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startDate">
                            Start Year
                        </label>
                        <input
                            id="startDate"
                            name="startDate"
                            value={education.startDate}
                            onChange={handleEducationDetailChange}
                            type="number"
                            className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                            placeholder="Start Year"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endDate">
                            End Year (or Present)
                        </label>
                        <input
                            id="endDate"
                            name="endDate"
                            value={education.endDate}
                            onChange={handleEducationDetailChange}
                            type="text"
                            className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                            placeholder="End Year or Present"
                        />
                    </div>
                </div>

                <div className="relative mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="description">
                        Education description
                    </label>
                    <div className="relative">
                        <textarea
                            id="description"
                            name="description"
                            value={education.description}
                            onChange={handleEducationDetailChange}
                            className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16"
                            rows="5"
                            placeholder="Enter education description or click on the bottom-right button to write with AI"
                        />
                    </div>
                </div>

                <button
                    onClick={handleAddEducation}
                    className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                >
                    <span>
                        {editingIndex !== null ? 'Update Education' : 'Add Education'}
                    </span>
                </button>

                <div className="mt-6">
                    {educationList.map((ed, index) => (
                        <div key={index} className="inline-block bg-gray-800 text-gray-100 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                            <span onClick={() => handleEditEducation(index)} className="cursor-pointer">
                                {ed.title}
                            </span>
                            <button
                                onClick={() => handleDeleteEducation(index)}
                                className="ml-2 text-red-400 hover:text-red-600 focus:outline-none"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </>
        </div>
    );
};

export default EducationForm;
