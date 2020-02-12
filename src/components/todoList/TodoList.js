import React from 'react'
import Todo from '../todo/Todo'

const TodoList = ({ todos, deleteTodo, changeStatus }) => {



  const todoList = todos.length ? (
    todos.map(todo => {

      return (
        <Todo todo={todo} deleteTodo={deleteTodo} changeStatus={changeStatus} key={todo.id} />
      )
    })
  ) : (
      <div></div>
    );


  return (
    <ul className="todo-list">
      {todoList}
    </ul>
  )
}



export default TodoList