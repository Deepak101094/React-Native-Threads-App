const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch(() => {
		console.log("Error while connecting to MongoDB");
	});

app.listen(port, () => {
	console.log("Server is running on port:3000");
});

const User = require("./models/UserModel");
const Post = require("./models/PostModel");

//end point to register the user

app.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			res.status(400).json({ message: "User already exist" });
		}

		//create a new user
		const newUser = new User({
			name,
			email,
			password,
		});

		// generate and store the verification token
		newUser.verificationToken = crypto.randomBytes(20).toString("hex");

		// save the user to the database
		await newUser.save();

		// send the verification email to user's email
		sendVerificationEmail(newUser.email, newUser.verificationToken);
		res.status(200).json({ message: "Registration Successfull" });
	} catch (error) {
		console.log("Error while registering the user");
		res.status(500).json({ message: "Error while registering the user" });
	}
});

const sendVerificationEmail = async (email, verificationToken) => {
	const transpoter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "deepakpandey101094@gmail.com",
			pass: "unfd rkfw gadx lpue",
		},
	});

	const mailOption = {
		from: "matchmake.com",
		to: email,
		subject: "Email verification",
		text: `please click on the following link to verify your email: http://localhost:3000/verify/${verificationToken}`,
	};
	//send the email

	try {
		await transpoter.sendMail(mailOption);
	} catch (error) {
		console.log("Error while sending the email");
	}
};

// verify the user

app.get("/verify/:token", async (req, res) => {
	try {
		const token = req.params.token;

		const user = User.findOne({ verificationToken: token });

		if (!user) {
			return res.status(404).json({ message: "Invalid vefification token" });
		}

		// mark the user as verified;
		user.verified = true;
		user.verificationToken = undefined;
		await user.save();
		res.status(200).json({ message: "Email verified successfully" });
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({ message: "Email verification failed" });
	}
});

//end point to register the user

const generateSecretKey = () => {
	const secretKey = crypto.randomBytes(32).toString("hex");
	return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = User.findOne({ email });

		if (!user) {
			res.status(404).json({ message: "Invalid Email" });
		}

		if (user.password !== password) {
			res.status(404).json({ message: "Invalid Password" });
		}

		const token = jwt.sign({ userId: user._id }, secretKey);

		res.status(200).json({ token, message: "Login Successfull" });
	} catch (error) {
		console.log("Error while login", error);
		res.status(500).json({ message: "Login Failed" });
	}
});
