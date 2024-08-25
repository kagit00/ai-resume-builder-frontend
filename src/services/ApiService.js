import axios from 'axios';
import { toast } from 'react-toastify';
import { logOut, setJwtToken } from '@/utils/AuthUtils';

const API_BASE_URL = 'http://localhost:8080';

export const fetchUserDetailsFromToken = async (accessToken) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/auth/current-user`, {
               headers: { 'Authorization': `Bearer ${accessToken}` },
               withCredentials: true,
          });
          return response.data;
     } catch (error) {
          console.error('Error fetching user details:', error);
          toast.error('An error occurred while fetching user details.');
          // Returning an error message or rethrowing the error can be handled as needed.
          if (error.response) {
               return { error: `Failed to fetch user details: ${error.response.data.message}` };
          } else if (error.request) {
               return { error: 'Failed to fetch user details: No response from the server.' };
          } else {
               return { error: 'Failed to fetch user details: An unexpected error occurred.' };
          }
     }
};

export const getGenerateSuggestions = async (title, sectionType, accessToken) => {
     logOut()
     try {
          const response = await axios.post(`${API_BASE_URL}/resume/ai/suggestions`, null, {
               params: { title, sectionType },
               headers: { 'Authorization': `Bearer ${accessToken}` },
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
          toast.success('An error occurred while generating AI suggestions.', {
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
          setJwtToken(response.data.token);
          navigate('/user/dashboard');
          toast.success('An error occurred while generating AI suggestions.', {
               style: {
                    backgroundColor: '#18181b',
                    color: '#fff'
               },
          });
          return response;
     } catch (error) {
          console.error('Login failed:', error);
          toast.error('An error occurred while registering the user.', {
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