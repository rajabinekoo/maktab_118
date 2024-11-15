import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { authorization } from "@/server/services/bloggers.service";
import {
  blogById,
  deleteBlog,
  patchBlog,
  updateBlog,
} from "@/server/services/blogs.service";
import {
  patchBlogSchema,
  updateBlogSchema,
  thumbnailValidator,
} from "@/server/validations/blogs.validation";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const blog = await blogById(id);
  if (!blog || blog.hide) {
    return NextResponse.json(
      { error: "Blog not found" },
      {
        status: 404,
      }
    );
  }
  return Response.json(blog);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.formData();
  const searchParams = await params;
  const id = searchParams.id;
  const token = req.headers.get("Authorization") || "";
  if (!(await authorization(token))) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  const validationResult = updateBlogSchema.safeParse({
    text: body.get("text")?.toString() || "",
    title: body.get("title")?.toString() || "",
    description: body.get("description")?.toString() || "",
  });
  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error },
      {
        status: 404,
      }
    );
  }

  const thumbnailInvalidMsg = thumbnailValidator(
    <File>body.get("thumbnail"),
    false
  );
  if (!!thumbnailInvalidMsg) {
    return NextResponse.json(
      { error: thumbnailInvalidMsg },
      {
        status: 400,
      }
    );
  }

  const blog = await blogById(id);
  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      {
        status: 404,
      }
    );
  }

  if (!(await updateBlog(id, body))) {
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
      }
    );
  }

  revalidatePath(`/blog/${id}`);
  return Response.json({ message: "ok" });
}

// hide patch
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const searchParams = await params;
  const id = searchParams.id;
  const token = req.headers.get("Authorization") || "";
  if (!(await authorization(token))) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  if (!patchBlogSchema.safeParse(body).success) {
    return NextResponse.json(
      { error: "Invalid body" },
      {
        status: 404,
      }
    );
  }

  const blog = await blogById(id);
  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      {
        status: 404,
      }
    );
  }

  if (!(await patchBlog(id, body.hide === "true"))) {
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
      }
    );
  }

  revalidatePath(`/blog/${id}`);
  return Response.json({ message: "ok" });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const token = req.headers.get("Authorization") || "";
  if (!(await authorization(token))) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  const blog = await blogById(id);
  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      {
        status: 404,
      }
    );
  }
  if (!(await deleteBlog(id))) {
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
      }
    );
  }

  revalidatePath(`/blog/${id}`);
  return Response.json({ message: "ok" });
}
