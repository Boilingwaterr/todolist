import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderField } from './form/renderField';
import { loginThunk, clearErrors } from '../redux/authReducer';
import { NavLink } from 'react-router-dom';
import { useValidationMessages } from '../hooks/validationMessages.hook';
import { required, email } from './form/validators';

let AuthForm = props => {

    const { handleSubmit, authData, clearErrors } = props;

    const message = useValidationMessages();

    useEffect(() => {
        message(authData.errors);
        clearErrors();
    }, [message, authData.errors, clearErrors]);

    return <div className = "row center">
        <form className = "col s4 offset-s4  grey lighten-2"
            onSubmit = { handleSubmit }
        >
            <div className = "row">
                <div className = "input-field col s12">
                    <Field
                        name = "email"
                        id = "email"
                        type = "email"
                        className = "validate"
                        component = { renderField }
                        validate = { [required, email] }
                        label = "Email"
                        autocomplete = 'off'
                    />
                </div>
            </div>
            <div className = "row">
                <div className = "input-field col s12">
                    <Field
                        name = "password"
                        id = "password"
                        type = "password"
                        className = "validate"
                        component = { renderField }
                        validate = { [required] }
                        label = "Password"
                        autocomplete = 'off'
                    />
                </div>
            </div>
            <button 
                className = "btn waves-effect waves-light" 
                type = "submit" 
                name = "Signin"
                disabled = { authData.loadingData }
                style = {{margin: 10}}
            >Sign in
                <i className = "material-icons right"></i>
            </button>
            <NavLink className = "btn waves-effect waves-light"
                style = {{margin: 11}}
                to = 'signUp' 
            >Sign up
                <i className = "material-icons right"></i>
            </NavLink>
            {authData.loadingData && <div className="progress">
                <div className="indeterminate"></div>
            </div>}
            
        </form>        
    </div>
}

AuthForm = reduxForm({
    form: 'authForm' // a unique identifier for this form
})(AuthForm)

const AuthPage = props => {

    const handleSubmit = values => {
        let email = values.email.toLowerCase();
        const PayLoad = {email, password : values.password};
        props.loginThunk(PayLoad);
    }

    return <AuthForm onSubmit = { handleSubmit } {...props}/>

}

let mapStateToProps = state => {
    return {
        authData: state.authData
    }
}

export default connect(mapStateToProps, { loginThunk, clearErrors })(AuthPage);