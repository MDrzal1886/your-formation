import nodemailer from 'nodemailer';

export const getTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    },
    tls: { rejectUnauthorized: false }
  });

  return transporter;
};

export const mailToSend = (email: string, token: string) => {
  const signupMail = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Welcome in Your Formation',
    html: `
      <div>
        <h1>Hello</h1>
        <p>To complete your registration and set password please click link below</p>
        <a href="${process.env.NEXTAUTH_URL}/set-password/${token}" target="_blank">Set Password</a>
        <p>Have fun with Your formations</p>
      </div>
    `
  };

  return signupMail;
};
