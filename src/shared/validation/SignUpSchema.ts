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

export const validationSchema = z
  .object({
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
      .or(z.literal('')),
    password: z
      .string()
      .min(6, { message: 'Please enter a password' })
      .max(255, { message: 'Password cannot exceed 225 characters' })
      .regex(/[a-zA-Z\d]/, { message: 'Please use latin letters, digits, characters and spaces' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' })
  })
  .superRefine(({ firstName, lastName, password, email, phoneNumber }, refinementContext) => {
    if (
      (password.includes(firstName) && firstName !== '') ||
      (password.includes(lastName) && lastName !== '')
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should not contain first or last name from the previous field',
        path: ['password']
      });
    }

    if (
      (password.includes(email) && email !== '') ||
      (phoneNumber && phoneNumber !== '' && password.includes(phoneNumber))
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should not contain email or phone number from the previous field',
        path: ['password']
      });
    }

    return refinementContext;
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const regexUppercase = /[A-Z]/;
    const regexLowercase = /[a-z]/;
    const regexNumber = /\d/;

    if (!regexUppercase.test(password)) {
      return checkPassComplexity.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should contain upper case',
        path: ['password']
      });
    }

    if (!regexLowercase.test(password)) {
      return checkPassComplexity.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should contain lower case',
        path: ['password']
      });
    }

    if (!regexNumber.test(password)) {
      return checkPassComplexity.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should contain digit',
        path: ['password']
      });
    }

    return checkPassComplexity;
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match"
  });

export type ValidationSchema = z.infer<typeof validationSchema>;
