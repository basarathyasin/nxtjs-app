"use client";

import * as React from "react";
import axios from "axios";

import { TodoTable } from "@/components/platform/TodoTable";
import type { TodoItem } from "@/components/platform/TodoTable";
import ErrorState from "@/components/ui/ui-states/Error";
import LoadingState from "@/components/ui/ui-states/Loading";

import { api } from "@/src/libs/axios";
import { TodoApiResponse, transformTodo } from "@/src/libs/transformTodo";

export default function Dashboard() {
	const [todos, setTodos] = React.useState<TodoItem[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState("");

	const fetchTodos = React.useCallback(async () => {
		setError("");
		

		try {
			const response = await api.get<TodoApiResponse[]>("/todos");

			const data = response.data;

			setTodos(data.slice(0, 10).map(transformTodo));
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response) {
					console.error("Response:", err.response.data);
					console.error("Status:", err.response.status);
					console.error("Headers:", err.response.headers);

					setError(
						err.response.data?.message ??
							`Request failed with status ${err.response.status}`,
					);
				} else if (err.request) {
					console.error("Request:", err.request);
					setError("No response received from the server.");
				} else {
					console.error("Error:", err.message);
					setError(err.message);
				}
			} else if (err instanceof Error) {
				console.error(err.message);
				setError(err.message);
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setLoading(false);
		}
	}, []);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			void fetchTodos();
		}, 0);

		return () => clearTimeout(timer);
	}, [fetchTodos]);

	const handleRetry = React.useCallback(() => {
		setLoading(true);
		void fetchTodos();
	}, [fetchTodos]);

	if (loading) {
		return <LoadingState />;
	}

	if (error) {
		return <ErrorState message={error} retry={handleRetry} />;
	}

	return <TodoTable todos={todos} setTodos={setTodos} />;
}
