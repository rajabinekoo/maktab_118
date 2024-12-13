import { sendPrompt } from "@/services/gemini";

export const POST = async (request: Request) => {
  const body = await request.json();
  if (!body.prompt?.trim?.()) {
    return Response.json(
      { error: "Prompt string is required" },
      { status: 400 }
    );
  }
  return Response.json({ html: await sendPrompt(body.prompt) });
};
