import { connectDB } from "@/lib/db";
import user from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generateWebToken } from "@/lib/jwt";




export async function POST(req: Request) {


    try {
        await connectDB();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: 'Mobile or Password is missing'
            }, {status : 400})
        }

        const userExist = await user.findOne({ email })

        if (!userExist) {
            return NextResponse.json({
                success: false,
                message: "User not exist"
            }, {status : 400})
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password)

        if (!isPasswordMatch) {
            return NextResponse.json({
                success: false,
                message: "Wrong password!"
            }, {status : 400})
        }

        const token = generateWebToken({
            id : userExist._id,
            role : userExist.role
        })
            
      
    


        return NextResponse.json({
            success: true,
            message: "login successfully",
            token,
            user : {
                id : userExist._id,
                name : userExist.name,
                email : userExist.email,
                role : userExist.role
            }
        }, {status : 200})

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error
        }, {status: 500});
    }



}