import { transporterCreated } from "./transporterMail";
import dotenv from "dotenv";
dotenv.config();

const sendingMail = async (name: string, email: string, resetToken: string) => {
  const resetLink = `${process.env.FRONT}/reset-password/${resetToken}`;

  const mailOptions = {
    from: `${process.env.AUTH_USER}`,
    to: email,
    subject: "Redefinição de senha",
    text: "Clique no botão abaixo para redefinir sua senha",
    html: `   <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 30px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);">
          <h2 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">Redefinição de Senha</h2>
          <p style="font-size: 16px; color: #555555; line-height: 1.6; margin-bottom: 20px;">Olá, ${name}</p>
          <p style="font-size: 16px; color: #555555; line-height: 1.6; margin-bottom: 20px;">
        Recebemos uma solicitação para redefinir sua senha. Se você não fez essa solicitação, ignore este e-mail.
          </p>
        <p style="text-align: center; margin-bottom: 30px;">
          <a href="${resetLink}"
           style="display: inline-block; padding: 14px 24px; font-size: 16px; color: #ffffff; background-color: #3498db;
           text-decoration: none; border-radius: 8px; font-weight: 600; transition: background-color 0.3s ease;">
            Redefinir Senha
          </a>
        </p>
        <p style="font-size: 14px; color: #777777; line-height: 1.4; margin-top: 25px; border-top: 1px solid #eeeeee; padding-top: 20px;">
        Este link é válido por 15 minutos. Caso tenha problemas, solicite novamente a mudança de senha.
        </p>
        <p style="font-size: 14px; color: #777777; line-height: 1.4;">Atenciosamente, <br> Equipe Suporte</p>
    </div>`,
  };

  try {
    await transporterCreated.sendMail(mailOptions);
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error(`Error sendind e-mail: ${err.message}`);
    }
    throw new Error(`Unknown error caught: ${err.message}`);
  }
};

export { sendingMail };
