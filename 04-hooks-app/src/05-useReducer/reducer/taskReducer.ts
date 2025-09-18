import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const StateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTaskInitialValue = (): TaskState => {
  const stateLocalStorage = localStorage.getItem("task-state");
  if (!stateLocalStorage)
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };

  const result = StateSchema.safeParse(JSON.parse(stateLocalStorage));

  if (result.error) {
    // console.log(result.error);
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

  return result.data;
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      if (!action.payload) return state;

      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.length++,
        pending: state.pending++,
      };
    }

    case "DELETE_TODO": {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id != action.payload
      );

      const length = updatedTodos.length;
      const completed = updatedTodos.filter((todo) => todo.completed).length;
      const pending = length - completed;

      return {
        todos: updatedTodos,
        length,
        pending,
        completed,
      };
    }

    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload)
          return { ...todo, completed: !todo.completed };

        return todo;
      });

      const completed = updatedTodos.filter((todo) => todo.completed).length;
      const pending = state.length - completed;

      return {
        ...state,
        todos: updatedTodos,
        pending,
        completed,
      };
    }

    default:
      return state;
  }
};
