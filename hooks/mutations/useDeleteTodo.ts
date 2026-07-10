import { todosKeys } from "@/src/libs/queryKeys";
import { deleteTodo } from "@/src/services/deleteTodos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todosKeys.all,
      });
    },
  });
}