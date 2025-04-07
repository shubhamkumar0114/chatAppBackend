import { generateUserToken } from "./jwt/jwtToken.js";
import { USER } from "./model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password ) {
      return res.status(400).json({ error: "All field required" });
    }

  
    const existUser = await USER.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await USER.create({
      name,
      email,
      password: hashPassword,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", createUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Error in create user", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All field required" });
    }

    const user = await USER.findOne({ email }).select("+password");
    if (!user && !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "email password not match" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      await generateUserToken(user._id, res);
      return res.status(201).json({
        message: "User login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error in login user", error });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Error in logout user", error });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const loginUser = req.user;

    const users = await USER.find({ _id: { $ne: loginUser } });
    if (users.length == 0) {
      return res.status(400).json({ error: "Not found users" });
    }

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

