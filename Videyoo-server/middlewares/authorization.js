const { verifyToken } = require("../services/token");

function authorizationMiddlware(req, res, next) {
  const tokenFromClient = req.header("x-auth-token");

  if (!tokenFromClient) return res.status(401).json("Please Login");
  const userInfo = verifyToken(tokenFromClient);

  if (!userInfo) return res.status(401).json("Invalid  Token!");

  req.user = userInfo;

  return next();
}

module.exports = authorizationMiddlware;
