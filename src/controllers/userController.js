import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User.js";
import * as userService from "../services/userService.js";
import * as emailService from "../services/emailService.js";
import { extractUserId } from "../utils/jwtUtil.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtil.js";
import { ONE_DAY_MS } from "../utils/jwtUtil.js";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // requires HTTPS in prod
  sameSite: "strict", // use "lax" if frontend/backend are on different subdomains and you need cross-site GETs
  maxAge: ONE_DAY_MS,
  path: "/",
};

export async function updateUser(req, res) {
  const user = await userService.updateUser(req.params.userId, req.body);
  res.json(user);
}

export async function getUserByEmail(req, res) {
  const user = await userService.getUserByEmail(req.params.email);
  res.json(user); // may be null, mirrors Optional<User> serialization behavior closely enough for the frontend
}

export function sayHello(req, res) {
  res.send("Hello from Spring Boot!");
}

export async function signup(req, res) {
  const { name, email, password, photo, role, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ error: "User already exists" });
  }

  const user = {
    _id: uuidv4(),
    name,
    email,
    photo,
    phone,
    role,
    password,
  };

  try {
    const result = await userService.registerUser(user);

    // If registerUser returns a token (auto-login after signup), set the cookie
    // and strip the token out of the JSON body so it isn't duplicated/exposed there.
    if (result.token) {
      res.cookie("token", result.token, COOKIE_OPTIONS);
      const { token, ...rest } = result;
      return res.json(rest);
    }

    res.json(result);
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ message: e.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);

    res.cookie("token", result.token, COOKIE_OPTIONS);

    const { token, ...rest } = result;
    res.json(rest);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export async function getCurrentUser(req, res) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const userId = extractUserId(token);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const userObj = user.toObject();
    userObj.password = null; // avoid sending password
    res.json(userObj);
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export async function sendOtp(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const otp = await emailService.sendOtpEmail(email);
    res.json({ message: "OTP sent successfully ", otp });
  } catch (e) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
}

export function verifyOtp(req, res) {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required");
  }

  const isValid = emailService.verifyOtp(email, otp);
  if (isValid) {
    emailService.clearOtp(email);
    res.json({ verified: true, message: "OTP verified" });
  } else {
    res.status(401).json({ success: false, message: "Invalid OTP" });
  }
}

export async function getUserById(req, res) {
  const user = await userService.getUserById(req.params.userId);
  res.json(user);
}

export async function getEmailByUserId(req, res) {
  try {
    const email = await userService.getEmailByUserId(req.params.userId);
    res.json(email);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export async function getAllUsers(req, res) {
  res.json(await userService.getAllUsers());
}

export async function googleLogin(req, res) {
  const { email, name, photo, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const token = generateToken(
        existingUser._id,
        existingUser.email,
        existingUser.role,
      );
      return res.json({ token, user: existingUser });
    }

    const user = {
      _id: uuidv4(),
      name,
      email,
      photo,
      role: "user",
      password: await bcrypt.hash(password, 10),
    };
    const result = await userService.registerUser(user);
    res.json(result);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export async function deleteUser(req, res) {
  await userService.deleteUserById(req.params.userId);
  res.json({ message: "User deleted" });
}

export async function makeAdmin(req, res) {
  await userService.makeUserAdmin(req.params.userId);
  res.json({ message: "User promoted to admin" });
}

export function logoutUser(req, res) {
  res.clearCookie("token", { httpOnly: true, secure: true, path: "/" });
  res.json({ message: "Logged out successfully" });
}
