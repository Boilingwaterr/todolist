import React, { useState } from 'react';
import { connect } from 'react-redux';
import TaskBody from './TaskBody';
import { NavLink } from 'react-router-dom';
import TasksCreator from './form/TasksForm';
import { getTaskThunk, deleteTaskThunk, editTaskThunk } from '../redux/todoListReducer';

const TaskPage = props => {
  
  const { todoListData, deleteTaskThunk, authData, editTaskThunk, location } = props;

  const [editMode, setEditMode] = useState(false);
  
  const addTaskButton = !editMode && <NavLink 
    to = { location.pathname }
    className = "waves-effect waves-light deep-orange accent-2 btn"
    onClick = { e => setEditMode(true) }
    style = {{margin: 10}}
  >Add task
  </NavLink>

  switch (location.pathname) {
    case "/todolist":
      return (
        <>
          { addTaskButton }
          { editMode && <TasksCreator setEditMode = { setEditMode }/> }
          { todoListData.tasks !== null && todoListData.tasks.map(item => {
            return !item.isComplete && 
              <TaskBody 
                key = { item._id } 
                isImportant = { item.isImportant }
                title = { item.title }
                task = { item.task }
                date = { item.date }
                isComplete = { item.isComplete }
                owner = { item.owner }
                id = { item._id }
                deleteTaskThunk = { deleteTaskThunk }
                token = { authData.userData.token }
                editTaskThunk = { editTaskThunk }
                todoListData = { todoListData }
              /> 
          }) }
        </>
      );
    case "/important":
      return (
        <>
          { addTaskButton }
          { editMode && <TasksCreator setEditMode = { setEditMode }/> }
          { todoListData.tasks !== null && todoListData.tasks.map(item => {
            return !item.isComplete && item.isImportant &&
              <TaskBody 
                  key = { item._id } 
                  isImportant = { item.isImportant }
                  title = { item.title }
                  task = { item.task }
                  date = { item.date }
                  isComplete = { item.isComplete }
                  owner = { item.owner }
                  id = { item._id }
                  deleteTaskThunk = { deleteTaskThunk }
                  token = { authData.userData.token }
                  editTaskThunk = { editTaskThunk }
                  todoListData = { todoListData }
              /> 
          }) }
        </>
      );
    case "/completed":
      return (
        <>
          { addTaskButton }
          { editMode && <TasksCreator setEditMode = { setEditMode }/> }
          { todoListData.tasks !== null && todoListData.tasks.map(item => {
            return item.isComplete &&
              <TaskBody 
                key = { item._id } 
                isImportant = { item.isImportant }
                title = { item.title }
                task = { item.task }
                date = { item.date }
                isComplete = { item.isComplete }
                owner = { item.owner }
                id = { item._id }
                deleteTaskThunk = { deleteTaskThunk }
                token = { authData.userData.token }
                editTaskThunk = { editTaskThunk }
                todoListData = { todoListData }
              />
          }) }
        </>
      );
    default:
      break;
  }
}

let mapStateToProps = state => {
  return {
      authData: state.authData,
      todoListData: state.todoListData
  } 
}

export default connect(mapStateToProps,{ getTaskThunk, deleteTaskThunk, editTaskThunk })(TaskPage);
