import React, { useState, useEffect } from 'react';
import { saveProject, updateProject, deleteProject, getProjects } from '@/services/ApiService';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';
import { FiTrash2 } from 'react-icons/fi';

const ProjectForm = ({ project, setProjects, projectsList, setProjectsList, editingIndex, setEditingIndex, resume, resumeDetails }) => {
     const [projectId, setProjectId] = useState('')

     useEffect(() => {
          if (resumeDetails.isEditMode) {
               getProject()
          }
     }, []);

     const getProject = async () => {
          const projects = await getProjects(resume.id)
          setProjectsList(projects)
     }

     const handleProjectDetailChange = (e) => {
          setProjects({ ...project, [e.target.name]: e.target.value });
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
               setProjectsList([...projectsList, project]);
               const proj = await saveProject(project, resume.id)
               setProjectId(proj.id)
          }
          setProjects({ title: '', startDate: '', endDate: '', description: '' });
     };

     const handleEditProject = (index) => {
          setProjectId(projectsList[index].id)
          setProjects(projectsList[index]);
          setEditingIndex(index);
     };

     const handleRemoveProject = async (index) => {
          const updatedProjectsList = projectsList.filter((_, i) => i !== index);
          setProjectsList(updatedProjectsList);
          await deleteProject(resume.id, projectsList[index].id)
          if (editingIndex === index) {
               setProjects({ title: '', startDate: '', endDate: '', description: '' });
               setEditingIndex(null);
          }
     };

     return (
          <div>
               <div className="mb-6 flex flex-wrap gap-2">
                    {projectsList.map((proj, index) => (
                         <span
                              key={index}
                              className="flex items-center text-gray-100 rounded-full bg-zinc-800 px-4 py-2 text-sm font-semibold cursor-pointer"
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
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="Project Name"
                         />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                         <div className="w-full md:w-1/2">
                              <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="startDate">
                                   Start Date
                              </label>
                              <CustomDatePicker
                                   id="startDate"
                                   selectedDate={project.startDate}
                                   onDateChange={(date) => handleProjectDetailChange({ target: { name: 'startDate', value: date.toISOString().split('T')[0] } })}
                                   placeholder="Start Date"
                              />
                         </div>

                         <div className="w-full md:w-1/2">
                              <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="endDate">
                                   End Date
                              </label>
                              <CustomDatePicker
                                   id="endDate"
                                   selectedDate={project.endDate}
                                   onDateChange={(date) => handleProjectDetailChange({ target: { name: 'endDate', value: date.toISOString().split('T')[0] } })}
                                   placeholder="End Date"
                              />
                         </div>
                    </div>

                    <div className=" mb-6">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="description">
                              Project Details
                         </label>
                         <div>
                              <textarea
                                   id="description"
                                   name="description"
                                   value={project.description}
                                   onChange={handleProjectDetailChange}
                                   className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16"
                                   rows="5"
                                   placeholder="Enter project details or click on the bottom-right button to write with AI"
                              />
                         </div>
                    </div>
                    {
                         <button
                              onClick={handleAddProject}
                              className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                         >
                              <span>{editingIndex !== null ? 'Update' : 'Add'}</span>
                         </button>
                    }
               </>
          </div>
     );
};

export default ProjectForm;
