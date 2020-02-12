import React from 'react'

const SearchTodo = ({ getSearchKey }) => {
  return (
    <form className="search-todo-form">
      <input name="searchInput" className="input-field" placeholder="Search for your todos" autoComplete="off" onChange={(e) => { getSearchKey(e.target.value) }}></input>
    </form>
  )
}



export default SearchTodo