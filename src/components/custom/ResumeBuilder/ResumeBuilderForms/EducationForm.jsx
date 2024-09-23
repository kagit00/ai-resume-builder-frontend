import { useState, useEffect } from 'react';
import { saveEducation, updateEducation, deleteEducation, getEducations } from '@/services/ApiService';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import ResponsiveQuill from '@/components/custom/ResponsiveQuill/ResponsiveQuill';

const EducationForm = ({ education, setEducation, educationList, setEducationList, editingIndex, setEditingIndex, resume }) => {
    const isDisabled = !education.title || !education.location || !education.organization || !education.startDate || !education.description;
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (resume.id) {
            getAllEducationsForResume(resume.id);
        }
    }, [resume.id]);

    const handleEditorChange = (value) => {
        setEducation(prev => ({
            ...prev,
            description: DOMPurify.sanitize(value)
        }));
    };

    const handleReset = () => {
        setEducation({ title: '', location: '', organization: '', startDate: '', endDate: '', description: '' })
        setEditingIndex(null)
    }

    const handleEducationDetailChange = (e) => {
        const { name, value } = e.target;
        setEducation(prev => ({
            ...prev,
            [name]: DOMPurify.sanitize(value)
        }));
    };

    const getAllEducationsForResume = async (resumeId) => {
        try {
            setIsLoading(true)
            const educations = await getEducations(resumeId)
            setEducationList(educations)
        } catch (error) {
            toast.error(error?.response?.data?.errorMsg, {
                style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
                },
            });
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddEducation = async () => {
        try {
            setIsLoading(true)
            if (editingIndex !== null) {
                const updatedEducationList = educationList.map((ed, index) =>
                    index === editingIndex ? education : ed
                );
                setEducationList(updatedEducationList);
                await updateEducation(education, education.id, resume.id)
                setEditingIndex(null);
            } else {
                const ed = await saveEducation(education, resume.id)
                setEducationList([...educationList, ed]);
            }
        } catch (error) {
            toast.error(error?.response?.data?.errorMsg, {
                style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
                },
            });
        } finally {
            setIsLoading(false)
        }
        setEducation({ title: '', organization: '', location: '', startDate: '', endDate: '', description: '' });
    };

    const handleDeleteEducation = async (indexToRemove) => {
        try {
            setIsLoading(true)
            const updatedEducationList = educationList.filter((_, index) => index !== indexToRemove);
            await deleteEducation(resume.id, educationList[indexToRemove].id)
            setEducationList(updatedEducationList);
        } catch (error) {
            toast.error(error?.response?.data?.errorMsg, {
                style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
                },
            });
        } finally {
            setIsLoading(false)
        }
    };

    const handleEditEducation = (indexToEdit) => {
        const educationToEdit = educationList[indexToEdit];
        setEducation(educationToEdit);
        setEditingIndex(indexToEdit);
    };

    return (
        <>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            <div className=' scroll-smooth'>
                <div className="mb-6 flex flex-wrap gap-2">
                    {educationList.map((ed, index) => (
                        <div key={index} className=" flex items-center text-gray-100 rounded-full bg-sky-950 px-4 py-2 text-xs font-semibold cursor-pointer">
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
                            className="text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none shadow-lg bg-transparent border-b-2"
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
                            className="bg-transparent border-b-2 text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
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
                            className="bg-transparent border-b-2 text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                            placeholder="School/University Name"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-1 mb-6">
                        <div className="w-full md:w-1/2">
                            <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startDate">
                                Start Date
                            </label>
                            <CustomDatePicker
                                id="startDate"
                                selectedDate={education.startDate}
                                onDateChange={(date) =>
                                    handleEducationDetailChange({
                                        target: { name: 'startDate', value: date.toISOString().split('T')[0] }
                                    })
                                }
                                placeholder="Start Date"
                                maxDate={education.endDate ? new Date(education.endDate) : new Date()}
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endDate">
                                End Date
                            </label>
                            <CustomDatePicker
                                id="endDate"
                                selectedDate={education.endDate}
                                onDateChange={(date) =>
                                    handleEducationDetailChange({
                                        target: { name: 'endDate', value: date.toISOString().split('T')[0] }
                                    })
                                }
                                placeholder="End Date"
                                maxDate={new Date()} // Disables future dates
                                minDate={education.startDate ? new Date(education.startDate) : null} // Prevents selecting an end date before the start date
                            />
                        </div>
                    </div>

                    <div className="relative mb-6">
                        <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="description">
                            Tell Us More
                        </label>
                        <div className="relative">
                            <ResponsiveQuill
                                id="description"
                                name="description"
                                value={education.description}
                                onChange={handleEditorChange}
                                placeholder="Enter description here..."
                                style={{ minHeight: '100px', maxHeight: '180px' }}
                                className="bg-slate-300 text-black border border-transparent rounded-md w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleAddEducation}
                            className={`text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform flex items-center space-x-2 ${isDisabled
                                ? 'opacity-50 cursor-not-allowed bg-gray-600'
                                : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
                                }`}
                            disabled={isDisabled}
                        >
                            <span>{editingIndex !== null ? 'Update' : 'Add'}</span>
                        </button>

                        <button
                            onClick={handleReset}
                            className=" text-white py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                        >
                            <span>Reset</span>
                        </button>
                    </div>
                </>
            </div>
        </>
    );
};

EducationForm.propTypes = {
    education: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        organization: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    setEducation: PropTypes.func.isRequired,
    educationList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        location: PropTypes.string,
        organization: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        description: PropTypes.string,
    })).isRequired,
    setEducationList: PropTypes.func.isRequired,
    editingIndex: PropTypes.number,
    setEditingIndex: PropTypes.func.isRequired,
    resume: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default EducationForm;
