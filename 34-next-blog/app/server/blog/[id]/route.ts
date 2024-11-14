import { NextResponse } from "next/server";
import { blogById } from "@/server/services/blogs.service";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const blog = await blogById(id);
  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      {
        status: 404,
      }
    );
  }
  return Response.json(blog);
}
