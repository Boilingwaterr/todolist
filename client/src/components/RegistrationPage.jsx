import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderField } from './form/renderField';
import { registerThunk, loginThunk, clearErrors } from '../redux/authReducer';
import { NavLink } from 'react-router-dom';
import { useValidationMessages } from '../hooks/validationMessages.hook';
import { minLength, required, email } from './form/validators';

const minLength6 = minLength(6);

let RegistrationForm = props => {

    const { handleSubmit, authData, clearErrors } = props;

    const message = useValidationMessages();

    useEffect(() => {
        message(authData.errors);
        clearErrors();
    }, [message, authData.errors, clearErrors]);

    return <div className="row ">
        <form className="col s6 offset-s3 grey lighten-2"
            onSubmit={handleSubmit}
        >
            <div className="row">
                <div className="input-field col s6">
                    <Field
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="validate"
                        component={renderField}
                        validate = {[required]}
                        label="First name"
                        autocomplete='off'
                    />
                </div>
                <div className="input-field col s6">
                    <Field
                        name="lastName"
                        id="lastName"
                        type="text"
                        className="validate"
                        component={renderField}
                        validate = {[required]}
                        label="Last name"
                        autocomplete='off'
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <Field
                        name="email"
                        id="email"
                        type="email"
                        className="validate"
                        component={renderField}
                        validate = {[required, email]}
                        label="Email"
                        autocomplete='off'
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <Field
                        name="password"
                        id="password"
                        type="password"
                        className="validate"
                        component={renderField}
                        validate = {[required, minLength6]}
                        label="Password"
                        autocomplete='off'
                    />
                </div>
            </div>
            <div className="col s12" style = {{display: "flex", flexDirection: "column"}}>
                <button className="btn waves-effect waves-light"
                    type="submit"
                    name="Signup"
                    disabled = { authData.loadingData }
                    style={{ 
                        margin: 10,
                        width: '40%'
                    }}
                >Sign up
                    <i className="material-icons right"></i>
                </button>
                <NavLink
                    style = {{
                        color: '#4db6ac',
                        margin: 10,
                        width: '40%',
                        fontSize: 18
                    }}
                    to = "/">
                    <i>Already have an account.</i>
                </NavLink>
            </div>
            {authData.loadingData && <div className="progress">
                <div className="indeterminate"></div>
            </div>}
        </form>
    </div>
}

RegistrationForm = reduxForm({
    form: 'registrationForm' // a unique identifier for this form
})(RegistrationForm)

const RegistrationPage = props => {

    const handleSubmit = values => {
        let email = values.email.toLowerCase();
        const PayLoad = {
            firstName: values.firstName,
            lastName: values.lastName,
            email, password : values.password};
        props.registerThunk(PayLoad);
    }

    return <>
        <RegistrationForm onSubmit = { handleSubmit } { ...props }/>
    </>
}

let mapStateToProps = state => {
    return {
        authData: state.authData
    }
}

export default connect(mapStateToProps, { registerThunk, loginThunk, clearErrors })(RegistrationPage);


