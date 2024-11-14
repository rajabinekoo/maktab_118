import { NextRequest, NextResponse } from "next/server";
import { blogsList } from "@/server/services/blogs.service";
import {
  createBlogSchema,
  createBlogSchemaType,
} from "@/server/validations/blogs.validation";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("perPage") || 10);
  return Response.json(await blogsList({ page, perPage }));
}

export async function POST(req: Request) {
  const body = await req.formData();
  const data: createBlogSchemaType = {
    hide: body.get("hide")?.toString() === "true",
    text: body.get("text")?.toString() || "",
    title: body.get("title")?.toString() || "",
    description: body.get("description")?.toString() || "",
  };
  const validationResult = createBlogSchema.safeParse(data);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error },
      {
        status: 400,
      }
    );
  }
  console.log(data);
  console.log(body.get("thumbnail"));
  return Response.json({ message: "ok" });
}
