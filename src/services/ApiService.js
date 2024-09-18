import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doNormalLogOut, getJwtToken, logUserOut, setExpiryForJwtToken, setJwtToken, setAuthTypeForOAuth2 } from '@/utils/AuthUtils';

const API_BASE_URL = 'https://resumed-433110.uc.r.appspot.com'
const jWtToken = getJwtToken()
const headers = jWtToken ? { Authorization: `Bearer ${jWtToken}`, 'Content-Type': 'application/json', } : { 'Content-Type': 'application/json', };

export const fetchUserDetailsFromToken = async () => {
     try {
          const response = await axios.get(`${API_BASE_URL}/auth/current-user`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          window.location.href = "/user/dashboarderror"
     }
};

export const getGenerateSuggestions = async (title, sectionType) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/ai/suggestions`, null, {
               headers: { ...headers },
               params: { title, sectionType },
               withCredentials: !jWtToken,
          });
          toast.success('AI Suggestion Successfully Generated', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('An error occurred while generating AI suggestions.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
};

export const registerUser = async (formData) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/user`, formData);
          return response.data;
     } catch (error) {
          throw error;
     }
};

export const doJWtLogIn = async (creds) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/auth/log-in`, creds);
          if (response.status === 200) {
               setJwtToken(response.data.token)
               setExpiryForJwtToken(response.data.expiry)
               window.location.href = "/user/dashboard"
          }
     } catch (error) {
          throw error;
     }
}

export const createResume = async (resume, userId) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${userId}`, resume, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Resume initiated successfully.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while creating resume', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const getResumeListByUserId = async (userId, status) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/user/${userId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          if (status === 'completed')
               return response.data?.completed_resumes;
          else
               return response.data?.pending_resumes;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while fetching resumes', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const deleteResume = async (resumeId) => {
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Resume deleted successfully.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while deleting resume', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const saveSummary = async (summary, resumeId) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/summary`, summary, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Summary saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
          return response.data
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving summary', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const getSummary = async (resumeId) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/summary`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while fetching summary', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const getEducations = async (resumeId) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/education`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while fetching educations', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const getExperiences = async (resumeId) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/experience`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while fetching experiences', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const getProjects = async (resumeId) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/project`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while fetching projects', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const getLanguages = async (resumeId) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/language`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while fetching projects', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const saveEducation = async (education, resumeId) => {
     const sectionType = 'EDUCATION'
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/${sectionType}`, education, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Education details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
          return response.data
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving education details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const updateEducation = async (education, resumeSectionId, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, education, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Education details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving education details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const deleteEducation = async (resumeId, resumeSectionId) => {

     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Education details deleted.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while deleting education details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const updateExperience = async (experience, resumeSectionId, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, experience, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Experience details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving experience details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const deleteExperience = async (resumeId, resumeSectionId) => {
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Experience details deleted.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while deleting experience details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const updateProject = async (proj, resumeSectionId, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, proj, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Project details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while updating project details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const deleteProject = async (resumeId, resumeSectionId) => {
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Project details deleted.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while deleting project details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const saveExperience = async (experience, resumeId) => {
     const sectionType = 'EXPERIENCE'
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/${sectionType}`, experience, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Experience details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving experience details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const saveProject = async (project, resumeId) => {
     const sectionType = 'PROJECT'
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/${sectionType}`, project, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Project details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving project details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const saveLanguage = async (resumeId, language) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/language`, language, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Language details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving language details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const updateLanguage = async (resumeId, languageId, language) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/language/${languageId}`, language, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Language details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while updating language details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const deleteLanguage = async (resumeId, languageId) => {
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/language/${languageId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Language details deleted.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while deleting language details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const updateSkills = async (skills, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/skills`, { 'skills': skills }, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Skills saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving skills', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const getSkills = async (resumeId) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/skills`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while fetching skills', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const saveAdditionalDetails = async (additionalDetails, resumeId) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/additional-details`, additionalDetails, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Additional details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving additional details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const getAdditionalDetails = async (resumeId) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/${resumeId}/additional-details`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving additional details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const updateAdditionalDetails = async (resumeId, additionalDetailsId, additionalDetails) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/additional-details/${additionalDetailsId}`, additionalDetails, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Additional details saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving additional details', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const updateResumeStatus = async (resumeId) => {

     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/status-update`, null, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Resume saved.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while saving resume', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const deleteSummary = async (resumeId) => {
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/summary`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Summary deleted.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while deleteing summary', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const updateSummary = async (summary, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/summary`, summary, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Summary updated.', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while updating summary', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const doGoogleLogIn = () => {
     setAuthTypeForOAuth2()
     window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
}

export const doLogOut = async () => {
     try {
          await axios.post(`${API_BASE_URL}/auth/log-out`, null, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while logging you out', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const sendEmail = async (name, isFreeUser) => {
     try {
          await axios.get(`${API_BASE_URL}/resume/completed/send-email`, {
               headers: { ...headers },
               params: { name, isFreeUser },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
     }
};

export const updateNotificationEnabled = async (userId, isNotificationEnabled) => {
     const payload = JSON.stringify({ isNotificationEnabled, userId })
     try {
          await axios.put(`${API_BASE_URL}/user/notification`, payload, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          doNormalLogOut()
     }
};

export const deleteAccount = async (userId) => {
     try {
          await axios.delete(`${API_BASE_URL}/user/${userId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          doNormalLogOut()
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while deleting account', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const getClientTokenForPayment = async (userId) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/user/subscription/client-token`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while generating client token', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const doSubscribe = async (paymentMethodNonce, amount, userId) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/user/subscription/checkout/${userId}`, {
               paymentMethodNonce,
               amount,
          }, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while subscribing to premium', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const cancelPremiumMembership = async (userId) => {
     try {
          const response = await axios.put(`${API_BASE_URL}/user/cancel-membership/${userId}`, null, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          toast.success('Premium Membership Cancelled Successfully', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
          return response;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          toast.error('Error while cancelling premium', {
               style: {
                    backgroundColor: '#1F2937',
                    color: '#fff'
               },
          });
     }
}

export const analyzeResume = async (formData) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/analysis/upload-and-analyze`, formData, {
               headers: { ...(jWtToken && { Authorization: `Bearer ${jWtToken}` }), 'Content-Type': 'multipart/form-data', },
               withCredentials: !jWtToken,
          });
          return response.data
     } catch (err) {
          if (err.response && err.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
     }
}
