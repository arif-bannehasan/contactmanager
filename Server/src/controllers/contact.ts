import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
    }
});

export const getContact = async (req: Request, res: Response) => {
   res.status(200).send({status: "success"});
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
export const sendContact = async (req: Request, res: Response) => {
    await check("name", "Name cannot be blank").not().isEmpty().run(req);
    await check("email", "Email is not valid").isEmail().run(req);
    await check("message", "Message cannot be blank").not().isEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send({type:"errors", errors: errors.array()});
    }

    const mailOptions = {
        to: "your@email.com",
        from: `${req.body.name} <${req.body.email}>`,
        subject: "Contact Form",
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.status(400).send({type:"errors", msg:err.message});
        }
        return res.status(200).send({type:"success", msg:"Email has been sent successfully!"});
    });
};
