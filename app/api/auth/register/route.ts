import { NextResponse } from "next/server";
import user from "@/models/user";
import bcrypt from "bcryptjs";
import {connectDB} from "@/lib/db"

export async function POST(req:Request ){
    
    try {
        await connectDB();

        let body;
        try {
            body =  await req.json();
        } catch (error) {
            return NextResponse.json(
                {message : "Invalid or mising JSON body"},
                {status : 400}
            )
        }
        
        const {name , email , password} =  body;
        if(!name || !email || !password) {
            return NextResponse.json({
                message : "All fields are required!",
            }, {status : 400});
        }

        const userExist =  await user.findOne({email});
        if(userExist){
            return NextResponse.json({
                message : "User Already Exists"
            }, {status : 400})
        }

        const hashedPassword =  await bcrypt.hash(password , 10);

        const newUser = await user.create({
            name,
            email,
            password : hashedPassword,
            role : "USER"
        });

        // Only return safe user info
        return NextResponse.json({
            message: "User created successfully!",
            user : newUser
            
        }, { status: 201 });


        
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong!",
            error: (error instanceof Error) ? error.message : String(error)
        }, { status: 500 });
    }
}