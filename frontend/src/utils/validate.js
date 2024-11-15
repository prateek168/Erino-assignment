// src/utils/validate.js
export const validateForm = (data) => {
  if (!data.firstName || !data.lastName || !data.email || !data.phone) {
    alert('All fields are required');
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(data.email)) {
    alert('Invalid email format');
    return false;
  }
  if (!/\d{10}/.test(data.phone)) {
    alert('Invalid phone number');
    return false;
  }
  return true;
};
