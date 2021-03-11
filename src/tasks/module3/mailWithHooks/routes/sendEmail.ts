import express, { Request, Response, Router } from "express";
import nodemailer from "nodemailer";
import { output, secondOutput } from "../outputs";
const router: Router = express.Router();

type MailOptionsType = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

const mailOptions: MailOptionsType = {
  from: "nodemailer546@gmail.com",
  to: "jandrzejewski@vp.pl",
  subject: "First email",
  html: output,
};

const sendMail = (mailParams: MailOptionsType) => {
  const mailTransporter: nodemailer.Transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 25,
    auth: {
      user: "nodemailer546@gmail.com",
      // change Password to Gmail Password
      pass: "*********",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  mailTransporter.sendMail(mailParams, (err: Error | null) => {
    if (err) {
      return err;
    } else {
      return `Mail has been send`;
    }
  });
};

router.route("/email").get((req: Request<void>, res: Response<string>) => {
  try {
    sendMail(mailOptions);
  } catch (error) {
    if (error) {
      throw new Error(error);
    }
  }
  res.send("The first e-mail has been sent");
});

router.route("/secondMail").get((req: Request<void>, res: Response<string>) => {
  mailOptions.html = secondOutput;
  mailOptions.subject = "Second Email";
  try {
    sendMail(mailOptions);
  } catch (error) {
    throw new Error(error);
  }
  res.send("The second e-mail has been sent");
});

export default router;
