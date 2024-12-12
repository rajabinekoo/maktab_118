import mongoose from "mongoose";

let loaded = false;
export async function initDatabase() {
  if (loaded) return;
  await mongoose.connect("mongodb://127.0.0.1:27017/movie-db");
  loaded = true;
}
