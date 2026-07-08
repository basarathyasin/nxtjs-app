import { TodoApiResponse, TodoItem } from "@/components/platform/TodoTable";

export function transformTodo(apiTodo: TodoApiResponse): TodoItem {
		return {
			id: String(apiTodo.id),
			title: apiTodo.title,
			status: apiTodo.completed ? "done" : "todo",
			priority: "medium",
			dueDate: undefined,
		};
	}
