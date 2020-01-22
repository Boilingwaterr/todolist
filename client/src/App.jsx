import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRoutes } from './routes';
import { authActionCreator, storageName, loginThunk, setUserData } from './redux/authReducer';
import Header from './components/Header';
import 'materialize-css';
import { getTaskThunk } from './redux/todoListReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';


const App = props => {
  
  const { authData, authActionCreator, setUserData, getTaskThunk } = props;

  useEffect(() => {
    if (authData.userData !== null){
      getTaskThunk(authData.userData.token);
    } 
  }, [getTaskThunk, authData.isAuth, authData.userData]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      setUserData(data);
      authActionCreator(true);
    }
  }, [authActionCreator, setUserData]);

  const routes = useRoutes({isAuth: authData.isAuth, location: props.location});

  if (authData.loadingData) {
    return  (
    <div className = "preloader-wrapper big active">
      <div className = "spinner-layer spinner-blue-only">
        <div className = "circle-clipper left">
          <div className = "circle"></div>
        </div><div className = "gap-patch">
          <div className = "circle"></div>
        </div><div className = "circle-clipper right">
          <div className = "circle"></div>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div>
      { authData.isAuth && <Header /> } 
      {routes}
    </div>
  );
}

let mapStateToProps = state => {
  return {
      authData: state.authData,
      todoListData: state.todoListData
  } 
}

export default compose(
  connect(mapStateToProps,{ 
    authActionCreator, loginThunk, 
    setUserData, getTaskThunk }),
  withRouter
  )(App);
