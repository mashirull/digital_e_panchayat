import jwt from "jsonwebtoken"

export const generateWebToken = (payload : {id : Number , role : String})=> {
    return jwt.sign(payload , process.env.JWT_SECRET_KEY! , {expiresIn : "7d"})
}