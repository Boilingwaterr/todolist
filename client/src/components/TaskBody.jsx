import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import TaskBodyEditMode from './TaskBodyEditMode';
let cardStyle = "card blue-grey lighten-1";

const TaskBody = props => {
  
  const { 
    title, task, date, 
    isImportant, isComplete, deleteTaskThunk, 
    token, id, editTaskThunk 
  } = props;

  const clientDate = new Date(date);

  const [editMode, setEditMode] = useState(false);
  
  if (isComplete){
    cardStyle = "card-content blue-grey lighten-3"  
  } else if (isImportant) {
    cardStyle = "card-content deep-orange accent-2" 
  } else if (!isImportant && !isComplete) {
    cardStyle = "card-content blue-grey"
  }

  return (
    <div className = "row">
      {!editMode ? <div className = "col s12 m12">
      <div className = 'card blue-grey'>
          <div className = { cardStyle }>
            <span className = "card-title white-text">{ title }</span>
            <p className = "white-text">{ task }</p>
          </div>
          <div 
            className = "card-action"
            style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
          >
            <div style = {{ display: "flex", flexDirection: "column" }}>
              <span style = {{ fontSize: 14, color: '#90a4ae' }}>
                {`Task was created: ${clientDate}`}
              </span>
              {isComplete 
              ? <NavLink to = "#" onClick = {e => editTaskThunk({
                id, title, task, isImportant, isComplete: false
                }, token)}>
                Mark as UNCOMPLETED
              </NavLink>
              : <NavLink to = "#" onClick = {e => editTaskThunk({
                id, title, task, isImportant, isComplete: true
                }, token)}>
                Mark as COMPLETED
              </NavLink>
              }
            </div>
            <div style = {{ display: "flex", flexDirection: "column" }}>
              <NavLink to = "#" onClick = {e => setEditMode(true)}>
                Edit task
              </NavLink>
              <NavLink to = "#" onClick = {e => deleteTaskThunk(id, token)}>
                Delete task
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      : <TaskBodyEditMode { ...props } setEditMode = { setEditMode }/>
      }
    </div>
  );
}

export default TaskBody;
