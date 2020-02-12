import React, { useState, useEffect } from 'react';
import './CssReset.css'
import SearchTodo from './components/searchTodo/SearchTodo'
import TodoList from './components/todoList/TodoList'
import AddTodo from './components/addTodo/AddTodo'
import BottomBar from './components/bottomBar/BottomBar'

import axios from 'axios'


const App = () => {

  const [todos, setTodos] = useState([{ id: 1, content: 'buy milk', status: false }, { id: 2, content: 'go shopping', status: true }]);

  const [searchKey, setSearchKey] = useState('')

  let [showFilteredTodos, setShowFiltered] = useState('all')

  async function getDataFromDB() {
    const response = await axios.get("http://localhost:5000");
    setTodos(response.data)
  }

  useEffect(() => {
    getDataFromDB()
  }, [])


  let filteredTodos = todos.filter(todo => todo.content.toLowerCase().includes(searchKey.toLowerCase()) &&
    ((showFilteredTodos === 'completed' && todo.status) ||
      (showFilteredTodos === 'active' && !todo.status) ||
      (showFilteredTodos === 'all')))


  async function addTodo(textTodo) {

    if (textTodo.trim()) {
      const newTodo = { id: Math.random(), content: textTodo, status: false }
      try {
        await axios.post('http://localhost:5000', newTodo);
        getDataFromDB();
      }
      catch (error) {
        console.log("Error: " + error)
      }
    }
  }

  async function deleteTodo(id) {

    const idToDelete = [...todos.filter(todo => todo.id === id)][0]._id;

    try {
      await axios.delete('http://localhost:5000/' + idToDelete)
      getDataFromDB()
    }
    catch (error) {
      console.log("Error: " + error)
    }
  }


  function changeStatus(id, target, status) {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.status = !todo.status
        sendChangedTodo(id, todo)
      }
      return todo
    })
    target.checked = !status;
    setTodos([...newTodos]);

    async function sendChangedTodo(id, todo) {
      const [todoToChange] = [...todos.filter(todo => todo.id === id)]
      try {
        await axios.put('http://localhost:5000/' + todoToChange._id)
        getDataFromDB()

      }
      catch (err) {
        console.log("Error: ", err)
      }
    }

  }

  const getSearchKey = (gotSearchKey) => {

    setSearchKey(gotSearchKey)
  }

  const showAll = () => {
    filteredTodos = todos;
    setShowFiltered('all')
  }

  const showActive = () => {
    filteredTodos = todos.filter(todo => todo.status === true)
    setShowFiltered('active')
  }

  const showCompleted = () => {

    filteredTodos = todos.filter(todo => todo.status === false)
    setShowFiltered('completed')
  }


  return (
    <div className="App">
      <main className="main-container">
        <h1 className="main-text">todos</h1>
        <div className="input-area">
          <SearchTodo getSearchKey={getSearchKey} />
          <TodoList todos={filteredTodos} deleteTodo={deleteTodo} changeStatus={changeStatus} />
          <AddTodo addTodo={addTodo} />
          <BottomBar showAll={showAll} showActive={showActive} showCompleted={showCompleted} />
        </div>
      </main>
    </div>
  )

}

export default App;
