import "./App.css";
import {TodoContainer} from "./components/todo-container.tsx";

export default function App() {
  return (
    <div className="app-shell">
      <div className="background-blur"/>
      <TodoContainer/>
    </div>
  );
}
