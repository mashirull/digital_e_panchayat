 import { NextResponse } from "next/server";



export async function POST(req:Request ){

    const {name , mobile , password} =  await req.json();

    if(!name || !mobile || !password) {
        return NextResponse.json({
            message : "All fields are required!",
        }, {status : 400});
    }





    return NextResponse.json("hello");
 }