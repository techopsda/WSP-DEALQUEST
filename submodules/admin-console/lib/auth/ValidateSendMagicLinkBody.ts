import { z } from 'zod';

export const ValidateSendMagicLinkBody = z.object({
  host: z.string().optional(),
  redirectUrl: z.string().optional(),
  email: z.string().email()
});
