import { z } from 'zod'

const requiredSelect = z.string().min(1, 'Please select an option')

export const leadSchema = z.object({
  leadName: z.string().trim().min(2, 'Name must contain at least 2 characters').max(80, 'Name is too long'),
  email: z.email('Enter a valid email address'),
  contactNo: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  leadTypeId: requiredSelect,
  companyId: requiredSelect,
  sourceId: requiredSelect,
  industryId: requiredSelect,
  budget: z.string().regex(/^\d*$/, 'Budget must contain numbers only'),
  address: z.string().trim().min(5, 'Please enter a complete address').max(200, 'Address is too long'),
  stateId: requiredSelect,
  districtId: requiredSelect,
  pincode: z.string().trim().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  description: z.string().trim().min(20, 'Tell us a little more about your project').max(1000, 'Keep the brief under 1000 characters'),
})
