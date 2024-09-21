const Language = ({ languagesList }) => {
     return (
          <section className="mb-2">
               {/* Section Heading */}
               <h5 className="text-xs font-semibold text-gray-800 border-b border-gray-300 pb-1 tracking-wide">Languages</h5>

               {/* Languages List */}
               {languagesList.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                         {languagesList.map((lang, index) => (
                              <p key={index} className="text-xs text-gray-700 font-medium">
                                   <span className="font-semibold text-gray-900">{lang.name}:</span>
                                   <span className="ml-1">{lang.proficiencyLevel}</span>
                              </p>
                         ))}
                    </div>
               ) : (
                    <p className="text-xs text-gray-600 mt-1">No languages listed</p>
               )}
          </section>
     )
}

export default Language;