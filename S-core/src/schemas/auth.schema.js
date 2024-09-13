import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
        invalid_type_error: 'Invalid username'
    }),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Invalid email'
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Invalid password'
    })
    .min(6, {
        message: 'The password must be at least 6 characters'
    }),
});

export const emailCodeSchema = z.object({
    code: z.string().regex(/^\d{6}$/, { message: 'The code must be exactly 6 digits' })
});

export const loginSchema = z.object({
    identification: z.string({
        required_error: 'Email or Username required',
    }).or(z.string().email({
        message: 'Invalid email'
    })),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Invalid password'
    })
    .min(6, {
        message: 'Your password must have 6 characters'
    })
});