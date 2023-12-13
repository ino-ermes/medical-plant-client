import { createContext, useContext, useEffect, useReducer } from 'react';

import reducer from './reducer';
import * as AC from './action';

import axios from 'axios';

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: {a: 'a'},
};

const AppContext = createContext();

function AppProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({type: AC.DISPLAY_ALERT});
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: AC.CLEAR_ALERT});
        }, 1500);
    };

    const registerUser = async (currentUser) => {
        dispatch({type: AC.REGISTER_USER_BEGIN});
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser);
            const {user} = response.data;
            dispatch({
                type: AC.REGISTER_USER_SUCCESS,
                payload: {
                    user,
                },
            });
        } catch (error) {
            dispatch({
                type: AC.REGISTER_USER_ERROR,
                payload: {msg: error.response.data.msg},
            });
        }
        clearAlert();
    };

    const loginUser = async (currentUser) => {
        dispatch({type: AC.LOGIN_USER_BEGIN});
        try {
            const response = await axios.post('/api/v1/auth/login', currentUser);
            const {user} = response.data;
            dispatch({
                type: AC.LOGIN_USER_SUCCESS,
                payload: {
                    user,
                },
            });
        } catch (error) {
            dispatch({
                type: AC.LOGIN_USER_ERROR,
                payload: {msg: error.response.data.msg},
            });
        }
        clearAlert();
    };
    return (
        <AppContext.Provider value={{...state,
            displayAlert,
            clearAlert,
            registerUser,
            loginUser,
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext };