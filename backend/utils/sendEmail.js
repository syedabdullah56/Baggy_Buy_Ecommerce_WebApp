const nodemailer = require('nodemailer');

// Create a test account and configure the transporter
const sendEmail = async (options) => {
  
    // Create an Ethereal test account
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host:process.env.SMTP_MAILTRAP_HOST,
      port:process.env.SMTP_MAILTRAP_PORT, 
      secure:true, // true for 465, false for other ports
      auth: {
        user:process.env.SMTP_MAILTRAP_USER, // Generated ethereal user
        pass:process.env.SMTP_MAILTRAP_PASSWORD, // Generated ethereal password
      },
    });
 
    // Define the email options
    const mailOptions = {
      from:process.env.SMTP_MAILTRAP_USER, // Sender address
      to: options.email, // List of recipients
      subject: options.subject, // Subject line
      text: options.message, // Plain text body
    };

    // Send the email
     await transporter.sendMail(mailOptions);


};
   
module.exports =sendEmail;
