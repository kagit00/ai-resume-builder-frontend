import React from 'react';
import AISuggestionsButton from './AISuggestionButton.jsx'

const EducationForm = ({ education, setEducation, educationList, setEducationList, editingIndex, setEditingIndex }) => {
    const handleEducationDetailChange = (e) => {
        setEducation({ ...education, [e.target.name]: e.target.value });
    };

    const handleAddEducation = () => {
        if (editingIndex !== null) {
            const updatedEducationList = educationList.map((ed, index) =>
                index === editingIndex ? education : ed
            );
            setEducationList(updatedEducationList);
            setEditingIndex(null);
        } else {
            setEducationList([...educationList, education]);
        }
        setEducation({ degree: '', schoolName: '', location: '', startYear: '', endYear: '', details: '' });
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
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="degree">
                        Degree or Equivalent
                    </label>
                    <input
                        id="degree"
                        name="degree"
                        value={education.degree}
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
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="schoolName">
                        School/University Name
                    </label>
                    <input
                        id="schoolName"
                        name="schoolName"
                        value={education.schoolName}
                        onChange={handleEducationDetailChange}
                        className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                        placeholder="School/University Name"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startYear">
                            Start Year
                        </label>
                        <input
                            id="startYear"
                            name="startYear"
                            value={education.startYear}
                            onChange={handleEducationDetailChange}
                            type="number"
                            className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                            placeholder="Start Year"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endYear">
                            End Year (or Present)
                        </label>
                        <input
                            id="endYear"
                            name="endYear"
                            value={education.endYear}
                            onChange={handleEducationDetailChange}
                            type="text"
                            className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                            placeholder="End Year or Present"
                        />
                    </div>
                </div>

                <div className="relative mb-6">
                    <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="details">
                        Education Details
                    </label>
                    <div className="relative">
                        <textarea
                            id="details"
                            name="details"
                            value={education.details}
                            onChange={handleEducationDetailChange}
                            className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 text-xs"
                            rows="5"
                            style={{ fontFamily: 'Helvetica' }}
                            placeholder="Enter education details or click on the bottom-right button to write with AI"
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
                                {ed.degree}
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
