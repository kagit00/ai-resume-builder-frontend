import { useState, useEffect } from 'react';
import { updateSkills, getSkills } from '@/services/ApiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const skillOptions = [
  'JavaScript', 'Python', 'Java', 'C#', 'C++', 'TypeScript', 'HTML', 'CSS', 'React', 'Angular',
  'Vue.js', 'Node.js', 'Express', 'MongoDB', 'SQL', 'PostgreSQL', 'MySQL', 'Docker', 'Kubernetes',
  'AWS', 'Azure', 'GCP', 'GraphQL', 'REST', 'Spring Boot', 'Django', 'Flask', 'Ruby on Rails',
  'PHP', 'Swift', 'Objective-C', 'Go', 'Rust', 'Scala', 'Kotlin', 'Sass', 'Less', 'Tailwind CSS',
  'Bootstrap', 'Materialize', 'JUnit', 'Selenium', 'Jest', 'Mocha', 'Chai', 'Webpack', 'Babel',
  'Git', 'GitHub', 'GitLab', 'Jira', 'Confluence', 'Slack', 'Teams', 'Figma', 'Sketch', 'Adobe XD'
];

const SkillsDropdown = ({ handleSkillsUpdate, selectedSkills, setSelectedSkills, resume }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Add search query state

  useEffect(() => {
    const fetchSkills = () => {
      if (resume.id) {
        getResumeSkills(resume.id);
      }
    };

    fetchSkills();
  }, [resume.id]);

  const getResumeSkills = async () => {
    try {
      setIsLoading(true);
      const skills = await getSkills(resume.id);
      setSelectedSkills(skills);
    } catch (error) {
      toast.error(error?.response?.data?.errorMsg, {
        style: {
          backgroundColor: '#1F2937',
          color: '#fff'
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSkillSelect = (skill) => {
    const newSelectedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(item => item !== skill)
      : [...selectedSkills, skill];

    handleSkillsUpdate(newSelectedSkills);
  };

  const handleAddSkills = async () => {
    try {
      setIsLoading(true);
      const skillsStr = selectedSkills.join(",");
      await updateSkills(skillsStr, resume.id);
      setDropdownOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.errorMsg, {
        style: {
          backgroundColor: '#1F2937',
          color: '#fff'
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSkills = () => {
    handleSkillsUpdate([]);
  };

  // Filter skills based on search query
  const filteredSkills = skillOptions.filter(skill =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm md:text-base mb-2" htmlFor="skills">
          Skills
        </label>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-transparent border-b-2 text-gray-100 w-full py-2 px-3 md:px-4 leading-tight focus:outline-none transition duration-200 ease-in-out"
          >
            {selectedSkills.length > 0 ? 'Select Skills' : 'Select Skills'}
          </button>
          {dropdownOpen && (
            <div className="absolute bg-gray-800 rounded-lg mt-1 w-full z-10">
              {/* Search Input */}
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none"
                />
              </div>
              <div className="max-h-60 overflow-y-auto hidden-scrollbar">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer p-2 hover:bg-gray-600 ${selectedSkills.includes(skill) ? 'bg-gray-600' : ''}`}
                      onClick={() => handleSkillSelect(skill)}
                    >
                      {skill}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-400">No skills found</div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedSkills.map((skill, index) => (
            <span key={index} className="bg-gray-600 text-gray-100 text-xs px-2 py-1 rounded-full">{skill}</span>
          ))}
        </div>

        <button
          onClick={handleAddSkills}
          disabled={selectedSkills.length === 0}
          className={`text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mt-4
    ${selectedSkills.length === 0 ? 'opacity-50 cursor-not-allowed bg-gray-600' : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600'}`}
        >
          Add
        </button>

        <button
          onClick={handleResetSkills}
          className="text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-2"
        >
          Reset
        </button>

      </div>
    </>
  );
};

SkillsDropdown.propTypes = {
  handleSkillsUpdate: PropTypes.func.isRequired,
  selectedSkills: PropTypes.array.isRequired,
  setSelectedSkills: PropTypes.func.isRequired,
  resume: PropTypes.shape({
    id: PropTypes.string.isRequired, 
  }).isRequired,
};

export default SkillsDropdown;
