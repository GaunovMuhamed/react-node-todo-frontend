import React from 'react'

const Todo = ({ todo, deleteTodo, changeStatus }) => {


  return (
    <li id={todo.id} className={todo.status ? "new-todo-done" : "new-todo"} key={todo.id}>
      <div className="todo-container" onClick={(e) => { changeStatus(todo.id, e.target.parentElement.children[0], todo.status) }}>
        <input defaultChecked={todo.status} type="checkbox" className="checkbox"></input>
        <span className="custom-checkbox"></span>
        <h2 className="todo-text">{todo.content}</h2>
      </div>
      <div className="delete-button" onClick={(e) => { deleteTodo(todo.id) }}></div>
    </li>
  )
}



export default Todo