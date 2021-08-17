import nodemailer from 'nodemailer';
import express from 'express';
const router = express.Router();



router.post( '/contact', (req, res) => {
    const userData = req.body
    
    const contactEmail = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: "api.mernstack@gmail.com",
        pass: "Kamal@786",
      },
    });
    
    contactEmail.verify((error) => {
      if (error) {
        console.log(error);
      }
    });

    const mail = {
        from: 'api.mernstack@gmail.com',
        to: "api.mernstack@gmail.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${userData.fullname}</p>
               <p>Phone: ${userData.phone}</p>
               <p>Email: ${userData.email}</p>
               <p>Message: ${userData.msg}</p>`,
      };

      contactEmail.sendMail(mail, (error) => {
        if (error) {
          res.json({ message: "Unable to send Message Please Try Again" });
        } else {
          res.json({ message: "Message Sent Successfully" });
        }
      });
})

export default router