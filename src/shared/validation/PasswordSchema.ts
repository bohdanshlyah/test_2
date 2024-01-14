import * as z from 'zod';

export interface ValidationData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const userData = {
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'test@test.ua',
  phoneNumber: '0123456789',
  telegramUsername: '@MyTelegram',
  id: 'ID_123123'
};

export const passwordValidationSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Please enter a password' })
      .max(255, { message: 'Password cannot exceed 225 characters' })
      .regex(/[a-zA-Z\d]/, {
        message: 'Please use latin letters, digits, characters, and spaces'
      }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' })
  })
  .superRefine(({ password }, refinementContext) => {
    if (
      (password.includes(userData.firstName) && userData.firstName !== '') ||
      (password.includes(userData.lastName) && userData.lastName !== '')
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should not contain first or last name',
        path: ['password']
      });
    }

    if (
      (password.includes(userData.email) && userData.email !== '') ||
      (userData.phoneNumber &&
        userData.phoneNumber !== '' &&
        password.includes(userData.phoneNumber))
    ) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should not contain email or phone number',
        path: ['password']
      });
    }

    return refinementContext;
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match"
  });

export type PasswordValidationSchema = z.infer<typeof passwordValidationSchema>;
