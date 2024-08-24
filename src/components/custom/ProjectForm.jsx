import React from 'react';
import AISuggestionsButton from './AISuggestionButton.jsx'

const ProjectForm = ({ project, setProjects, projectsList, setProjectsList, editingIndex, setEditingIndex }) => {

     const handleProjectDetailChange = (e) => {
          setProjects({ ...project, [e.target.name]: e.target.value });
     };

     const handleAddProject = () => {
          if (editingIndex !== null) {
               const updatedProjectsList = projectsList.map((proj, index) =>
                    index === editingIndex ? project : proj
               );
               setProjectsList(updatedProjectsList);
               setEditingIndex(null);
          } else {
               setProjectsList([...projectsList, project]);
          }
          setProjects({ projectName: '', startYear: '', endYear: '', projectDetails: '' });
     };

     const handleEditProject = (index) => {
          setProjects(projectsList[index]);
          setEditingIndex(index);
     };

     const handleRemoveProject = (index) => {
          const updatedProjectsList = projectsList.filter((_, i) => i !== index);
          setProjectsList(updatedProjectsList);
          if (editingIndex === index) {
               setProjects({ projectName: '', startYear: '', endYear: '', projectDetails: '' });
               setEditingIndex(null);
          }
     };

     return (
          <div>
               <>
                    <div className="mb-6">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="projectName">
                              Project Name
                         </label>
                         <input
                              id="projectName"
                              name="projectName"
                              value={project.projectName}
                              onChange={handleProjectDetailChange}
                              className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                              placeholder="Project Name"
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
                                   value={project.startYear}
                                   onChange={handleProjectDetailChange}
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
                                   value={project.endYear}
                                   onChange={handleProjectDetailChange}
                                   type="text"
                                   className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
                                   placeholder="End Year or Present"
                              />
                         </div>
                    </div>

                    <div className="relative mb-6">
                         <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="details">
                              Project Details
                         </label>
                         <div className="relative">
                              <textarea
                                   id="details"
                                   name="details"
                                   value={project.projectDetails}
                                   onChange={handleProjectDetailChange}
                                   className="bg-zinc-900 text-gray-100 border-none rounded-lg w-full py-2 md:py-3 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out pr-16 text-xs"
                                   rows="5"
                                   style={{ fontFamily: 'Helvetica' }}
                                   placeholder="Enter project details or click on the bottom-right button to write with AI"
                              />
                              <AISuggestionsButton />
                         </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                         {projectsList.map((proj, index) => (
                              <span
                                   key={index}
                                   className="bg-zinc-900 text-gray-100 rounded-full py-1 px-4 cursor-pointer flex items-center space-x-2"
                                   onClick={() => handleEditProject(index)}
                              >
                                   <span>{proj.projectName}</span>
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
