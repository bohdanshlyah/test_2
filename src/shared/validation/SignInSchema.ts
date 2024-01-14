import * as z from 'zod';

export const loginValidationSchema = z.object({
  email: z.string().nonempty('Email is required').email('Email format is not valid'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, { message: 'The password should consist of at least 6 characters' })
});

export type ValidationSchema = z.infer<typeof loginValidationSchema>;
