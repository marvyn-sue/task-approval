export interface Task {
  _id: string;
  title: string;
  description: string;
  email: string;
  status: string;
}

export interface TaskForm {
  title: string;
  description: string;
  email: string;
}
