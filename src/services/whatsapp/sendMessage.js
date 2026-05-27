import axios from 'axios';
import { whatsappConfig } from '../../config/whatsapp.js';

// No futuro talvez seja necessário montar um template.js e um webhook.js

export async function sendWhatsAppMessage(
  to,
  hemocentro,
  sanguineo
  ) {
    try {
      const url =
        `${whatsappConfig.baseUrl}/` +
        `${whatsappConfig.apiVersion}/` +
        `${whatsappConfig.phoneNumberId}/messages`;

      const response = await axios.post(
        url,
        {
          messaging_product: "whatsapp",
          to,
          type: "template",
          template: {
            name: "alerta_doacao",
            language: {
              code: "en",
            },
            components: [
              {
                type: "body",
                parameters: [
                  {
                    parameter_name: "hemocentro",
                    type: "text",
                    text: hemocentro,
                  },
                  {
                    parameter_name: "sanguineo",
                    type: "text",
                    text: sanguineo,
                  },
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${whatsappConfig.token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        "Erro ao enviar mensagem:",
        error.response?.data || error.message,
      );

      throw error;
    }
  }