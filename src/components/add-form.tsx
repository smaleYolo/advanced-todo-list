import {useState} from "react";
import * as React from "react";

type AddFormProps = {
  handleAdd: (todo: string) => void;
}

export const AddForm = ({handleAdd}: AddFormProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleAddTodo = () => {
    const trimmedValue = inputValue.trim()
    if (!trimmedValue) return;

    handleAdd(inputValue)
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <section className="todo-add">
      <label className="todo-input-group">
        <span className="visually-hidden">Новая задача</span>
        <input
          className="todo-input"
          type="text"
          placeholder="Что нужно сделать?"
          autoComplete="off"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </label>
      <button className="todo-add-btn" type="button" onClick={handleAddTodo}>
        Добавить
      </button>
    </section>
  )
};
