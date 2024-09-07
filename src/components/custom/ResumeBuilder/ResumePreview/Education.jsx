const Education = ({ educationList}) => {
     return (
          <section className="mb-3">
               <h5 className="text-medium font-semibold text-black border-b border-gray-300 pb-2">Education</h5>
               {educationList.length > 0 ? (
                    educationList.map((edu, index) => (
                         <div key={index} className="mb-2 border-b border-gray-300 pb-2 text-sm">
                              <p className="font-semibold text-xs text-black">{edu.title}</p>
                              <p className="text-gray-600 text-xs">{edu.organization}, {edu.location}</p>
                              <p className="text-gray-600 font-semibold text-xs">{edu.startDate} - {edu.endDate}</p>
                              <p className="text-black font-normal text-xs leading-tight">{edu.description}</p>
                         </div>
                    ))
               ) : (
                    <p className="text-xs text-black">No education listed</p>
               )}
          </section>
     )
}

export default Education