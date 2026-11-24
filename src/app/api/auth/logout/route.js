
import { NextResponse } from "next/server";
import { getAuthCookieOptions } from "@/lib/auth/auth";

export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: "Logged out successfully.",
    });

    response.cookies.set("interncheck_token", "", {
        ...getAuthCookieOptions(),
        maxAge: 0,
        expires: new Date(0),
    });

    return response;
}