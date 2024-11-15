import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(1, 'First Name is required').max(50, 'First Name is too long'),
  lastName: z.string().min(1, 'Last Name is required').max(50, 'Last Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});
