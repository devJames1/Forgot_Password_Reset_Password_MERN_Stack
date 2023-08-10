require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

//import Routes
const userRoutes = require("./Routes/users");
const authRoutes = require("./Routes/auth");
const forgotPassword = require("./Routes/forget-password");
const resetPassword = require("./Routes/reset-password");

//middlewares
const corsConfig = {
    origin: true,
    credentials: true
}
app.use(cors(corsConfig))
app.options("*", cors(corsConfig));
app.use(express.json());


// Use Routes
app.use("/api", resetPassword);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forgot-password", forgotPassword);



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));


