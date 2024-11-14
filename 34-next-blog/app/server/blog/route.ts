import { blogsList } from "@/pocketbase/blogs.service";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await blogsList({ page: 1, perPage: 10 }));
}

export async function POST(req: Request) {
  const body = await req.formData();
  console.log(body.get("name"));
  console.log(body.get("avatar"));
  return Response.json({ message: "ok" });
}
