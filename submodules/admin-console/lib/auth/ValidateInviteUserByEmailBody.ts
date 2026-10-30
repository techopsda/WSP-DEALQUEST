import z from 'zod';

export const ValidateInviteUserByEmailBody = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  redirectUrl: z.string().optional(),
  host: z.string().optional()
});
