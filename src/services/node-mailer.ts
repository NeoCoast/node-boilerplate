import nodemailer from 'nodemailer';

interface EmailOptions {
  to: String,
  subject: String,
  text: String,
  html: String,
}

const sendMail = async ({
  to,
  subject,
  text,
  html
}: EmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Reemplaza esto con tu servidor SMTP
      port: 465, // El puerto del servidor SMTP, generalmente 587, 465 o 2525
      secure: true, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL, // Crea una variable de entorno para tu correo electrónico
        pass: process.env.EMAIL_PASSWORD, // Crear una variable de entorno para tu contraseña
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    };
  } catch (error) {
    throw error;
  }
};

export default sendMail;
