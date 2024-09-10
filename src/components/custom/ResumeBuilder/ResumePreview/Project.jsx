import DOMPurify from 'dompurify';
import './styles.css'

const Project = ({ projectsList }) => {
     return (
          <section className="mb-2">
                         {/* Section Heading */}
                         <h5 className="text-sm font-semibold text-black border-b border-gray-300 pb-1">Projects</h5>

                         {/* Projects List */}
                         {projectsList.length > 0 ? (
                              projectsList.map((proj, index) => (
                                   <div key={index} className="mb-2 pb-1 border-b border-gray-300 text-xs">
                                        <div className="text-xs">
                                             {/* Project Title */}
                                             <h5 className="font-semibold text-black">{proj.title}</h5>

                                             {/* Organization and Location */}
                                             <p className="text-gray-700">
                                                  {proj.organization}, {proj.location}
                                             </p>

                                             {/* Project Dates */}
                                             <p className="text-gray-600 font-semibold leading-snug">
                                                  {proj.startDate} - {proj.endDate || "Present"}
                                             </p>

                                             {/* Project Description */}
                                             {proj.description && (
                                                  <div
                                                       className="text-black font-normal leading-snug mt-1 cust custom"
                                                       dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(proj.description) }}
                                                  />
                                             )}
                                        </div>
                                   </div>
                              ))
                         ) : (
                              <p className="text-xs text-black font-semibold">No projects listed</p>
                         )}
                    </section>
     )
}

export default Project;