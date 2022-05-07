const {Config} = require('./index');
let {createTransport} = require('nodemailer');
let correo = `fredy.luis.wolf@gmail.com`;

class NotificacionMailer {
    async enviarCorreo(subject,html) {
        const transporter = createTransport({
            //host: 'smtp.ethereal.email',
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: correo,
                pass: Config.pass_mailer
            }
        });
        try {
            let option = {
                from:`Administrador`,
                to: correo,
                subject,
                html
            }
            const response = await transporter.sendMail(option);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new NotificacionMailer();



