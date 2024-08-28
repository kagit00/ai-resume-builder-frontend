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
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
               },
               withCredentials: true,
          });
          toast.success(`Welcome to your dashboard, ${response.data.name}`, {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          console.error('Error fetching user details:', error);
          toast.error('Something went wrong while logging you in.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
};

export const getGenerateSuggestions = async (title, sectionType) => {
     logOutForced()
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/ai/suggestions`, null, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
               },
               params: { title, sectionType },
               withCredentials: true,
          });
          toast.success('AI Suggestion Successfully Generated', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          console.error('Error generating details:', error);
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
          console.log('User signed up successfully:', response.data);
          toast.success('User registered successfully.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response.data;
     } catch (error) {
          console.error('There was an error signing up:', error);
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
          console.log('User logged in successfully:', response.data);
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
          console.error('Login failed:', error);
          toast.error('An error occurred while logging in the user.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
     }
}

export const createResume = async (resume, userId) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/${userId}`, resume, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
               },
               withCredentials: true,
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
     try {
          const response = await axios.get(`${API_BASE_URL}/resume/user/${userId}`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
               },
               withCredentials: true,
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
     try {
          await axios.delete(`${API_BASE_URL}/resume/${resumeId}`, {
               headers: {
                    ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
               },
               withCredentials: true,
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

export const doGoogleLogIn = async () => {
     window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
}