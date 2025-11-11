import type {ITodo} from "../store/use-todo-store.ts";

type ListProps = {
  data: ITodo[];
  handleRemove: (id: number) => void;
  handleComplete: (id: number) => void;
  isLoading: boolean;
};

const SKELETON_COUNT = 4;

export const List = ({data, handleRemove, handleComplete, isLoading}: ListProps) => {
  if (isLoading) {
    return (
      <ul className="todo-list">
        {Array.from({length: SKELETON_COUNT}).map((_, idx) => (
          <li key={idx} className="todo-item skeleton">
            <div className="skeleton-check" aria-hidden/>
            <div className="skeleton-body">
              <div className="skeleton-line short"/>
              <div className="skeleton-line"/>
            </div>
            <div className="skeleton-action"/>
          </li>
        ))}
      </ul>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <div className="todo-empty">
        <div className="todo-empty-icon" aria-hidden>📝</div>
        <h2 className="todo-empty-title">Здесь пока пусто</h2>
        <p className="todo-empty-text">
          Добавь первую задачу, чтобы начать.
        </p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {data.map(todo => {
        const todoClasses = [
          "todo-item",
          todo.completed && "is-completed",
          (todo as any).deleting && "deleting"
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
