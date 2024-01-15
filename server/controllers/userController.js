import User from "../database/models/User.js";
import bcrypt from "bcryptjs";
import { catchAsync } from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'

export const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name);
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const maxAge = 3 * 24 * 60 * 60;
  const token = jwt.sign(
    { id: newUser.id },
    process.env.SECRET,
    { expiresIn: maxAge }
  );
  newUser.token = token;
  await newUser.save();
  res
    .status(201)
    .json({ token: newUser.token, id: newUser.id, isAdmin: newUser.isAdmin });
});

export const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const maxAge = 3 * 24 * 60 * 60;
  const token = jwt.sign(
    { id: user.id },
    process.env.SECRET,
    { expiresIn: maxAge }
  );
  if (await bcrypt.compare(password, user.password)) {
    user.token = token;
    await user.save();
    res
      .status(200)
      .json({ token: user.token, id: user.id, isAdmin: user.isAdmin });
  } else res.status(201).json({ wrongCredentials: `wrong password` });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.headers;
  const user = await User.findOne({ where: { id: +id } });
  res.status(200).json({ user });
});

export const suggestUsers = catchAsync(async (req, res, next) => {
  const { text } = req.headers;
  if (text === "") {
    res.status(200).json({ users: [] });
  }
  const getUsers = await User.findAll();
  const users = [];
  for (let i in getUsers) {
    users.push({name : getUsers[i].name, id : getUsers[i].id});
  }
  res.status(200).json({
    users: users.filter((user) => {
      return user.name.startsWith(text);
    }),
  });
});
