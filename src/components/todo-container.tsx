import {AddForm} from "./add-form.tsx";
import {Filters} from "./filters.tsx";
import {List} from "./list.tsx";
import {useTodoStore} from "../store/use-todo-store.ts";
import {Footer} from "./footer.tsx";
import {Header} from "./header.tsx";

export const TodoContainer = () => {
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
      <Header/>
      <AddForm handleAdd={addTodo}/>
      <Filters currentFilter={filter} onFilterChange={setFilter}/>
      <List
        data={filteredTodos()}
        handleRemove={removeTodo}
        handleComplete={toggleTodo}
        isLoading={isLoading}
      />
      <Footer/>
    </main>
  );
};
