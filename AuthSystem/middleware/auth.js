const jwt = require("jsonwebtoken");

// model is optional here-->

const isAuth = async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization").replace("Bearer ", "");

  if (!token) res.status(403).send("Token is missing");

  try {
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    console.log("decode", decode);
    req.user = decode;
  } catch (error) {
    res.status(401).send("invalid token");
    console.log("invalid token", error);
  }
  return next();
};

module.exports = isAuth;
