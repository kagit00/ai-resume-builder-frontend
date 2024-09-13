import React, { useState, useEffect } from 'react';
import { updateSkills, getSkills } from '@/services/ApiService';

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

  useEffect(() => {
    getResumeSkills(resume.id);
  }, []);

  const getResumeSkills = async () => {
    const skills = await getSkills(resume.id)
    setSelectedSkills(skills)
  }

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSkillSelect = (skill) => {
    const newSelectedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(item => item !== skill)
      : [...selectedSkills, skill];

    handleSkillsUpdate(newSelectedSkills);
  };

  const handleAddSkills = async () => {
    const skillsStr = selectedSkills.join(",")
    await updateSkills(skillsStr, resume.id);
    setDropdownOpen(false);
  };

  const handleResetSkills = () => {
    handleSkillsUpdate([]);
  };

  return (
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
            <div className="max-h-60 overflow-y-auto hidden-scrollbar">
              {skillOptions.map((skill, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-2 hover:bg-gray-600 ${selectedSkills.includes(skill) ? 'bg-gray-600' : ''}`}
                  onClick={() => handleSkillSelect(skill)}
                >
                  {skill}
                </div>
              ))}
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
        className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mt-4"
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
  );
};

export default SkillsDropdown;
