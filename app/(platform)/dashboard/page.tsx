"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TodoTable } from "@/components/platform/TodoTable";
import type { TodoTaskFormValues } from "@/components/platform/TodoTaskForm";
import ErrorState from "@/components/ui/ui-states/Error";
import LoadingState from "@/components/ui/ui-states/Loading";
import { createTodo } from "@/src/services/createTodo";
import { deleteTodo } from "@/src/services/deleteTodos";
import { fetchTodos } from "@/src/services/fetchTodo";

const todosQueryKey = ["todos"] as const;

export default function Dashboard() {
	const queryClient = useQueryClient();

	const todosQuery = useQuery({
		queryKey: todosQueryKey,
		queryFn: fetchTodos,
	});

	const createMutation = useMutation({
		mutationFn: createTodo,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: todosQueryKey });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteTodo,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: todosQueryKey });
		},
	});

	function handleCreate(values: TodoTaskFormValues) {
		createMutation.mutate(values);
	}

	function handleDelete(id: string) {
		deleteMutation.mutate(id);
	}

	if (todosQuery.isPending) {
		return <LoadingState />;
	}

	if (todosQuery.error) {
		return (
			<ErrorState
				message={todosQuery.error.message}
				retry={() => void todosQuery.refetch()}
			/>
		);
	}

	return (
		<TodoTable
			todos={todosQuery.data}
			isCreating={createMutation.isPending}
			deletingIds={
  deleteMutation.isPending && deleteMutation.variables
    ? [String(deleteMutation.variables)]
    : []
}
			onCreate={handleCreate}
			onDelete={handleDelete}
		/>
	);
}
