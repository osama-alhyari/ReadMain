import User from "../database/models/User.js";

export const validateToken = async (req, res, next) => {
  if (req.headers.id && req.headers.token && req.headers.admin) {
    const user = await User.findOne({ where: { id: req.headers.id } });
    if (user && user.token === req.headers.token) next();
    else res.status(200).json({ invalidToken: "No token or token is expired" });
  } else res.status(200).json({ invalidToken: "No token or token is expired" });
};

export const validateTokenRequest = async (req, res, next) => {
  if (req.headers.id && req.headers.token && req.headers.admin) {
    const user = await User.findOne({ where: { id: req.headers.id } });
    if (user && user.token === req.headers.token) res.status(200).json({ validToken: "Token Validated" });
    else res.status(200).json({ invalidToken: "No token or token is expired" });
  } else res.status(200).json({ invalidToken: "No token or token is expired" });
};
