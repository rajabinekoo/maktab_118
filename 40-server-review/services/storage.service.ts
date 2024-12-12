import { writeFile, readFile, access } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "../db.json");

export const initDatabase = async () => {
  try {
    await access(dbPath);
  } catch {
    await writeFile(dbPath, JSON.stringify([]), "utf8");
  }
};

export const readDatabase = async () => {
  try {
    return JSON.parse(await readFile(dbPath, "utf8"));
  } catch {
    return [];
  }
};

export const writeDatabase = async (data: IMoviePure[]) => {
  await writeFile(dbPath, JSON.stringify(data), "utf8");
};
