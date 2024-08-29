import React from 'react';
import { saveProject } from '@/services/ApiService';

const ProjectForm = ({ project, setProjects, projectsList, setProjectsList, editingIndex, setEditingIndex, resume }) => {

     const handleProjectDetailChange = (e) => {
          setProjects({ ...project, [e.target.name]: e.target.value });
     };

     const handleAddProject = async () => {
          if (editingIndex !== null) {
               const updatedProjectsList = projectsList.map((proj, index) =>
                    index === editingIndex ? project : proj
               );
               setProjectsList(updatedProjectsList);
               setEditingIndex(null);
          } else {
               setProjectsList([...projectsList, project]);
          }
          await saveProject(project, resume.id)
          setProjects({ title: '', startDate: '', endDate: '', description: '' });
     };

     const handleEditProject = (index) => {
          setProjects(projectsList[index]);
          setEditingIndex(index);
     };

     const handleRemoveProject = (index) => {
          const updatedProjectsList = projectsList.filter((_, i) => i !== index);
          setProjectsList(updatedProjectsList);
          if (editingIndex === index) {
               setProjects({ title: '', startDate: '', endDate: '', description: '' });
               setEditingIndex(null);
          }
     };

     return (
          <div>
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
                                   Start Year
                              </label>
                              <input
                                   id="startDate"
                                   name="startDate"
                                   value={project.startDate}
                                   onChange={handleProjectDetailChange}
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
                                   value={project.endDate}
                                   onChange={handleProjectDetailChange}
                                   type="text"
                                   className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                                   placeholder="End Year or Present"
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

                    <div className="flex flex-wrap gap-2 mb-4">
                         {projectsList.map((proj, index) => (
                              <span
                                   key={index}
                                   className="bg-zinc-900 text-gray-100 rounded-full py-1 px-4 cursor-pointer flex items-center space-x-2"
                                   onClick={() => handleEditProject(index)}
                              >
                                   <span>{proj.title}</span>
                                   <button
                                        className="text-white"
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             handleRemoveProject(index);
                                        }}
                                   >
                                        &times;
                                   </button>
                              </span>
                         ))}
                    </div>

                    <button
                         onClick={handleAddProject}
                         className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center space-x-2"
                    >
                         <span>{editingIndex !== null ? 'Update Project' : 'Add Project'}</span>
                    </button>
               </>
          </div>
     );
};

export default ProjectForm;
