import Contact from '../models/contactModel.js';
import { contactSchema } from '../validators/contactValidator.js';

// Get All Contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a Contact
export const createContact = async (req, res) => {
  try {
    const validatedData = contactSchema.parse(req.body); // Zod validation
    const contact = await Contact.create(validatedData);
    res.status(201).json(contact);
  } catch (error) {
    if (error.name === 'ZodError') {
      // Return Zod validation errors
      res.status(400).json({ message: error.errors.map((err) => err.message) });
    } else if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists!' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Update a Contact
export const updateContact = async (req, res) => {
  try {
    const validatedData = contactSchema.partial().parse(req.body); // Zod validation (partial schema)
    const contact = await Contact.findByIdAndUpdate(req.params.id, validatedData, { new: true });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found!' });
    }

    res.json(contact);
  } catch (error) {
    if (error.name === 'ZodError') {
      res.status(400).json({ message: error.errors.map((err) => err.message) });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Delete a Contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found!' });
    }

    res.json({ message: 'Contact deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
