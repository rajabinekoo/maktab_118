"use server";

import { NextRequest } from "next/server";

import { initDatabase } from "@/services/storage.service";
import { createMovies, getAllMovies } from "@/services/movies.service";

initDatabase();

export async function GET() {
  return Response.json(await getAllMovies());
}

export async function POST(request: NextRequest) {
  try {
    return Response.json(await createMovies(await request.json()));
  } catch (error) {
    return Response.json({ error: (<Error>error).message }, { status: 400 });
  }
}
