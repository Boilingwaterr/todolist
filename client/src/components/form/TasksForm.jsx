import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { renderField } from './renderField';
import { Field, reduxForm } from 'redux-form';
import { useValidationMessages } from '../../hooks/validationMessages.hook';
import { addTaskThunk, clearErrors } from '../../redux/todoListReducer';

let TasksForm = props => {
  
  const { handleSubmit,todoListData, clearErrors } = props

  const message = useValidationMessages();
  useEffect(() => {
    message(todoListData.errors);
    // clearErrors();
  }, [message, todoListData.errors, clearErrors]);

  return (
    <div className = "row">
    <form className = "col s12" onSubmit = { handleSubmit }>      
      <div className = "row">
        <div className = "input-field col s12">
          <Field 
            name = "title"
            id = "title" 
            type = "text" 
            className = "validate"
            component = { renderField }
            label = "Task Title "
            autocomplete = 'off'
          />
        </div>
      </div>
      <div className = "row">
        <div className = "input-field col s12">
          <Field 
            name = "task"
            id = "task" 
            type = "text" 
            className = "validate"
            component = { renderField }
            autocomplete = 'off'
            label = "Task: "
          />
        </div>
      </div>
      <div className = "row">
        <div className = "input-field col s12">
          <label style = {{position: 'relative', left: 0}}>Is important?</label>
          <Field 
            style = {{display: 'block'}}
            name = "isImportant" 
            component = "select"
          >
            <option />
            <option value = { false } >Task not important</option>
            <option value = { true } >Task is important</option>
           
          </Field>
        </div>
      </div>

      <button 
        className = "waves-effect waves-light btn"
      >Submit
      </button>
    </form>
  </div>
  );
}

TasksForm = reduxForm({
  form: "tasksForm"
})(TasksForm);

const TasksCreator = props => {

  const handleSubmit = values => {
    props.addTaskThunk(values, props.authData.userData.id, props.authData.userData.token);
    if(!props.todoListData.loadingData && props.todoListData.errors === null) 
      props.setEditMode(false);
  }

  return <TasksForm onSubmit = { handleSubmit } { ...props }/>
}

let mapStateToProps = state => {
  return {
      authData: state.authData,
      todoListData: state.todoListData
  } 
}

export default connect(mapStateToProps,{ addTaskThunk, clearErrors })(TasksCreator);
