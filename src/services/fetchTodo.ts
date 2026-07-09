
import { api } from "../libs/axios";
import { TodoApiResponse } from "../libs/transformTodo";

export const fetchTodos = async () => {
  const response = await api.get<TodoApiResponse[]>("/todos");

  return response.data
};