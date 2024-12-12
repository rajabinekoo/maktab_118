import { readDatabase, writeDatabase } from "./storage.service";

let movies: IMoviePure[];
let incrementalId: number;

const checkMovies = async () => {
  if (!movies) {
    movies = (await readDatabase()) as IMoviePure[];
    incrementalId = (movies.sort((a, b) => b.id - a.id)?.[0]?.id || 0) + 1;
  }
};

type getAllMoviesParams = { page?: number; limit?: number };

type getAllMovies = (
  _?: getAllMoviesParams
) => Promise<IServerListResDto<IMoviePure>>;
export const getAllMovies: getAllMovies = async (params) => {
  await checkMovies();
  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 10);
  const end = page * limit;
  const start = end - limit;
  const list = movies.slice(start, end);
  return {
    list,
    page,
    limit,
    total: movies.length,
    totalPages: Math.ceil(movies.length / limit),
  };
};

type createMovies = (_: Omit<IMoviePure, "id" | "createdAt">) => Promise<IMoviePure>;
export const createMovies: createMovies = async (body) => {
  await checkMovies();
  if (!body.name?.trim?.()) throw new Error("Name required");
  const newMovie: IMoviePure = {
    ...body,
    id: incrementalId++,
    createdAt: new Date(),
  };
  movies.push(newMovie);
  await writeDatabase(movies);
  return newMovie;
};
