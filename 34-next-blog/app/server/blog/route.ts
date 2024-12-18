import { NextRequest, NextResponse } from "next/server";
import { authorization } from "@/server/services/bloggers.service";
import { blogsList, createBlog } from "@/server/services/blogs.service";
import {
  createBlogSchema,
  thumbnailValidator,
} from "@/server/validations/blogs.validation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("perPage") || 10);
  const cookie = await cookies();
  const session = cookie.get("session");
  const authorized = !session?.value
    ? false
    : await authorization(session.value);
  return Response.json(await blogsList({ page, perPage, hide: !authorized }));
}

export async function POST(req: Request) {
  const body = await req.formData();
  const cookie = await cookies();
  const session = cookie.get("session");
  const token = session?.value || "";
  if (!(await authorization(token))) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }
  const validationResult = createBlogSchema.safeParse({
    hide: body.get("hide")?.toString(),
    text: body.get("text")?.toString() || "",
    title: body.get("title")?.toString() || "",
    description: body.get("description")?.toString() || "",
  });
  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error },
      {
        status: 400,
      }
    );
  }
  const thumbnailInvalidMsg = thumbnailValidator(<File>body.get("thumbnail"));
  if (!!thumbnailInvalidMsg) {
    return NextResponse.json(
      { error: thumbnailInvalidMsg },
      {
        status: 400,
      }
    );
  }
  if (!(await createBlog(body))) {
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
  return Response.json({ message: "ok" });
}
