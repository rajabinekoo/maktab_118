type IssueStatue = "BACKLOG" | "TODO" | "INPROGRESS" | "DONE";

interface Issue {
  id: string;
  name: string;
  userId: string;
  content: string;
  status: IssueStatue;
  createdAt?: string;
  user?: IUser;
}
