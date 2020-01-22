import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const TaskBodyEditMode = props => {

  const { 
    date, isComplete, token, 
    id, editTaskThunk, setEditMode, todoListData
  } = props;

  const [title, setTitleText] = useState(props.title);
  const [task, setBodyText] = useState(props.task);
  const [isImportant, setIsImportant] = useState(props.isImportant);
  

  const changeTitleHandler = event => {
    setTitleText(event.currentTarget.value);
  }

  const changeBodyHandler = event => {
    setBodyText(event.currentTarget.value);
  }

  const changeSelectHandler = event => {
    setIsImportant(event.currentTarget.value)
  }

  return (
    <>
      <div className = "col s12 m12">
        <div className = "card blue-grey darken-1">
          <div className = "card-content white-text">
            <span style = {{ fontSize: 14, color: '#90a4ae' }}>{`Task was created: ${date}`}</span>
            <input 
              type = 'text'
              name = 'title'
              onChange = { e => changeTitleHandler(e) }
              className = "card-title"
              value = { title }
              style = {{color: '#ffffff'}}
            ></input>
            <input 
              type = 'text'
              name = 'task'
              onChange = { e => changeBodyHandler(e) }
              value = { task }
              style = {{color: '#ffffff'}}
            ></input>
            <div className = "input-field col s12" style = {{padding: 0}}>
              <label style = {{position: 'relative', left: 0}}>Is important?</label>
              <select 
                style = {{display: 'block'}} 
                onChange = { e => changeSelectHandler(e)}
                value = { isImportant }
              >
                <option value =  {false } >Task is not important.</option>
                <option value = { true } >Task is important.</option>
              </select>
            </div>
          </div>
          <div 
            className = "card-action"
            style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
          >
            <div>
              <NavLink to = "#" onClick = {e => editTaskThunk({
                id, title, task, isImportant, isComplete: true
                })}>
                Mark as completed
              </NavLink>
            </div>
            <div>
              <NavLink to = "#" onClick = {e => {
                editTaskThunk({id, title, task, isImportant, isComplete}, token);
                !todoListData.loadingData && setEditMode(false);
              }}>
                Save
              </NavLink>
              <NavLink to = "#" onClick = {e => setEditMode(false) }>
                Exit
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskBodyEditMode;
