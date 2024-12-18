interface IPageParams<T = { slug: string }> {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface IChildren {
  children: React.ReactNode | React.JSX.Element | React.JSX.Element[];
}

interface IPocketBasePagination {
  page: number;
  perPage: number;
}

interface IPocketBaseList<T> extends ListResult {
  items: T[];
}
