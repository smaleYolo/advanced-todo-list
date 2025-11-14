export const TodoListEmpty = () => {

  return (
    <div className="todo-empty">
      <div className="todo-empty-icon" aria-hidden>📝</div>
      <h2 className="todo-empty-title">Здесь пока пусто</h2>
      <p className="todo-empty-text">
        Добавь первую задачу, чтобы начать.
      </p>
    </div>
  )
};
