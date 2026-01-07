import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import { headers } from "next/headers";



export function middleware(req:NextRequest) {
    const token =  req.headers.get("token")
    console.log(token)
    const pathname = req.nextUrl.pathname

    if(pathname.startsWith("/api/auth/login") || pathname.startsWith("/api/auth/register") ){
        return NextResponse.next()
    }

    if(!token){
        return NextResponse.json({
            success : false,
            message : "Unauthorized!"
        }, {status : 401})
    }
    // try {
    //     // const decoded =  jwt.verify(token , SECRET_KEY)
    //     // const headers =  new Headers(req.headers)

    //     // headers.set("user-id" , decoded.id)
    //     // headers.set("user-role" , decoded.role)
    // } catch (error) {
    //     console.log(error)
    //     return NextResponse.json({
    //         success : false,
    //         message : "invalid token"
    //     }, {status : 401})
    // }
    return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
};