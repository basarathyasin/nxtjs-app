
import { api } from "../libs/axios";
import { TodoApiResponse, transformTodo } from "../libs/transformTodo";

export const fetchTodos = async () => {
  const response = await api.get<TodoApiResponse[]>("/todos");

  return response.data
    .slice(0, 10)
    .map(transformTodo);
};