interface IDummyJsonServerResDto {
  skip: number;
  limit: number;
  total: number;
}

interface IDummyJsonServerPaginationDto {
  skip?: string;
  limit?: string;
}

interface IPageParams<T = { slug: string }> {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface IChildren {
  children: React.ReactNode | React.JSX.Element | React.JSX.Element[];
}
