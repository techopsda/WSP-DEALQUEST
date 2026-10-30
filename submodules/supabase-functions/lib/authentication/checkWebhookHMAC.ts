import { createHmac } from 'crypto';
import { NextRequest } from 'next/server';

export const checkWebhookHMAC = (request: NextRequest, endpoint: string) => {
  const webhookHMAC = request.headers.get('authorization');
  const webhookTimestamp = webhookHMAC?.split(':')[1];
  const currentTime = Date.now();
  const activeWebhookBaseUrl = process.env.BASE_WEBHOOK_URL ?? '';

  if (
    currentTime - parseInt(webhookTimestamp ?? '0') > 600000 ||
    currentTime - parseInt(webhookTimestamp ?? '0') < -600000
  ) {
    throw new Error('Invalid timestamp');
  }

  const message = [`${activeWebhookBaseUrl}${endpoint}`, webhookTimestamp];
  const apiHMAC = `HMAC:${webhookTimestamp}:${createHmac('sha256', process.env.SUPABASE_WEBHOOK_SECRET ?? '')
    .update(message.join(''))
    .digest('hex')}`;

  if (apiHMAC !== webhookHMAC) {
    throw new Error('Forbidden');
  }
};
