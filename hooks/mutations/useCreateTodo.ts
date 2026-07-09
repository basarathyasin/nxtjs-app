import { todosKeys } from "@/src/libs/queryKeys";
import { createTodo } from "@/src/services/createTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todosKeys.all,
      });
    },
  });
}