const router = require("express").Router();
var nodemailer = require('nodemailer');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { withDB } = require("../dbConnect");



// send password link
router.post("/", async (req, res) => {

    const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;
    const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
    const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
    const EXPIRE_TIME = process.env.JWT_EXPIRES_IN;

    try {
        const emailSchema = Joi.object({
            email: Joi.string().email().required().label("Email")
        });
        const { error } = emailSchema.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        withDB(async (db) => {
            const { email } = req.body;
            let user = await db.collection("users").findOne({ email: email })
            // console.log(user)
            if (!user) {
                return res.status(409).send({ message: "User not found" })
            }
            const token = jwt.sign({ _id: user._id }, PRIVATE_KEY, { expiresIn: EXPIRE_TIME })
            // console.log( { GMAIL_ADDRESS }, { GMAIL_PASSWORD } )
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: GMAIL_ADDRESS,
                    pass: GMAIL_PASSWORD
                }
            });

            var mailOptions = {
                from: GMAIL_ADDRESS,
                to: email,
                subject: 'Reset Password Link',
                text: `http://localhost:3000/api/reset-password/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ Status: "Success" })
                }
            });

        })

    } catch (error) {
        res.send({ error: true, message: "Error sending password reset link" })
    }
})


module.exports = router;