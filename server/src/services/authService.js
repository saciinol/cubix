import bcrypt from "bcryptjs";
import * as authModel from "../models/authModel.js";

export const registerNewUser = async (username, email, password) => {
   // error if username, email, password is empty

   // validate username length

   // validate email format

   // validate password length

   const existingUsername = await authModel.findByUsername(username);

   // error if username exist

   const existingEmail = await authModel.findByEmail(email);

   // error if email exist

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

	const user = await authModel.createUser(username, email, hashedPassword);

	return user;
};

export const loginUser = async (username, password) => {
   // error if username, password is empty

   const user = await authModel.findByUsername(username);

   // error if username doesn't exist

   const isPasswordValid = await bcrypt.compare(password, user.password);

   // error if password doesn't match

   // generate token

   // return token and user
}