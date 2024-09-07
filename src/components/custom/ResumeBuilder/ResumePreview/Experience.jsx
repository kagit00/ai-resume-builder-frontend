const Experience = ({ experienceList}) => {
     return (
          <section className="mb-3">
               <h5 className="text-medium font-semibold text-black border-b border-gray-300 pb-2">Experience</h5>
               {experienceList.length > 0 ? (
                    experienceList.map((exp, index) => (
                         <div key={index} className="mb-2 border-b border-gray-300 pb-2">
                              <p className="font-semibold text-xs text-black">{exp.title}</p>
                              <p className="text-gray-600 text-xs">{exp.organization}, {exp.location}</p>
                              <p className="text-gray-600 font-semibold text-xs">{exp.startDate} - {exp.endDate}</p>
                              <p className="text-black font-normal text-xs leading-tight">{exp.description}</p>
                         </div>
                    ))
               ) : (
                    <p className="text-xs text-black font-semibold leading-tight">No experience listed</p>
               )}
          </section>
     )
}

export default Experience