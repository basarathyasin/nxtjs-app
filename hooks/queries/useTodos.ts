import { todosKeys } from "@/src/libs/queryKeys";
import { transformTodo } from "@/src/libs/transformTodo";
import { fetchTodos } from "@/src/services/fetchTodo";
import { useQuery } from "@tanstack/react-query";

export function useTodos() {
	return useQuery({
		queryKey: todosKeys.all,
		queryFn: async () => {
			const todos = await fetchTodos();

			return todos.map(transformTodo);
		},
	});
}
