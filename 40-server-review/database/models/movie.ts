import mongoose, { ObjectId } from "mongoose";

export interface IMovie {
  _id: ObjectId;
  rate: number;
  name: string;
  genre: string;
  director: string;
  createdAt: Date;
}

const movieSchema = new mongoose.Schema<IMovie>({
  name: String,
  rate: Number,
  genre: String,
  director: String,
  createdAt: Date,
});

export const MovieModel = mongoose.model("Movie", movieSchema);
