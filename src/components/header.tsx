import {fetchTodos, useTodoStore} from "../store/use-todo-store.ts";

export const Header = () => {
  const {isLoading} = useTodoStore()

  return (
    <header className="todo-header">
      <div>
        <h1 className="todo-title">Мои задачи</h1>
        <p className="todo-subtitle">План на сегодня</p>
      </div>
      <button className="todo-add-btn" onClick={fetchTodos} disabled={isLoading}>
        {isLoading ? "Обновляем..." : "Обновить список"}
      </button>
    </header>
  )
};
