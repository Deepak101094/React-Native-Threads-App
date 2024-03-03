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
	//create a nodemailer transporter

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "deepakpandey101094@gmail.com",
			pass: "unfd rkfw gadx lpue",
		},
	});

	//compose the email message
	const mailOptions = {
		from: "threads.com",
		to: email,
		subject: "Email Verification",
		text: `please click the following link to verify your email http://localhost:3000/verify/${verificationToken}`,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log("error sending email", error);
	}
};

app.get("/verify/:token", async (req, res) => {
	try {
		const token = req.params.token;

		const user = await User.findOne({ verificationToken: token });
		if (!user) {
			return res.status(404).json({ message: "Invalid token" });
		}

		user.verified = true;
		user.verificationToken = undefined;
		await user.save();

		res.status(200).json({ message: "Email verified successfully" });
	} catch (error) {
		console.log("error getting token", error);
		res.status(500).json({ message: "Email verification failed" });
	}
});

const generateSecretKey = () => {
	const secretKey = crypto.randomBytes(32).toString("hex");
	return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "Invalid email" });
		}

		if (user.password !== password) {
			return res.status(404).json({ message: "Invalid password" });
		}

		const token = jwt.sign({ userId: user._id }, secretKey);

		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ message: "Login failed" });
	}
});

//endpoint to access all the users except the logged in the user

app.get("/user/:userId", (req, res) => {
	try {
		const loggedInUserId = req.params.userId;

		User.find({ _id: { $ne: loggedInUserId } })
			.then((users) => {
				res.status(200).json(users);
			})
			.catch((error) => {
				console.log("Error: ", error);
				res.status(500).json("errror");
			});
	} catch (error) {
		res.status(500).json({ message: "error getting the users" });
	}
});
