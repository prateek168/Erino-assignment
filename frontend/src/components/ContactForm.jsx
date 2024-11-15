import   { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { createContact, updateContact } from "../services/ContactService";
import { validateForm } from "../utils/validate";

const ContactForm = ({ existingContact }) => {
  const navigate = useNavigate();
  const { id } = useParams();  
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });

  useEffect(() => {
    if (existingContact) {
      setContactData(existingContact);
    }
  }, [existingContact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(contactData);
    if (!isValid) {
     
      return;
    }
    try {
      if (id) {
        await updateContact(id, contactData);
      } else {
        await createContact(contactData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5">
        {id ? "Edit Contact" : "Add Contact"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={contactData.firstName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={contactData.lastName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={contactData.email}
            onChange={handleInputChange}
            type="email"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={contactData.phone}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={contactData.company}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={contactData.jobTitle}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {id ? "Update Contact" : "Add Contact"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
