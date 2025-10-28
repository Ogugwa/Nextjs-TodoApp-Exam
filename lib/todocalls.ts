import axios from "axios";

// ✅ Base API URL (still using JSONPlaceholder for mock data)
const baseUrl = "https://jsonplaceholder.typicode.com/todos";

// ✅ Todo type definition
export interface Todo {
  id?: number;
  title: string;
  completed?: boolean;
  description?: string;
  userId?: number;
}

// ✅ Define the options for fetching todos
interface GetTodosParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

// ✅ Get Todos
export const getTodos = async ({
  page = 1,
  limit = 10,
  sort = "id",
  order = "desc",
}: GetTodosParams): Promise<Todo[]> => {
  try {
    const params = new URLSearchParams({
      _page: String(page),
      _limit: String(limit),
      _sort: sort,
      _order: order,
    });

    const response = await axios.get<Todo[]>(`${baseUrl}?${params}`);
    return response.data.map((todo) => ({
      ...todo,
      description: todo.description || "",
    }));
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// ✅ Create Todo
export const createTodos = async (newTodo: Omit<Todo, "id">): Promise<Todo> => {
  try {
    const response = await axios.post<Todo>(baseUrl, {
      ...newTodo,
      completed: false,
      description: newTodo.description || "",
    });
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// ✅ Update Todo
export const updateTodos = async (
  id: number,
  newTodo: Todo
): Promise<Todo> => {
  try {
    const response = await axios.put<Todo>(`${baseUrl}/${id}`, {
      ...newTodo,
      description: newTodo.description || "",
      userId: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// ✅ Delete Todo
export const deleteTodos = async (id: number): Promise<number> => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
