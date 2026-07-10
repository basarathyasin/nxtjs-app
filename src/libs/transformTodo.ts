import type { TodoItem } from "@/components/platform/TodoTable";
export interface TodoApiResponse {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export function transformTodo(apiTodo: TodoApiResponse): TodoItem {
	return {
		id: String(apiTodo.id),
		title: apiTodo.title,
		status: apiTodo.completed ? "done" : "todo",
		priority: "medium",
		dueDate: undefined,
	};
}
