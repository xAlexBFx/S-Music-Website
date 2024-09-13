import { z } from 'zod';

export const profileSchema = z.object({
    username: z.string({
        invalid_type_error: 'Invalid username'
    }).optional(),
    role: z.string({
        invalid_type_error: 'Invalid username'
    }).optional(),
    description: z.string({
        invalid_type_error: 'Invalid username'
    }).optional(),
});

export const settingsSchema = z.object({
    settings: z.object({
        language: z.string({
            invalid_type_error: 'Invalid app language!'
        }).optional()
    }).strict()
});

