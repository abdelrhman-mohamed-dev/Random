import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  await connect();

  const hasdPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hasdPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("user has been created", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
