import apiClient from './api';

// Fetch all contacts
export const getContacts = async () => {
  try {
    const response = await apiClient.get('/contacts');
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Create a new contact
export const createContact = async (contactData) => {
  try {
    const response = await apiClient.post('/contacts', contactData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error; // Propagate error to calling component if necessary
  }
};

// Update an existing contact
export const updateContact = async (id, contactData) => {
  try {
    const response = await apiClient.put(`/contacts/${id}`, contactData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    const response = await apiClient.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Centralized error handler
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    alert(`Error: ${data?.message || 'An error occurred'} (Status Code: ${status})`);
  } else {
    alert('Network Error: Unable to connect to the server.');
  }
};
