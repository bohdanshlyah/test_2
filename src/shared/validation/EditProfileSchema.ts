import * as z from 'zod';

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/bmp',
  'image/gif',
  'image/tiff'
];

export const validationSchema = z.object({
  photo: z
    .any()
    .refine(file => {
      if (file[0]) {
        return file[0].size <= MAX_FILE_SIZE;
      } else {
        return true;
      }
    }, 'The file size must not exceed 2 MB.')
    .refine(file => {
      if (file[0]) {
        return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
      } else {
        return true;
      }
    }, 'You may use JPEG, TIFF, PNG, BMP or GIF format only.')
    .optional(),
  firstName: z
    .string()
    .min(2, { message: 'Please enter your name' })
    .max(45, { message: 'Name cannot exceed 45 characters' })
    .regex(/^[A-Za-z]/, { message: 'Please start with a latin letter' })
    .regex(/^[a-zA-Z][a-zA-Z -]*$/, {
      message: 'Please use only letters, spaces and hyphens in your name'
    }),
  lastName: z
    .string()
    .min(2, { message: 'Please enter your last name' })
    .max(45, { message: 'Last name cannot exceed 45 characters' })
    .regex(/^[A-Za-z]/, { message: 'Please start with a latin letter' })
    .regex(/^[a-zA-Z][a-zA-Z -]*$/, {
      message: 'Please use only letters, spaces and hyphens in your name'
    }),
  email: z.string().email({ message: 'Please enter a valid e-mail' }),
  phoneNumber: z
    .string()
    .min(9, { message: 'Please enter a valid phone number' })
    .optional()
    .or(z.literal('')),
  telegramUsername: z
    .string()
    .min(5, { message: 'Please enter a valid TG username' })
    .max(32, { message: 'TG username cannot exceed 32 characters' })
    .regex(/^@[a-zA-Z0-9_.]+$/, {
      message: 'Please start with @ and use letters, numbers, underscores, periods'
    })
    .optional()
    .or(z.literal(''))
});

export type ValidationSchema = z.infer<typeof validationSchema>;
