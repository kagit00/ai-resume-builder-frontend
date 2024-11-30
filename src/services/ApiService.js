import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doNormalLogOut, getJwtToken, logUserOut, setExpiryForJwtToken, setJwtToken, setAuthTypeForOAuth2 } from '@/utils/AuthUtils';

const API_BASE_URL = 'https://ai-resume-builder-443308.uc.r.appspot.com'
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
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
};

export const registerUser = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/user`, formData);
    return response.data;
};


export const doJWtLogIn = async (creds) => {
    const response = await axios.post(`${API_BASE_URL}/auth/log-in`, creds);
    if (response.status === 200) {
        setJwtToken(response.data.token);
        setExpiryForJwtToken(response.data.expiry);
        window.location.href = "/user/dashboard";
    }
};


export const createResume = async (resume, userId) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${userId}`, resume, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
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
          throw error
     }
}

export const deleteResume = async (resumeId) => {
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const saveSummary = async (summary, resumeId) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/summary`, summary, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
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
          throw error
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
          throw error
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
          throw error
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
          throw error
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
          throw error
     }
}

export const saveEducation = async (education, resumeId) => {
     const sectionType = 'EDUCATION'
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/${sectionType}`, education, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const updateEducation = async (education, resumeSectionId, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, education, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const deleteEducation = async (resumeId, resumeSectionId) => {

     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const updateExperience = async (experience, resumeSectionId, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, experience, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const deleteExperience = async (resumeId, resumeSectionId) => {
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
         throw error
     }
}

export const updateProject = async (proj, resumeSectionId, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, proj, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const deleteProject = async (resumeId, resumeSectionId) => {
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/${resumeSectionId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const saveExperience = async (experience, resumeId) => {
     const sectionType = 'EXPERIENCE'
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/${sectionType}`, experience, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const saveProject = async (project, resumeId) => {
     const sectionType = 'PROJECT'
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/${sectionType}`, project, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const saveLanguage = async (resumeId, language) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/language`, language, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const updateLanguage = async (resumeId, languageId, language) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/language/${languageId}`, language, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const deleteLanguage = async (resumeId, languageId) => {
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}/language/${languageId}`, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const updateSkills = async (skills, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/skills`, { 'skills': skills }, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
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
          throw error
     }
}

export const saveAdditionalDetails = async (additionalDetails, resumeId) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${resumeId}/additional-details`, additionalDetails, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response.data;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
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
          throw error
     }
}

export const updateAdditionalDetails = async (resumeId, additionalDetailsId, additionalDetails) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/additional-details/${additionalDetailsId}`, additionalDetails, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const updateResumeStatus = async (resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/status-update`, null, {
               headers: { ...headers },
               withCredentials: !jWtToken,
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
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
     }
}

export const updateSummary = async (summary, resumeId) => {
     try {
          await axios.put(`${API_BASE_URL}/resume/${resumeId}/summary`, summary, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
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
          throw error
     }
}

export const sendEmail = async (username, name, isFreeUser) => {
     try {
          await axios.get(`${API_BASE_URL}/resume/completed/send-email`, {
               headers: { ...headers },
               params: { username, name, isFreeUser },
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
          throw error
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
         throw error
     }
}

export const getClientTokenForPayment = async () => {
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
          throw error
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
          throw error
     }
}

export const cancelPremiumMembership = async (userId) => {
     try {
          const response = await axios.put(`${API_BASE_URL}/user/cancel-membership/${userId}`, null, {
               headers: { ...headers },
               withCredentials: !jWtToken,
          });
          return response;
     } catch (error) {
          if (error.response && error.response.data.status === 'UNAUTHORIZED') {
               logUserOut();
               return;
          }
          throw error
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
          throw err
     }
}

export const changePassword = async (currentPassword, newPassword, confirmPassword, userId) => {
    await axios.put(`${API_BASE_URL}/user/change-password`, { currentPassword, newPassword, confirmPassword, userId }, {
        headers: { ...headers },
        withCredentials: !jWtToken,
    });
};


export const checkServerStatus = async () => {
    await axios.get(`${API_BASE_URL}/heartbeat`);
};
