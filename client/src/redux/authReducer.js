import { authAPI } from "../api/api";

export const storageName = "userData";
const LOADING = 'auth/LOADING';
const SET_USER_DATA = 'auth/SET_USER_DATA';
const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
const SET_ERRORS = 'auth/SET_ERRORS';
const CLEAR_ERRORS = 'auth/CLEAR_ERRORS';

const initialState = {
    isAuth: false,
    userData: null,
    loadingData: false,
    errors: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loadingData: action.boolean
            }

        case AUTH_SUCCESS:
            return {
                ...state,
                isAuth: action.boolean
            }

        case SET_USER_DATA:
            return {
                ...state,
                userData: action.data
            }

        case SET_ERRORS:
            return {
                ...state,
                errors: action.error
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            } 

        default:
            return state;
    }
}

//action creators
export const authActionCreator = boolean => {
    return {
        type: AUTH_SUCCESS,
        boolean
    }
}

const loadingData = boolean => {
    return {
        type: LOADING,
        boolean
    }
}

export const setUserData = data => {
    return {
        type: SET_USER_DATA,
        data
    }
}

const setErrors = error => {
    return {
        type: SET_ERRORS,
        error
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS        
    }
}
//thunks

export const registerThunk = data => {
    return async dispatch => {
        dispatch(loadingData(true));
        let response = await authAPI.signUp(data);
        if (response.res.status === 201) {
            let loginData = {email: data.email, password: data.password};
            dispatch(loginThunk(loginData));
        } else if(response.res.status === 400){
            dispatch(setErrors(response.serverData.message));
        }      
        dispatch(loadingData(false));
    }
}

export const loginThunk = data => {
    return async dispatch => {
        dispatch(loadingData(true)); 
        let response = await authAPI.signIn(data);
        if (response.res.status === 200) {
            let payload = {
                token: response.serverData.token,
                id: response.serverData.userId,
                email: response.serverData.email,
                firstName: response.serverData.firstName,
                lastName: response.serverData.lastName
            }
            dispatch(setUserData(payload));
            localStorage.setItem(storageName, JSON.stringify(payload));
            dispatch(authActionCreator(true));
        } else if(response.res.status === 400){
            dispatch(setErrors(response.serverData.message));
        } else if(response.res.status === 500) {
            dispatch(setErrors('Error on server side.'))
        }
        dispatch(loadingData(false));
    }
}

export const logOutThunk = () => {
    return dispatch => {
        localStorage.removeItem(storageName);
        dispatch(setUserData(null));
        dispatch(authActionCreator(false));
    }
}

export default authReducer;