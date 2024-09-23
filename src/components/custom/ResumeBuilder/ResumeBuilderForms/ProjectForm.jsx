import { useState, useEffect } from 'react';
import { saveProject, updateProject, deleteProject, getProjects } from '@/services/ApiService';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';
import { FiTrash2 } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsiveQuill from '@/components/custom/ResponsiveQuill/ResponsiveQuill';
import DOMPurify from 'dompurify';
import { getGenerateSuggestions } from '@/services/ApiService';
import AISuggestionsButton from '../Buttons/AISuggestionButton.jsx'

const ProjectForm = ({ project, setProject, projectsList, setProjectsList, editingIndex, setEditingIndex, resume }) => {
     const isDisabled = !project.title || !project.startDate || !project.description;
     const [isLoading, setIsLoading] = useState(false)

     useEffect(() => {
        const fetchProjects = async () => {
            if (resume.id) {
                await getAllProjectsForResume();
            }
        };
        fetchProjects();
    }, [resume.id]);

     const handleReset = () => {
          setProject({ title: '', location: '', organization: '', startDate: '', endDate: '', description: '' })
          setEditingIndex(null)
     }

     const handleEditorChange = (value) => {
          setProject(prev => ({
               ...prev,
               description: DOMPurify.sanitize(value)
          }));
     };

     const handleProjectDetailChange = (e) => {
          const { name, value } = e.target;
          setProject(prev => ({
               ...prev,
               [name]: DOMPurify.sanitize(value)
          }));
     };

     const getAllProjectsForResume = async () => {
          try {
               setIsLoading(true)
               const projects = await getProjects(resume.id)
               setProjectsList(projects)
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

     const handleAddProject = async () => {
          try {
               setIsLoading(true)
               if (editingIndex !== null) {
                    const updatedProjectsList = projectsList.map((proj, index) =>
                         index === editingIndex ? project : proj
                    );
                    setProjectsList(updatedProjectsList);
                    await updateProject(project, project.id, resume.id)
                    setEditingIndex(null);
               } else {
                    const proj = await saveProject(project, resume.id)
                    setProjectsList([...projectsList, proj]);
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
          setProject({ title: '', location: '', organization: '', startDate: '', endDate: '', description: '' });
     };

     const handleEditProject = (index) => {
          setProject(projectsList[index]);
          setEditingIndex(index);
     };

     const handleRemoveProject = async (index) => {
          const updatedProjectsList = projectsList.filter((_, i) => i !== index);
          setProjectsList(updatedProjectsList);
          try {
               setIsLoading(true)
               await deleteProject(resume.id, projectsList[index].id)
               if (editingIndex === index) {
                    setProject({ title: '', startDate: '', endDate: '', description: '' });
                    setEditingIndex(null);
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
     };

     const handleGenerateSuggestions = async () => {
          if (!project.title) {
               toast.error("Project Name Required For Generating AI Suggestions", {
                    style: {
                         backgroundColor: '#1F2937',
                         color: '#fff'
                    },
               });
               return;
          }
          try {
               setIsLoading(true)
               const suggestions = await getGenerateSuggestions(project.title, 'project description in four sentences');
               setProject(prev => { return { ...prev, description: suggestions.generatedSuggestion }; });
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


     return (
          <>
               {isLoading && (
                    <div className="loader-overlay">
                         <div className="loader"></div>
                    </div>
               )}
               <div className='scroll-smooth'>
                    <div className="mb-6 flex flex-wrap gap-2">
                         {projectsList.map((proj, index) => (
                              <span
                                   key={index}
                                   className="flex items-center text-gray-100 rounded-full bg-sky-950 px-4 py-2 text-xs font-semibold cursor-pointer"
                                   onClick={() => handleEditProject(index)}
                              >
                                   <span>{proj.title}</span>
                                   <FiTrash2
                                        className="ml-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             handleRemoveProject(index);
                                        }}
                                   />
                              </span>
                         ))}
                    </div>
                    <>
                         <div className="mb-6">
                              <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="title">
                                   Project Name
                              </label>
                              <input
                                   id="title"
                                   name="title"
                                   value={project.title}
                                   onChange={handleProjectDetailChange}
                                   className="bg-transparent border-b-2 text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                                   placeholder="Project Name"
                              />
                         </div>

                         <div className="flex flex-col md:flex-row gap-4 mb-6">
                              <div className="w-full md:w-1/2">
                                   <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="location">
                                        Location
                                   </label>
                                   <input
                                        id="location"
                                        name="location"
                                        value={project.location}
                                        onChange={handleProjectDetailChange}
                                        className="bg-transparent border-b-2 text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                                        placeholder="Location"
                                   />
                              </div>

                              <div className="w-full md:w-1/2">
                                   <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="organization">
                                        Organization Name
                                   </label>
                                   <input
                                        id="organization"
                                        name="organization"
                                        value={project.organization}
                                        onChange={handleProjectDetailChange}
                                        className="bg-transparent border-b-2 text-gray-100 w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                                        placeholder="Put NA if personal"
                                   />
                              </div>
                         </div>

                         <div className="flex flex-col md:flex-row gap-1 mb-6">
                              <div className="w-full md:w-1/2">
                                   <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startDate">
                                        Start Date
                                   </label>
                                   <CustomDatePicker
                                        id="startDate"
                                        selectedDate={project.startDate}
                                        onDateChange={(date) =>
                                             handleProjectDetailChange({
                                                  target: { name: 'startDate', value: date.toISOString().split('T')[0] }
                                             })
                                        }
                                        placeholder="Start Date"
                                        maxDate={project.endDate ? new Date(project.endDate) : new Date()} // Prevents selecting a start date after the end date
                                   />
                              </div>

                              <div className="w-full md:w-1/2">
                                   <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endDate">
                                        End Date
                                   </label>
                                   <CustomDatePicker
                                        id="endDate"
                                        selectedDate={project.endDate}
                                        onDateChange={(date) =>
                                             handleProjectDetailChange({
                                                  target: { name: 'endDate', value: date.toISOString().split('T')[0] }
                                             })
                                        }
                                        placeholder="End Date"
                                        maxDate={new Date()} // Disables future dates
                                        minDate={project.startDate ? new Date(project.startDate) : null} // Prevents selecting an end date before the start date
                                   />
                              </div>
                         </div>

                         <div className=" mb-6">
                              <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="description">
                                   Tell Us More
                              </label>
                              <div className="relative">
                                   <ResponsiveQuill
                                        id="description"
                                        name="description"
                                        value={project.description}
                                        onChange={handleEditorChange}
                                        placeholder="Put some details or write with AI"
                                        className="bg-slate-300 text-black border border-transparent rounded-md w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                                        style={{ minHeight: '100px', maxHeight: '180px' }}
                                   />
                                   <AISuggestionsButton onClick={handleGenerateSuggestions} />
                              </div>
                         </div>
                         <div className="flex space-x-3">
                              <button
                                   onClick={handleAddProject}
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

ProjectForm.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.string, 
        title: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired, 
        location: PropTypes.string, 
        organization: PropTypes.string, 
        description: PropTypes.string.isRequired,
    }).isRequired,
    setProject: PropTypes.func.isRequired,
    projectsList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired, 
        location: PropTypes.string, 
        organization: PropTypes.string, 
        description: PropTypes.string.isRequired,
    })).isRequired,
    setProjectsList: PropTypes.func.isRequired,
    editingIndex: PropTypes.number,
    setEditingIndex: PropTypes.func.isRequired,
    resume: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
    }

export default ProjectForm;
