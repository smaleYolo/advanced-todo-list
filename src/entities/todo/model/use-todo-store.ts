import {create} from "zustand";
import {default as axios} from "axios";
import type {StateCreator} from "zustand/vanilla";
import {createJSONStorage, persist} from "zustand/middleware";

export type FilterType = "all" | "completed" | "in-progress";

export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;

  // Флаг удаления таски для анимации
  deleting?: boolean;
}

interface IActions {
  fetchTodos: () => Promise<void>;
  addTodo: (todo: string) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  setFilter: (filter: FilterType) => void;
}

interface IComputed {
  filteredTodos: () => ITodo[];
  totalCount: () => number;
  completedCount: () => number;
}

interface IInitialState {
  todos: ITodo[];
  filter: FilterType;
  isLoading: boolean;
}

interface ITodoState extends IActions, IComputed, IInitialState {
}

const initialState: IInitialState = {
  todos: [],
  filter: 'all',
  isLoading: false,
}

const todoStore: StateCreator<
  ITodoState,
  [["zustand/persist", unknown]]
> = (set, get) => ({
  ...initialState,

  setFilter: (filter) => set({filter}),

  fetchTodos: async () => {
    try {
      set({isLoading: true})
      const response = await axios('https://dummyjson.com/todos?limit=10&skip=0');
      set({todos: response.data.todos});
    } catch (e) {
      console.error(e);
    } finally {
      set({isLoading: false})
    }
  },

  addTodo: async (text: ITodo['todo']) => {
    set((state) => ({
      todos: [{id: 777, todo: text, completed: false, userId: 777}, ...state.todos]
    }))
    try {
      const response = await axios.post(`https://dummyjson.com/todos/add`, {
        todo: text,
        completed: false,
        userId: 1
      });
      set((state) => ({
        todos: state.todos.map(t => t.id === 777 ? {...t, id: response.data.id} : t)
      }))
    } catch (e) {
      console.error(e);
      set((state) => ({
        todos: state.todos.filter(t => t.id !== 777)
      }));
    }
  },

  toggleTodo: async (id: ITodo['id']) => {
    const current = get().todos.find((todo => todo.id === id))
    if (!current) return;

    const updated = {...current, completed: !current.completed}

    set((state) => ({
      todos: state.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    }))

    try {
      const res = await axios.put(`https://dummyjson.com/todos/${id}`, {
        completed: updated.completed,
      });
      set((state) => ({
        todos: state.todos.map(todo => todo.id === id ? {...todo, ...res.data} : todo)
      }))
    } catch (e) {
      console.error(e)
      set((state) => ({
        todos: state.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
      }))
    }
  },

  removeTodo: async (id: ITodo['id']) => {
    set((state) => ({
      todos: state.todos.map(todo => (todo.id === id ? {...todo, deleting: true} : todo))
    }))

    setTimeout(() => {
      set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      }));
    }, 300);

    try {
      await axios.delete(`https://dummyjson.com/todos/${id}`);
    } catch (e) {
      console.error(e);
    }
  },

  filteredTodos: () => {
    const {todos, filter} = get();
    switch (filter) {
      case "completed":
        return todos.filter((t) => t.completed);
      case "in-progress":
        return todos.filter((t) => !t.completed);
      default:
        return todos;
    }
  },

  totalCount: () => {
    const {todos} = get()
    return todos.length;
  },

  completedCount: () => {
    const {todos} = get()
    return todos.filter((t) => t.completed).length;
  }
})

export const useTodoStore = create<ITodoState>()(
  persist(todoStore, {
    name: 'todo-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      todos: state.todos,
      filter: state.filter,
    }),
  })
);

//Selectors
export const useTodoList = () => useTodoStore(state => state.todos)
export const filteredTodos = () => useTodoStore.getState().filteredTodos()
export const useTodoListLoading = () => useTodoStore(state => state.isLoading)
export const fetchTodos = () => useTodoStore.getState().fetchTodos()
export const completeTodo = (id: ITodo['id']) => useTodoStore.getState().toggleTodo(id)
export const deleteTodo = (id: ITodo['id']) => useTodoStore.getState().removeTodo(id)
export const addTodo = (text: ITodo['todo']) => useTodoStore.getState().addTodo(text)
export const useTotalCount = () => useTodoStore((s) => s.totalCount());
export const useCompletedCount = () => useTodoStore((s) => s.completedCount());


