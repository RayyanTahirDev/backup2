// pages/api/departments/[id]/route.js
import { connectDb } from "@/connectDb";
import { NextResponse } from "next/server";
import { Department } from "../../../../../models/Departments";
import jwt from "jsonwebtoken";

export async function GET(request, { params }) {
  try {
    await connectDb();

    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    jwt.verify(token, process.env.JWT_SEC);

    const { id } = params;
    if (!id) return NextResponse.json({ message: "Missing department ID" }, { status: 400 });

    const department = await Department.findById(id)
      .populate("organization", "name ceoName")
      .lean();

    if (!department) return NextResponse.json({ message: "Department not found" }, { status: 404 });

    return NextResponse.json(department, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
