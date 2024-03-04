import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer"
export const sendEmail = async({
    userId, email, emailType
}:any)=>{
    try {
        let emailSubject = "";
        let emailBody= "";
    
        // Create hash token
        const hashedToken = await bcryptjs.hash(userId.toString(),10);
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
            emailSubject = 'Verify your email';
            emailBody= `<p>Please Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to verify your account.</p> <p>Or Copy paste this url: "${process.env.DOMAIN}/verifyemail?token=${hashedToken}"</p>`;
        }
        else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
            emailSubject = 'Reset your password';
            emailBody= `<p>Please Reset your password by Clicking <a href="${process.env.DOMAIN}/forgot-password?token=${hashedToken}">Here</a> to verify your account.</p> <p>Or Copy paste this url: "${process.env.DOMAIN}/forgot-password?token=${hashedToken}"</p>`;
        }

   
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 2525,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
            }
          });

        const mailOptions = {
            from:'PalRishikesh@m.com',
            to:email,
            subject: emailSubject,
            html: emailBody

        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}