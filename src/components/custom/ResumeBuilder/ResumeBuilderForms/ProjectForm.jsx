import React, { useState, useEffect } from 'react';
import { saveProject, updateProject, deleteProject, getProjects } from '@/services/ApiService';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';
import { FiTrash2 } from 'react-icons/fi';
import { setResumeValidity } from '@/utils/BasicUtils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

const ProjectForm = ({ project, setProject, projectsList, setProjectsList, editingIndex, setEditingIndex, resume }) => {
     const [projectId, setProjectId] = useState('')
     const [isCurrentlyEnrolled, setIsCurrentlyEnrolled] = useState(false);
     const isDisabled = !project.title || !project.location || !project.organization || !project.startDate || !project.description;
     setResumeValidity('projects', projectsList.length > 0)

     useEffect(() => {
          getAllProjectsForResume()
     }, []);

     const handleEditorChange = (content) => {
          setProject({ ...project, description: DOMPurify.sanitize(content) })
     };

     const handleProjectDetailChange = (e) => {
          setProject({ ...project, [e.target.name]: DOMPurify.sanitize(e.target.value) });
     };

     const getAllProjectsForResume = async () => {
          const projects = await getProjects(resume.id)
          setProjectsList(projects)
     }

     const handleCheckboxChange = () => {
          setIsCurrentlyEnrolled(!isCurrentlyEnrolled);
          if (!isCurrentlyEnrolled) {
               setEducation((prev) => ({
                    ...prev,
                    endDate: '',
               }));
          }
     };

     const handleAddProject = async () => {
          if (editingIndex !== null) {
               const updatedProjectsList = projectsList.map((proj, index) =>
                    index === editingIndex ? project : proj
               );
               setProjectsList(updatedProjectsList);
               await updateProject(project, projectId, resume.id)
               setEditingIndex(null);
          } else {
               const proj = await saveProject(project, resume.id)
               setProjectsList([...projectsList, proj]);
               setProjectId(proj.id)
          }
          setProject({ title: '', location: '', organization: '', startDate: '', endDate: '', description: '' });
     };

     const handleEditProject = (index) => {
          setProjectId(projectsList[index].id)
          setProject(projectsList[index]);
          setEditingIndex(index);
     };

     const handleRemoveProject = async (index) => {
          const updatedProjectsList = projectsList.filter((_, i) => i !== index);
          setProjectsList(updatedProjectsList);
          await deleteProject(resume.id, projectsList[index].id)
          if (editingIndex === index) {
               setProject({ title: '', startDate: '', endDate: '', description: '' });
               setEditingIndex(null);
          }
     };

     return (
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

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
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
                                   disabled={isCurrentlyEnrolled} // Disable field if checkbox is checked
                              />
                         </div>

                         <div className="flex items-center">
                              <input
                                   type="checkbox"
                                   id="currentlyEnrolled"
                                   className="mr-2"
                                   checked={isCurrentlyEnrolled}
                                   onChange={handleCheckboxChange}
                              />
                              <label className="text-gray-300 text-xs" htmlFor="currentlyEnrolled">
                                   Currently Enrolled
                              </label>
                         </div>
                    </div>

                    <div className=" mb-6">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="description">
                              Tell Us More
                         </label>
                         <div>
                              <ReactQuill
                                   id="description"
                                   name="description"
                                   value={project.description}
                                   onChange={handleEditorChange}
                                   className="bg-slate-300 text-black border border-transparent rounded-md w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 hidden-scrollbar"
                                   placeholder="Put Some Details About Your Project"
                                   style={{ minHeight: '140px' }}
                              />
                         </div>
                    </div>

                    <button
                         onClick={handleAddProject}
                         className={`text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform flex items-center space-x-2 ${isDisabled
                              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
                              }`}
                         disabled={isDisabled}
                    >
                         <span>{editingIndex !== null ? 'Update' : 'Add'}</span>
                    </button>

               </>
          </div>
     );
};

export default ProjectForm;
