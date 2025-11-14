import {AddTodoForm} from "../../../features/add-todo/add-todo-form.tsx";
import {Filters} from "../../../features/todo-filters/todo-filters.tsx";
import {TodoList} from "../../../features/todo-list/todo-list.tsx";
import {useTodoStore} from "../../../entities/todo/model/use-todo-store.ts";
import {TodoFooter} from "./todo-footer.tsx";
import {TodoHeader} from "./todo-header.tsx";

export const TodoCard = () => {
  const {
    addTodo,
    filter,
    setFilter,
    filteredTodos,
    removeTodo,
    toggleTodo,
    isLoading
  } = useTodoStore()

  return (
    <main className="todo-card" aria-label="Todo list">
      <TodoHeader/>
      <AddTodoForm handleAdd={addTodo}/>
      <Filters currentFilter={filter} onFilterChange={setFilter}/>
      <TodoList
        data={filteredTodos()}
        handleRemove={removeTodo}
        handleComplete={toggleTodo}
        isLoading={isLoading}
      />
      <TodoFooter/>
    </main>
  );
};
