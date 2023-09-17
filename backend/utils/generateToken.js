import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_CODE, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 20 * 1000,
    sameSite: "strict",
    secure: true,
  });
};

export default generateToken;
