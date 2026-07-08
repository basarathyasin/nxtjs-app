"use client";

import * as React from "react";

import { TodoTable } from "@/components/platform/TodoTable";
import type { TodoItem } from "@/components/platform/TodoTable";
import ErrorState from "@/components/ui/ui-states/Error";
import LoadingState from "@/components/ui/ui-states/Loading";
import { transformTodo } from "@/src/libs/transformTodo";

export interface TodoApiResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchTodos = React.useCallback(async () => {
    setError("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result: TodoApiResponse[] = await response.json();

      setTodos(result.slice(0, 10).map(transformTodo));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const id = setTimeout(() => {
      void fetchTodos();
    }, 0);

    return () => clearTimeout(id);
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