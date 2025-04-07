import {USER} from "../model.js"
import jwt from "jsonwebtoken"

export const userMiddleWare = async(req , res , next)=> {
   
    try {
        const token = req.cookies?.token || req.cookies?.jwt 
        if(!token){
            return res.status(400).json({ error: "not provide token" });
        }

        const decoded = jwt.verify(token , process.env.secretPass);
      
        if(!decoded){
            return res.status(400).json({ error: "Invilid token" });
        }
        const id = decoded.userId;
        const user = await USER.findById(id);
        req.user = user._id
        next();
        
    } catch (error) {
        console.log(error)
    }
}