export const todosKeys = {
  all: ["todos"] as const,

  detail: (id: string) =>
    ["todos", id] as const,
};