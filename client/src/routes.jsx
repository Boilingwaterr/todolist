import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TaskPage from './components/TaskPage';
import AuthPage from './components/AuthComponent';
import RegistrationPage from './components/RegistrationPage';

export const useRoutes = ({isAuth, location}) => {

    if(isAuth){
        return(
            <Switch>
                <Route path = "/todolist" exact>
                    <TaskPage location = { location } />
                </Route>  
                <Route path = "/important" exact>
                    <TaskPage location = { location } />
                </Route>  
                <Route path = "/completed" exact>
                    <TaskPage location = { location } />
                </Route>  

                <Redirect from = "*" to = "/todolist" />
            </Switch>                
        )
    }

    return (
        <Switch>
            <Route path = "/" component = { AuthPage } exact/>

            <Route path = "/signUp" component = { RegistrationPage }/>

            <Redirect to = '/'/>
        </Switch>  
    )
}
