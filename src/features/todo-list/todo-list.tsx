import type {ITodo} from "../../entities/todo/model/use-todo-store.ts";
import {TodoListSkeletons} from "./ui/todo-list-skeletons.tsx";
import {TodoListEmpty} from "./ui/todo-list-empty.tsx";

type ListProps = {
  data: ITodo[];
  handleRemove: (id: number) => void;
  handleComplete: (id: number) => void;
  isLoading: boolean;
};


export const TodoList = ({data, handleRemove, handleComplete, isLoading}: ListProps) => {
  if (isLoading) {
    return (
      <TodoListSkeletons/>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <TodoListEmpty/>
    );
  }

  return (
    <ul className="todo-list">
      {data.map(todo => {
        const todoClasses = [
          "todo-item",
          todo.completed && "is-completed",
          todo.deleting && "deleting"
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li className={todoClasses} key={todo.id}>
            <label className="todo-check">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleComplete(todo.id)}
                disabled={todo.deleting}
              />
              <span className="checkmark" aria-hidden/>
            </label>
            <div className="todo-content">
              <p className="todo-text">{todo.todo}</p>
            </div>
            <div className="todo-actions">
              <button
                className="icon-btn danger"
                onClick={() => handleRemove(todo.id)}
                type="button"
                aria-label="Удалить"
              >
                🗑
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
