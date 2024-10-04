export interface ITask {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface ICreateTaskReqDto {
  title: string;
  description: string;
}
