import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect ();

export async function GET(request:NextRequest) {


    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}
    


// export async function GET(request: NextRequest) {
//   try {
//     const userId = await getDataFromToken(request);

//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const user = await User.findOne({ _id: userId }).select("-password");

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       message: "User found",
//       data: user,
//     }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
