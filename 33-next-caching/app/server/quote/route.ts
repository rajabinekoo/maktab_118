import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const quoteList: IQuote[] = [];

export async function GET() {
  return Response.json({ quotes: quoteList });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.author) {
    return NextResponse.json(
      { error: "Author is required" },
      {
        status: 400,
      }
    );
  }
  if (!body.quote) {
    return NextResponse.json(
      { error: "Quote is required" },
      {
        status: 400,
      }
    );
  }
  quoteList.push(body);
  return Response.json({ message: "ok" });
}
