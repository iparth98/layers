import jwt from "jsonwebtoken";

export const generateJwtToken = (user) => {
  // Generate access token
  const accessToken = jwt.sign(
    {
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  return accessToken;
};
