import { NextResponse } from "next/server";
import user from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req:Request ){

    const {name , mobile , password} =  await req.json();

    try {
        if(!name || !mobile || !password) {
            return NextResponse.json({
                message : "All fields are required!",
            }, {status : 400});
        }

        const userExist =  await user.findOne({mobile});
        if(userExist){
            return NextResponse.json({
                message : "User Already Exists"
            }, {status : 400})
        }

        const hashedPassword =  await bcrypt.hash(password , 10);

        await user.create({
            name,
            mobile,
            password : hashedPassword
        });

        return NextResponse.json({
            message : "User create successfully!",
            user,
        }, {status : 201})


        
    } catch (error) {
        return NextResponse.json({
            message : "Something went wrong!",
            error : error
        }, {status : 401})
    } 
 }