import type {FilterType} from "../store/use-todo-store.ts";

type FiltersProps = {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: FilterType[] = ['all', 'completed', 'in-progress']

export const Filters = ({currentFilter, onFilterChange}: FiltersProps) => {

  return (
    <section className="todo-filters" aria-label="Фильтры задач">
      {FILTERS.map((filter) => {
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
