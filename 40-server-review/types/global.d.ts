interface IChildren {
  children: React.ReactNode | React.JSX.Element | React.JSX.Element[];
}

interface IServerListResDto<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  list: T[];
}
