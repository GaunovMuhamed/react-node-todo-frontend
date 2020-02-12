import React, { useState } from 'react'

const AddTodo = (props) => {

  const [todoText, setTodo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addTodo(todoText);

    setTodo('')
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input onChange={handleChange} name="addInput" className="input-field" placeholder="What needs to be done?" autoComplete="off" value={todoText} />
    </form>
  )
}



export default AddTodo