import { createContext, useContext, useEffect, useReducer } from 'react';

import reducer from './reducer';
import * as AC from './action';

import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

const initialState = {
    isMember: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    myAuthFetch: null,
    myFetch: axios.create({
        baseURL: 'https://besame-x2-mucho.onrender.com/api/v1'
    }),
};

const AppContext = createContext();

function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: AC.DISPLAY_ALERT });
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: AC.CLEAR_ALERT });
        }, 1500);
    };

    const switchRegisterLogin = () => {
        dispatch({ type: AC.SWITCH_REGISTER_LOGIN });
    }

    const myAuthFetch = axios.create({
        baseURL: 'https://besame-x2-mucho.onrender.com/api/v1',
        headers: {
            'Authorization': `Bearer ${state?.user?.access_token}`
        }
    });

    const registerUser = async (currentUser) => {
        dispatch({ type: AC.REGISTER_USER_BEGIN });
        try {
            const response = await state.myFetch.post('/auth/register', currentUser);
            const user = response.data;
            await SecureStore.setItemAsync('access_token', user.access_token);
            dispatch({
                type: AC.REGISTER_USER_SUCCESS,
                payload: {
                    user, myAuthFetch: axios.create({
                        baseURL: 'https://besame-x2-mucho.onrender.com/api/v1',
                        headers: {
                            'Authorization': `Bearer ${user.access_token}`
                        }
                    })
                },
            });
        } catch (error) {
            dispatch({
                type: AC.REGISTER_USER_ERROR,
                payload: { msg: error.response.data.message },
            });
        }
        clearAlert();
    };

    const loginUser = async (currentUser) => {
        dispatch({ type: AC.LOGIN_USER_BEGIN });
        try {
            const response = await state.myFetch.post('/auth/login', currentUser);
            const user = response.data;
            await SecureStore.setItemAsync('access_token', user.access_token);
            dispatch({
                type: AC.LOGIN_USER_SUCCESS,
                payload: {
                    user, myAuthFetch: axios.create({
                        baseURL: 'https://besame-x2-mucho.onrender.com/api/v1',
                        headers: {
                            'Authorization': `Bearer ${user.access_token}`
                        }
                    })
                },
            });
        } catch (error) {
            dispatch({
                type: AC.LOGIN_USER_ERROR,
                payload: { msg: error.response.data.message },
            });
        }
        clearAlert();
    };

    const logoutUser = async () => {
        await SecureStore.deleteItemAsync('access_token')
        dispatch({
            type: AC.LOGOUT_USER,
            payload: {
                initialState,
            },
        });
    };

    const updateUser = async (myUser) => {
        if (!state.user) return;
        dispatch({
            type: AC.UPDATE_USER_BEGIN,
        })
        try {
            const response = await myAuthFetch.patch(`/users/${state.user.user.id}`, myUser);
            const { user } = response.data;
            userCombine = {
                user,
                access_token: state.user.access_token,
            }
            dispatch({ type: AC.UPDATE_USER_SUCCESS, payload: { user: userCombine } });
        } catch (error) {
            dispatch({ type: AC.UPDATE_USER_ERROR, payload: { msg: error.response.data.message } });
        }
        clearAlert();
    };

    const changeAvatar = (img_uri) => {
        dispatch({ type: AC.CHANGE_AVATAR, payload: { img_uri } });
    };

    const changePassword = async (cur_password, new_password) => {
        if (!state.user) return;
        dispatch({
            type: AC.CHANGE_PASSWORD_BEGIN,
        })
        try {
            const response = await myAuthFetch.post('/auth/change-password', {
                cur_password, new_password
            });
            const { message } = response.data;
            dispatch({ type: AC.CHANGE_PASSWORD_SUCCESS, payload: { msg: message } });
        } catch (error) {
            dispatch({ type: AC.CHANGE_PASSWORD_ERROR, payload: { msg: error.response.data.message } });
        }
        clearAlert();
    };

    const getUser = async () => {
        const access_token = await SecureStore.getItemAsync('access_token');
        if (access_token) {
            dispatch({
                type: AC.GET_USER_BEGIN,
            })
            try {
                const response = await state.myFetch.get('/users/my-info', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                const { user } = response.data;
                userCombine = {
                    user,
                    access_token,
                }
                dispatch({
                    type: AC.GET_USER_SUCCESS, payload: {
                        user: userCombine, myAuthFetch: axios.create({
                            baseURL: 'https://besame-x2-mucho.onrender.com/api/v1',
                            headers: {
                                'Authorization': `Bearer ${access_token}`
                            }
                        })
                    }
                });
            } catch (error) {
                dispatch({ type: AC.GET_USER_ERROR });
            }
        }
    };

    const forgotPassword = async (email) => {
        dispatch({ type: AC.FORGOT_PASSWORD_BEGIN });
        try {
            await state.myFetch.post('/auth/forgot-password', {
                email,
            });
            dispatch({
                type: AC.FORGOT_PASSWORD_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: AC.FORGOT_PASSWORD_ERROR,
                payload: { msg: error.response.data.message },
            });
        }
        clearAlert();
    };

    const resetPassword = async (email, token, password) => {
        dispatch({ type: AC.RESET_PASSWORD_BEGIN });
        try {
            await state.myFetch.post('/auth/reset-password', {
                email, token, password,
            });
            dispatch({
                type: AC.RESET_PASSWORD_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: AC.RESET_PASSWORD_ERROR,
                payload: { msg: error.response.data.message },
            });
        }
        clearAlert();
    };

    return (
        <AppContext.Provider value={{
            ...state,
            displayAlert,
            clearAlert,
            switchRegisterLogin,
            registerUser,
            loginUser,
            logoutUser,
            changePassword,
            updateUser,
            getUser,
            changeAvatar,
            resetPassword,
            forgotPassword,
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext };