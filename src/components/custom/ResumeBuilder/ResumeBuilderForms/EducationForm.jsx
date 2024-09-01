import React, { useState, useEffect } from 'react';
import { saveEducation, updateEducation, deleteEducation, getEducations } from '@/services/ApiService';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';
import { areAllFieldsFilled } from '@/utils/BasicUtils';
import { FiTrash2 } from 'react-icons/fi';

const EducationForm = ({ education, setEducation, educationList, setEducationList, editingIndex, setEditingIndex, resume, resumeDetails }) => {
    const [educationId, setEducationId] = useState('')

    useEffect(() => {
        if (resumeDetails.isEditMode) {
            getEducation(resume.id);
        }
    }, []);

    const getEducation = async (resumeId) => {
        const educations = await getEducations(resumeId)
        setEducationList(educations)
    }

    const handleEducationDetailChange = (e) => {
        setEducation({ ...education, [e.target.name]: e.target.value });
    };

    const handleAddEducation = async () => {
        if (editingIndex !== null) {
            const updatedEducationList = educationList.map((ed, index) =>
                index === editingIndex ? education : ed
            );
            setEducationList(updatedEducationList);
            await updateEducation(education, educationId, resume.id)
            setEditingIndex(null);
        } else {
            setEducationList([...educationList, education]);
            const ed = await saveEducation(education, resume.id)
            setEducation(ed);
            setEducationId(ed.id)
        }
        setEducation({ title: '', organization: '', location: '', startDate: '', endDate: '', description: '' });
    };

    const handleDeleteEducation = async (indexToRemove) => {
        const updatedEducationList = educationList.filter((_, index) => index !== indexToRemove);
        await deleteEducation(resume.id, educationList[indexToRemove].id)
        setEducationList(updatedEducationList);
    };

    const handleEditEducation = (indexToEdit) => {
        setEducationId(educationList[indexToEdit].id)
        const educationToEdit = educationList[indexToEdit];
        setEducation(educationToEdit);
        setEditingIndex(indexToEdit);
    };

    return (
        <div>
            <div className="mb-6 flex flex-wrap gap-2">
                {educationList.map((ed, index) => (
                    <div key={index} className=" flex items-center text-gray-100 rounded-full bg-zinc-800 px-4 py-2 text-sm font-semibold cursor-pointer">
                        <span onClick={() => handleEditEducation(index)} className="cursor-pointer">
                            {ed.title}
                        </span>
                        <FiTrash2
                            className="ml-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEducation(index);
                            }}
                        />
                    </div>
                ))}
            </div>
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
                            Start Date
                        </label>
                        <CustomDatePicker
                            id="startDate"
                            selectedDate={education.startDate}
                            onDateChange={(date) => handleEducationDetailChange({ target: { name: 'startDate', value: date.toISOString().split('T')[0] } })}
                            placeholder="Start Date"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endDate">
                            End Date
                        </label>
                        <CustomDatePicker
                            id="endDate"
                            selectedDate={education.endDate}
                            onDateChange={(date) => handleEducationDetailChange({ target: { name: 'endDate', value: date.toISOString().split('T')[0] } })}
                            placeholder="End Date"
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

                {areAllFieldsFilled(education) && <button
                    onClick={handleAddEducation}
                    className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                >
                    <span>
                        {editingIndex !== null ? 'Update' : 'Add'}
                    </span>
                </button>}
            </>
        </div>
    );
};

export default EducationForm;
