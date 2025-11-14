const SKELETON_COUNT = 4;

export const TodoListSkeletons = () => {

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
  )
};
