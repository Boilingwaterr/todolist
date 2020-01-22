import { todoListAPI } from "../api/api";

const LOADING = 'todoList/LOADING';
const SET_ERRORS = 'todoList/SET_ERRORS';
const DELETE_ERRORS = 'todoList/DELETE_ERRORS';
const GET_TASKS = 'todoList/GET_TASKS';

const initialState = {
    tasks: null,
    loadingData: false,
    errors: null
}

const todoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loadingData: action.boolean
            }

        case SET_ERRORS:
            return {
                ...state,
                errors: action.error
            }

        case DELETE_ERRORS:
            return {
                ...state,
                errors: null
            }

        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state;
    }
}

//action creators
const loadingData = boolean => {
    return {
        type: LOADING,
        boolean
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
        type: DELETE_ERRORS
    }
}

export const getTasksActionCreator = payload => {
    return {
        type: GET_TASKS,
        payload
    }
}

//thunks
export const addTaskThunk = (data, userId, token) => {
    return async dispatch => {
        dispatch(loadingData(true));
        let payload = {data, userId}
        let response = await todoListAPI.addTask(payload, token);
        if (response.res.status === 201) {
            console.log(`task: has been created`);
            dispatch(clearErrors());
            dispatch(getTaskThunk(token));
        } else if (response.res.status === 400) {
            console.log(response.serverData.message)
            dispatch(setErrors(response.serverData.message));
        }
        dispatch(loadingData(false));
    }
}

export const getTaskThunk = token => {
    return async dispatch => {
        dispatch(loadingData(true));
        let response = await todoListAPI.getTasks(token);
        if (response.res.status === 200) {
            dispatch(getTasksActionCreator(response.serverData.reverse()));
        } else if(response.res.status === 401) {
            // dispatch(setErrors(response.serverData.message));
        }
        dispatch(loadingData(false));
    }
}

export const deleteTaskThunk = (id, token) => {
    return async dispatch => {
        dispatch(loadingData(true));
        let response = await todoListAPI.deleteTask({ id }, token);
        if (response.res.status === 200) {
            dispatch(getTaskThunk(token));
        } else if(response.res.status === 400) {
            // dispatch(setErrors(response.serverData.message));
        }
        dispatch(loadingData(false));
    }
}

export const editTaskThunk = (payload, token) => {
    return async dispatch => {
        dispatch(loadingData(true));
        let response = await todoListAPI.editTask(payload);
        if (response.res.status === 200) {
            dispatch(getTaskThunk(token));
        } else if(response.res.status === 400) {
            // dispatch(setErrors(response.serverData.message));
        }
        dispatch(loadingData(false));
    }
}


export default todoListReducer;