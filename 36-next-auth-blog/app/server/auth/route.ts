import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authSchema } from "@/server/validations/auth.validation";
import {
  loginBlogger,
  getBloggerByCredentials,
} from "@/server/services/bloggers.service";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid body" },
      {
        status: 400,
      }
    );
  }
  const validationResult = authSchema.safeParse(body);
  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error },
      {
        status: 404,
      }
    );
  }
  const user = await getBloggerByCredentials(body.username, body.password);
  if (!user) {
    return NextResponse.json(
      { error: "Blogger not found" },
      {
        status: 404,
      }
    );
  }
  const token = crypto.randomUUID();
  if (!(await loginBlogger(user.id, token))) {
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
  const cookieStore = await cookies();
  cookieStore.set("session", token);
  return Response.json({ token });
}
