import { api } from "../libs/axios"


export const deleteTodo = async (id:string |number) => {

    const res = await api.delete(`/todos/${id}`);

    return res.data;
  
}
