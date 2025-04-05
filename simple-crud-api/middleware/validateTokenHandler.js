import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.header.Authorization || req.headers.authorization;
  
  if(authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({status: false, data: err, message: err.message });
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      return res.status(401).json({message: "user is not authorized or token is invalid"});
    }
  } else {
    return res.status(401).json({message: "User authentication is required"});
  }
};

export default validateToken;