import axios, { AxiosInstance } from "axios";

// Data Transfer Object
interface IReqResUserDto {
  id: number;
  last_name: string;
  first_name: string;
  email: `${string}@reqres.in`;
  avatar: `https://reqres.in/img/faces/${number}-image.jpg`;
}
interface IReqResResourceDto {
  id: number;
  name: string;
  year: number;
  color: `#${string}`;
  pantone_value: `${number}-${number}`;
}
interface IReqResPaginationDto<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

class ReqResUrls {
  public usersListUrl(page: number) {
    return `/users?page=${page}`;
  }
  public resourcesListUrl(page: number) {
    return `/unknown?page=${page}`;
  }
}

// class ReqResApis extends ReqResUrls {
class ReqResApis {
  private httpClient: AxiosInstance;
  // composition
  private urls = new ReqResUrls();

  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://reqres.in/api",
    });
  }

  public async getUsersList(
    page = 1
  ): Promise<IReqResPaginationDto<IReqResUserDto>> {
    const response = await this.httpClient.get(this.urls.usersListUrl(page));
    return response.data;
  }

  public async getResourcesList(
    page = 1
  ): Promise<IReqResPaginationDto<IReqResResourceDto>> {
    const response = await this.httpClient.get(
      this.urls.resourcesListUrl(page)
    );
    return response.data;
  }
}

// polymorphism
function sortData<T = { id: number }>(list: { id: number }[]): T[] {
  return <Array<T>>list.sort((a, b) => b.id - a.id);
}

async function main() {
  const reqres = new ReqResApis();
  try {
    const users = await reqres.getUsersList();
    const sortedUsers: IReqResUserDto[] = sortData<IReqResUserDto>(users.data);
    const resources = await reqres.getResourcesList();
    const sortedSources: IReqResResourceDto[] = sortData<IReqResResourceDto>(
      resources.data
    );
    console.log(sortedUsers[0].avatar, sortedSources[0].color);
  } catch (error) {
    console.log(error);
  }
}

main();
