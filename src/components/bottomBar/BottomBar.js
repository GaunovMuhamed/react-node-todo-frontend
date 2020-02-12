import React from 'react'



const BottomBar = ({ showAll, showActive, showCompleted }) => {
  return (
    <div className="bottom-menu">
      <div className="bottom-buttons">
        <h2 className="all-button" onClick={() => { showAll() }}>All</h2>
        <h2 className="active-button" onClick={() => { showActive() }}>Active</h2>
        <h2 className="completed-button" onClick={() => { showCompleted() }}>Completed</h2>
      </div>
    </div>
  )
}



export default BottomBar