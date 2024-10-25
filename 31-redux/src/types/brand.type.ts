export interface IBrand {
  id: number;
  code: string;
  title_fa: string;
  title_en: string;
}

export interface IBrandStoreItem extends IBrand {
  checked: boolean;
}
