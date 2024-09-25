import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define an interface for your token payload
interface TokenPayload {
    id: string;
    email: string;
    username: string;
}

export const getDataFromToken = (request: NextRequest): string | null => {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            throw new Error("No token provided");
        }

        // Check if TOKEN_SECRET is defined
        if (!process.env.TOKEN_SECRET) {
            throw new Error("TOKEN_SECRET is not defined in environment variables");
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET) as TokenPayload;
        return decodedToken.id;  

    } catch (error: any) {
        console.error("Error decoding token: ", error.message);
        return null;  
    }
}
