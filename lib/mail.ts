import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorCode = async (email: string, token: string) => {
  await resend.emails.send({
    from:'onboarding@resend.dev',
    to: '24cymine04@gmail.com',
    subject: 'Two Factor Authentication Code',
    html: `<p>hello your two factor code is: ${token}</p>`
    
  })
}

export const sendEmailResetPassword = async (email: string, token: string) => {
    const resetUrl = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "24cymine04@gmail.com",
        subject: "Reset Password Email",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your fking password</p>`
    });
};

export const sendEmailVerification = async (email: string, token: string) => {
    const confirmUrl = `http://localhost:3000/auth/verify-email?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "24cymine04@gmail.com",
        subject: "Confirmation Email",
        html: `<p>Click <a href="${confirmUrl}">here</a> to confirm your fking email</p>`
    });
};
