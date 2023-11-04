import User from "../database/models/User.js";

export const checkIfExistsSignup = async (req, res, next) => {
  // turn into middleware to run before signUp
  const { email } = req.body;
  const emailExists = await User.findOne({ where: { email } });
  console.log(emailExists);
  return emailExists
    ? res.status(200).json({ message: `email already in use : ${email}` })
    : next();
};

export const checkIfExistsLogin = async (req, res, next) => {
  // turn into middleware to run before login
  const { email, password } = req.body;
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    next();
  } else res.status(200).json({ message: `email not in use : ${email}` });
};


