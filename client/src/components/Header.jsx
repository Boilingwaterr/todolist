import React from 'react';
import { logOutThunk } from '../redux/authReducer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTasksActionCreator } from '../redux/todoListReducer';

const Header =  props => {
  
  const { logOutThunk, authData, getTasksActionCreator } = props;

  return (<>
    <nav className = "nav-extended  teal lighten-1">
      <div className = "nav-wrapper">
        <NavLink to = "/" className = "brand-logo">Logo</NavLink>
        <ul id= "nav-mobile" className = "right hide-on-med-and-down">
          <li>
            <NavLink to = "/Profile">
              {authData.userData ? `${authData.userData.firstName} ${authData.userData.lastName}` 
                : 'Profile'}
            </NavLink>
          </li>
          <li><NavLink to = "/" onClick = { e => {
            getTasksActionCreator(null);
            logOutThunk()
            }}>Logout</NavLink></li>
        </ul>
      </div> 
      <div className = "nav-content">
        <ul className = "tabs tabs-transparent">
          <li className = "tab"><NavLink to = "/todolist">All</NavLink></li>
          <li className = "tab"><NavLink to = "/important">Important</NavLink></li>
          <li className = "tab"><NavLink to = "/completed">Completed</NavLink></li>
        </ul>
      </div>
    </nav>
  </>
  );
}

let mapStateToProps = state => {
  return {
      authData: state.authData
  } 
}

export default connect(mapStateToProps,{ logOutThunk, getTasksActionCreator })(Header);
