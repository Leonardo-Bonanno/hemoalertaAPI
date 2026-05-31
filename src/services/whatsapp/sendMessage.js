import axios from 'axios';
import { whatsappConfig } from '../../config/whatsapp.js';

// No futuro talvez seja necessário montar um template.js e um webhook.js

async function sendWhatsAppMessage(
  to,
  hemocentro,
  sanguineo,
  endereco,
  horario
  ) {
    try {
      const url =
        `${whatsappConfig.baseUrl}/` +
        `${whatsappConfig.apiVersion}/` +
        `${whatsappConfig.phoneNumberId}/messages`;

    const response = await axios.post(
      url,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: 'hello_world',
          language: {
            code: 'en_US',
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${whatsappConfig.token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      'Erro ao enviar mensagem:',
      error.response?.data || error.message
    );

    throw error;
  }
}

  export default {
    sendWhatsAppMessage
  }