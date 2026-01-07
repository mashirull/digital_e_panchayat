import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import user from "@/models/user";
import { verifyAuth } from "@/lib/verifyAuth";
import { connectDB } from "@/lib/db";



export async function POST(req: Request) {

    try {

        await connectDB()

        const { email, password, name } = await req.json();



        if (!email || !password || !name) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }

        const { role } = verifyAuth(req)

        if (role !== "ADMIN") {
            return NextResponse.json({
                success: false,
                message: "Unauthorized access"
            }, { status: 403 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const IsUserExist = await user.findOne({ email })
        if (IsUserExist) {
            return NextResponse.json({
                success: false,
                message: "User Already exist"
            }, { status: 400 })
        }

        const User = await user.create({
            name,
            email,
            password: hashedPassword,
            role: "STAFF"
        });

        return NextResponse.json({
            success: true,
            message: "Staff created successfully",
            user: User
        }, { status: 201 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to create staff"
        }, { status: 500 })
    }

}