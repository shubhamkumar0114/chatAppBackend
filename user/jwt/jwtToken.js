import jwt from "jsonwebtoken";

export const generateUserToken = async (userId, res) => {
  try {
    const token = await jwt.sign({ userId }, process.env.secretPass, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token);
    return token;
  } catch (error) {
    console.log(error);
  }
};
