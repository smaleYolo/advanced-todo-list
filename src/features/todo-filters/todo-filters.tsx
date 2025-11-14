import type {FilterType} from "../../entities/todo/model/use-todo-store.ts";

type FiltersProps = {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void;
}

export const Filters = ({currentFilter, onFilterChange}: FiltersProps) => {
  const TodoFilters: FilterType[] = ['all', 'completed', 'in-progress']

  return (
    <section className="todo-filters" aria-label="Фильтры задач">
      {TodoFilters.map((filter) => {
        const filterClasses =
          currentFilter === filter ? "filter-btn is-active" : "filter-btn";

        return (
          <button
            key={filter}
            className={filterClasses}
            type="button"
            onClick={() => onFilterChange(filter)}
          >
            {filter === "all" ? "Все" : filter === "completed" ? "Выполненные" : "Активные"}
          </button>
        );
      })}
    </section>
  )
};
