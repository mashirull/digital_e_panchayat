import jwt from "jsonwebtoken";


const SECRET_KEY = process.env.JWT_SECRET_KEY

export const verifyAuth = (req:Request)=> {
    const token =  req.headers.get("token")!;
     
    const decoded = jwt.verify(token, SECRET_KEY) as {
        userId : String,
        role : String
    }
   
    return decoded

}