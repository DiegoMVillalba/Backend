const nodemailer = require('nodemailer');
const config = require('../config/index.js');
const dotenv = require('dotenv');
dotenv.config()

async function mailing(mail, subject, html) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "tonyhaa@gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.MAIL_PASS 
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: await mail || process.env.MAIL_TO,
        subject: await subject,
        html: await html,
    });

    console.log(info);
}

module.exports = mailing