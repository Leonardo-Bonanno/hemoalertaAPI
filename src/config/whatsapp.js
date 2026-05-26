import 'dotenv/config'

export const whatsappConfig = {
  apiVersion: process.env.WHATSAPP_API_VERSION,
  token: process.env.WHATSAPP_TOKEN,
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  baseUrl: process.env.WHATSAPP_BASE_URL
};