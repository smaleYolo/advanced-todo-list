import {useCompletedCount, useTotalCount} from "../store/use-todo-store.ts";

export const Footer = () => {
  const total = useTotalCount()
  const completed = useCompletedCount()

  return (
    <footer className="todo-footer">
      <p className="todo-summary">
        {total} {total === 1 ? "задача" : total < 5 ? "задачи" : "задач"} • {completed} выполнено
      </p>
      {/*<button className="clear-btn" type="button">*/}
      {/*  Очистить выполненные*/}
      {/*</button>*/}
    </footer>
  )
};
