const Project = ({ projectsList }) => {
     return (
          <section className="mb-3">
               <h5 className="text-medium font-semibold text-black border-b border-gray-300 pb-2">Projects</h5>
               {projectsList.length > 0 ? (
                    projectsList.map((proj, index) => (
                         <div key={index} className="mb-2 border-b border-gray-300 pb-2 text-sm">
                              <p className="font-semibold text-xs text-black">{proj.title}</p>
                              <p className="text-gray-600 text-xs">{proj.organization}, {proj.location}</p>
                              <p className="text-gray-600 font-semibold text-xs">{proj.startDate} - {proj.endDate}</p>
                              <p className="text-black font-normal text-xs leading-tight">{proj.description}</p>
                         </div>
                    ))
               ) : (
                    <p className="text-xs text-black">No projects listed</p>
               )}
          </section>
     )
}

export default Project;