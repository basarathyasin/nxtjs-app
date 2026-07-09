import { TodoTaskFormValues } from "@/components/platform/TodoTaskForm";
import { api } from "../libs/axios";


export const createTodo = async (values: TodoTaskFormValues) => {
  const response = await api.post("/todos", {
    title: values.title,
    completed: false,
  });

  return response.data;
};