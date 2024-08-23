import { getUserInfo } from "../apis/services/user.service";
import { errorHandler } from "../libs/error-handler";

async function main() {
  try {
    const response = await getUserInfo();
    console.log(response);
  } catch (error) {
    errorHandler(error);
  }
}

main();
