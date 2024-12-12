import { initDatabase } from "@/database/connection";
import { IMovie, MovieModel } from "@/database/models/movie";

type getAllMoviesParams = { page?: number; limit?: number };

type getAllMovies = (
  _?: getAllMoviesParams
) => Promise<IServerListResDto<IMovie>>;
export const getAllMovies: getAllMovies = async (params) => {
  await initDatabase();
  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 10);
  const list = await MovieModel.find(
    {},
    {},
    { skip: page * limit - limit, limit }
  );
  const length = await MovieModel.countDocuments();
  return {
    list,
    page,
    limit,
    total: length,
    totalPages: Math.ceil(length / limit),
  };
};

type createMovies = (_: Omit<IMovie, "id" | "createdAt">) => Promise<IMovie>;
export const createMovies: createMovies = async (body) => {
  await initDatabase();
  if (!body.name?.trim?.()) throw new Error("Name required");
  const newMovie = new MovieModel({
    ...body,
    createdAt: new Date(),
  });
  return await newMovie.save();
};
