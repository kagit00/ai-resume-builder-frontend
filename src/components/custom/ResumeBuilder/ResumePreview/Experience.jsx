import DOMPurify from 'dompurify';
import './styles.css'
import PropTypes from 'prop-types';

const Experience = ({ experienceList }) => {
     return (
          <section className="mb-2">
               {/* Section Heading */}
               <h5 className="text-xs font-semibold text-black border-b border-gray-300 pb-1">Experience</h5>

               {/* Experience List */}
               {experienceList.length > 0 ? (
                    experienceList.map((exp, index) => (
                         <div key={index} className="mb-2 pb-1 border-b border-gray-300">
                              <div className="flex justify-between items-start">
                                   {/* Experience Details */}
                                   <div className="text-xs">
                                        {/* Job Title */}
                                        <h5 className="font-semibold text-black">{exp.title}</h5>

                                        {/* Organization and Location */}
                                        <p className="text-gray-700">
                                             {exp.organization}, {exp.location}
                                        </p>

                                        {/* Duration */}
                                        <p className="text-gray-600 font-semibold">
                                             {exp.startDate} - {exp.endDate || "Present"}
                                        </p>

                                        {/* Description with Rich Text Formatting */}
                                        <div
                                             className="text-black font-normal leading-snug mt-1 cust custom"
                                             dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.description) }}
                                        />
                                   </div>
                              </div>
                         </div>
                    ))
               ) : (
                    <p className="text-xs text-black font-semibold">No experience listed</p>
               )}
          </section>
     )
}

Experience.propTypes = {
     experienceList: PropTypes.arrayOf(
          PropTypes.shape({
               id: PropTypes.string.isRequired,
               title: PropTypes.string.isRequired,
               location: PropTypes.string.isRequired,
               organization: PropTypes.string.isRequired,
               startDate: PropTypes.string.isRequired,
               endDate: PropTypes.string,
               description: PropTypes.string.isRequired,
          })
     ).isRequired,
};

export default Experience