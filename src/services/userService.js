import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { generateToken } from "../utils/jwtUtil.js";

export async function getUserByEmail(email) {
  return User.findOne({ email });
}

export async function registerUser(user) {
  const exists = await User.exists({ email: user.email });
  if (exists) {
    throw new Error("Email already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);
  const savedUser = await new User(user).save();

  const token = generateToken(savedUser._id, savedUser.email, savedUser.role);

  return { user: savedUser, token };
}

export async function getUserById(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User not found with id: ${userId}`);
  }
  return user;
}

export async function saveUser(user) {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    return existingUser._id;
  }
  const newUser = await new User(user).save();
  return newUser._id;
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    throw new Error("Wrong password");
  }

  const token = generateToken(user._id, user.email, user.role);

  return { user, token };
}

export async function updateUser(userId, updatedUser) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User not found with ID: ${userId}`);
  }
  user.name = updatedUser.name;
  user.email = updatedUser.email;
  user.phone = updatedUser.phone;
  user.role = updatedUser.role;
  return user.save();
}

export async function getEmailByUserId(userId) {
  const user = await User.findById(userId);
  if (user) {
    return user.email;
  }
  throw new Error(`User not found with userId: ${userId}`);
}

export async function getAllUsers() {
  return User.find();
}

export async function deleteUserById(userId) {
  await User.findByIdAndDelete(userId);
}

export async function makeUserAdmin(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  user.role = "admin";
  return user.save();
}
