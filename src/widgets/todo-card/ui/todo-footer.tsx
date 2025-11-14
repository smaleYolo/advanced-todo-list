import {useCompletedCount, useTotalCount} from "../../../entities/todo/model/use-todo-store.ts";

export const TodoFooter = () => {
  const total = useTotalCount()
  const completed = useCompletedCount()

  const isOne = total === 1;
  const isFew = total > 1 && total < 5;

  const tasksLabel = isOne ? "задача" : isFew ? "задачи" : "задач";

  return (
    <footer className="todo-footer">
      <p className="todo-summary">
        {total} {tasksLabel} • {completed} выполнено
      </p>
      {/*<button className="clear-btn" type="button">*/}
      {/*  Очистить выполненные*/}
      {/*</button>*/}
    </footer>
  )
};
