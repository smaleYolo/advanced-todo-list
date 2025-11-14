import "../App.css";
import {TodosPage} from "../pages/todos/todos-page.tsx";

export default function App() {
  return (
    <div className="app-shell">
      <div className="background-blur"/>
      <TodosPage />
    </div>
  );
}
