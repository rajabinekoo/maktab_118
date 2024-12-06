interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface ITodoRes extends IServerResDto {
  todos: ITodo[];
}
