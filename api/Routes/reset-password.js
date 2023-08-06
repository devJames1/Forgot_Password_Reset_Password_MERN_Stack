const router = require("express").Router();
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { withDB } = require("../dbConnect");
const { ObjectId } = require("mongodb");

router.post("/reset-password/:_id/:token", async (req, res) => {

    try {
        const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
        const { _id, token } = req.params;
        // console.log({ _id, token })
        const { password } = req.body;
        const emailSchema = Joi.object({
            password: passwordComplexity().required().label("Password")
        });
        // console.log({ password })
        const { error } = emailSchema.validate({ password });
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        // const user = jwt.verify(token, PRIVATE_KEY)
        // // console.log({ _id, token })
        // console.log({ user })
        // if (!user) {
        //     return res.status(409).send({ message: "Error with token" })
        // }

        await withDB(async (db) => {
            const salt = await bcrpt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrpt.hash(password, salt);
            // console.log({ _id: new ObjectId(_id) })
            const doc = await db.collection("users").findOneAndUpdate(
                { _id: new ObjectId(_id) },
                { $set: { password: hashPassword } },
                { returnOriginal: false }
            )
            // console.log(doc)
            if (doc.value == null) {
                return res.status(409).send({ error: true, message: "Query not found" })
            }
            res.send({ Status: "Success" })
        })

    } catch (error) {
        res.status(500).send({ error: true, message: `Error reseting password: ${error}` })
    }

})

module.exports = router;