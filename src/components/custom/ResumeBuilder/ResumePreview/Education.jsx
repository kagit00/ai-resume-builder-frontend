import DOMPurify from 'dompurify';
import './styles.css'
import PropTypes from 'prop-types';

const Education = ({ educationList }) => {
     return (
          <section className="mb-2">
               {/* Section Heading */}
               <h5 className="text-xs font-semibold text-black border-b border-gray-300 pb-1">Education</h5>

               {/* Education List */}
               {educationList.length > 0 ? (
                    educationList.map((edu, index) => (
                         <div key={index} className="mb-2 pb-1 border-b border-gray-300 text-xs">
                              <div className="text-xs">
                                   {/* Degree/Title */}
                                   <h5 className="font-semibold text-black">{edu.title}</h5>

                                   {/* Institution and Location */}
                                   <p className="text-gray-700">
                                        {edu.organization}, {edu.location}
                                   </p>

                                   {/* Dates of Study */}
                                   <p className="text-gray-600 font-semibold leading-snug">
                                        {edu.startDate} - {edu.endDate || "Present"}
                                   </p>

                                   {/* Description */}
                                   {edu.description && (
                                        <div
                                             className="text-black font-normal leading-snug mt-1 cust custom"
                                             dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(edu.description) }}
                                        />
                                   )}
                              </div>
                         </div>
                    ))
               ) : (
                    <p className="text-xs text-black font-semibold">No education listed</p>
               )}
          </section>
     )
}


Education.propTypes = {
     educationList: PropTypes.arrayOf(
          PropTypes.shape({
               id: PropTypes.string.isRequired,
               title: PropTypes.string,
               location: PropTypes.string,
               organization: PropTypes.string,
               startDate: PropTypes.string,
               endDate: PropTypes.string,
               description: PropTypes.string,
          })
     ).isRequired,
};

export default Education