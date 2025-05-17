// pages/api/teammembers/[id]/route.js
import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import { TeamMember } from "../../../../../models/TeamMember";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
  try {
    await connectDb();

    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    jwt.verify(token, process.env.JWT_SEC); // Verify token, no need to use decoded here

    const { id } = params;
    if (!id) return NextResponse.json({ message: "Missing team member ID" }, { status: 400 });

    // Find team member by ID and populate references if needed
    const teammember = await TeamMember.findById(id)
      .populate("organization", "name ceoName")
      .populate("department", "departmentName hodName")
      .lean();

    if (!teammember) return NextResponse.json({ message: "Team member not found" }, { status: 404 });

    return NextResponse.json(teammember, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
