const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authheader = req.get("Authorization");
  
  if (!authheader) {
    req.isAuth = false;
    return next();
  }

  const token = authheader.split(' ')[1];
  if (!token) {
    req.isAuth = false;
    return next();
  }
  let decodedtoken;
  try {
    decodedtoken = jwt.verify(token, process.env.JWT_PRIVATE);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  
  
  req.isAuth = true;
  req.userid = decodedtoken.userid;
  next();
};
