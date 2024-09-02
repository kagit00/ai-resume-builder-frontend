import axios from 'axios';
import { toast } from 'react-toastify';
import { logOutForced, setJwtToken, getJwtToken } from '@/utils/AuthUtils';

const API_BASE_URL = 'http://localhost:8080';
const jwtToken = getJwtToken()

export const fetchUserDetailsFromToken = async () => {
     logOutForced()
     try {
          const response = await axios.get(`${API_BASE_URL}/auth/current-user`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success(`Welcome to Dashboard, ${response.data.name}`, {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          toast.error('Something went wrong while logging you in.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          throw new Error(error.response?.data?.message || 'An error occurred');
     }
};

export const getGenerateSuggestions = async (title, sectionType) => {
     logOutForced()
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/ai/suggestions`, null, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               params: { title, sectionType },
               withCredentials: !jwtToken,
          });
          toast.success('AI Suggestion Successfully Generated', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          toast.error('An error occurred while generating AI suggestions.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
};

export const registerUser = async (formData) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/users`, formData);
          toast.success('User registered successfully.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          toast.error('An error occurred while registering the user.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
};

export const doJWtLogIn = async (creds) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/auth/token`, creds);
          setJwtToken(response.data)
          window.location.href = '/user/dashboard';
          toast.success('Successfully logged in.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response;
     } catch (error) {
          toast.error('An error occurred while logging in the user.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const createResume = async (resume, userId) => {
     logOutForced()
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${userId}`, resume, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Resume initiated successfully.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          toast.error('Error while creating resume', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const getResumeListByUserId = async (userId) => {
     logOutForced()
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/user/${userId}`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          return response.data;
     } catch (error) {
          toast.error('Error while fetching resumes', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const deleteResume = async (resumeId) => {
     logOutForced()
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Resume deleted successfully.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while deleting resume', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const saveSummary = async (summary, resumeId) => {
     logOutForced()
     try {
          await axios.post(`${API_BASE_URL}/resume/${resumeId}/summary`, summary, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Summary saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while saving summary', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const getSummary = async (resumeId) => {
     logOutForced()
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/summary`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          return response.data;
     } catch (error) {
          toast.error('Error while fetching summary', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const getEducations = async (resumeId) => {
     logOutForced()
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/education`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          return response.data;
     } catch (error) {
          toast.error('Error while fetching educations', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const getExperiences = async (resumeId) => {
     logOutForced()
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/experience`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          return response.data;
     } catch (error) {
          toast.error('Error while fetching experiences', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const getProjects = async (resumeId) => {
     logOutForced()
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/project`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          return response.data;
     } catch (error) {
          toast.error('Error while fetching projects', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const getLanguages = async (resumeId) => {
     logOutForced()
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/language`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          return response.data;
     } catch (error) {
          toast.error('Error while fetching projects', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const saveEducation = async (education, resumeId) => {
     logOutForced()
     const sectionType = 'EDUCATION'
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/${sectionType}`, education, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Education details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data
     } catch (error) {
          toast.error('Error while saving education details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const updateEducation = async (education, resumeSectionId, resumeId) => {
     logOutForced()
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, education, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Education details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while saving education details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const deleteEducation = async (resumeId, resumeSectionId) => {
     logOutForced()
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
               },
               withCredentials: !jwtToken,
          });
          toast.success('Education details deleted.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while deleting education details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const updateExperience = async (experience, resumeSectionId, resumeId) => {
     logOutForced()
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, experience, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Experience details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while saving experience details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const deleteExperience = async (resumeId, resumeSectionId) => {
     logOutForced()
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
               },
               withCredentials: !jwtToken,
          });
          toast.success('Experience details deleted.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while deleting experience details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const updateProject = async (proj, resumeSectionId, resumeId) => {
     logOutForced()
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, proj, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Project details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while updating project details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const deleteProject = async (resumeId, resumeSectionId) => {
     logOutForced()
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
               },
               withCredentials: !jwtToken,
          });
          toast.success('Project details deleted.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while deleting project details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const saveExperience = async (experience, resumeId) => {
     logOutForced()
     const sectionType = 'EXPERIENCE'
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/${sectionType}`, experience, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Experience details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          toast.error('Error while saving experience details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const saveProject = async (project, resumeId) => {
     logOutForced()
     const sectionType = 'PROJECT'
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/${sectionType}`, project, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Project details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          toast.error('Error while saving project details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const saveLanguage = async (resumeId, language) => {
     logOutForced()
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/language`, language, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Language details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          toast.error('Error while saving language details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const updateLanguage = async (resumeId, languageId, language) => {
     logOutForced()
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/language/${languageId}`, language, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Language details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while updating language details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const deleteLanguage = async (resumeId, languageId) => {
     logOutForced()
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/language/${languageId}`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Language details deleted.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while deleting language details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const updateSkills = async (skills, resumeId) => {
     logOutForced()
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/skills`, { 'skills': skills }, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Skills saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while saving skills', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const getSkills = async (resumeId) => {
     logOutForced()
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/skills`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          return response.data;
     } catch (error) {
          toast.error('Error while fetching skills', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const saveAdditionalDetails = async (additionalDetails, resumeId) => {
     logOutForced()
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/additional-details`, additionalDetails, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Additional details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          toast.error('Error while saving additional details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const getAdditionalDetails = async (resumeId) => {
     logOutForced()
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/additional-details`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          return response.data;
     } catch (error) {
          toast.error('Error while saving additional details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const updateAdditionalDetails = async (resumeId, additionalDetailsId, additionalDetails) => {
     logOutForced()
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/additional-details/${additionalDetailsId}`, additionalDetails, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Additional details saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while saving additional details', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const updateResumeStatus = async (resumeId) => {
     logOutForced()
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/status-update`, null, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Resume saved.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while saving resume', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const deleteSummary = async (resumeId) => {
     logOutForced()
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/summary`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
               },
               withCredentials: !jwtToken,
          });
          toast.success('Summary deleted.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while deleteing summary', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const updateSummary = async (summary, resumeId) => {
     logOutForced()
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/summary`, summary, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` }),
                    'Content-Type': 'application/json',
               },
               withCredentials: !jwtToken,
          });
          toast.success('Summary updated.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     } catch (error) {
          toast.error('Error while updating summary', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const doGoogleLogIn = async () => {
     window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
}