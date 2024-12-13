interface IChildren {
  children: React.ReactNode | React.JSX.Element | React.JSX.Element[];
}

interface IFAQ {
  question: string;
  answer: string;
  label: string;
}

interface IPageParams<T = { slug: string }> {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}