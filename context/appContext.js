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
    images: [],
    images_total_pages: 0,
    predict_list: [],
    histories: [],
    histories_total_pages: 1,
    histories_cur_page: 0,
    plants: [],
    organs: [],
    plant_details: {},
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

    const myFetch = axios.create({
        baseURL: 'https://besame-x2-mucho.onrender.com/api/v1'
    });
    const myAuthFetch = axios.create({
        baseURL: 'https://besame-x2-mucho.onrender.com/api/v1',
        headers: {
            'Authorization': `Bearer ${state?.user?.access_token}`
        }
    });

    const registerUser = async (currentUser) => {
        dispatch({ type: AC.REGISTER_USER_BEGIN });
        try {
            const response = await myFetch.post('/auth/register', currentUser);
            const user = response.data;
            await SecureStore.setItemAsync('access_token', user.access_token);
            dispatch({
                type: AC.REGISTER_USER_SUCCESS,
                payload: {
                    user,
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
            const response = await myFetch.post('/auth/login', currentUser);
            const user = response.data;
            await SecureStore.setItemAsync('access_token', user.access_token);
            dispatch({
                type: AC.LOGIN_USER_SUCCESS,
                payload: {
                    user,
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
        });
    };

    const updateUser = async (myUser) => {
        if (!state.user) return;
        dispatch({
            type: AC.UPDATE_USER_BEGIN,
        })
        try {
            let response = null
            if (myUser.img_uri) {
                const formData = new FormData();
                formData.append("image", {
                    uri: myUser.img_uri,
                    type: 'image/jpeg',
                    name: 'plant.jpeg',
                });
                response = await myAuthFetch.patch(`/users/${state.user.user._id}`, formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                });
            } else {
                response = await myAuthFetch.patch(`/users/${state.user.user._id}`, myUser);
            }
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
                const response = await myFetch.get('/users/my-info', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
                const { user } = response.data;
                userCombine = {
                    user,
                    access_token,
                }
                dispatch({ type: AC.GET_USER_SUCCESS, payload: { user: userCombine } });
            } catch (error) {
                dispatch({ type: AC.GET_USER_ERROR });
            }
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const setImageLib = (images, index) => {
        dispatch({
            type: AC.SET_IMAGE_LIB,
            payload: {
                images,
                index
            }
        })
    };
    const predictPlant = async (img_uri) => {
        dispatch({ type: AC.PREDICT_PLANT_BEGIN });

        const formData = new FormData();
        formData.append("image", {
            uri: img_uri,
            type: 'image/jpeg',
            name: 'plant.jpeg',
        });

        try {
            const response = await myAuthFetch.post('/predicts', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            const { predict_list } = response.data;
            dispatch({
                type: AC.PREDICT_PLANT_SUCCESS,
                payload: {
                    predict_list,
                },
            });
        } catch (error) {
            dispatch({
                type: AC.PREDICT_PLANT_ERROR,
                payload: { msg: error.response.data.message },
            });
        }
    };

    const getPlants = async (search) => {
        dispatch({ type: AC.GET_PLANTS_BEGIN });
        try {
            url = '/plants';
            if (search) {
                url += `?search=${search}`
            }
            const response = await myFetch.get(url);
            const { plants } = response.data;
            dispatch({ type: AC.GET_PLANTS_SUCCESS, payload: { plants } });
        } catch (error) {
            dispatch({ type: AC.GET_PLANTS_ERROR });
        }
    };

    const getPlant = async (plant_id) => {
        dispatch({ type: AC.GET_PLANT_BEGIN });
        try {
            const response = await myFetch.get(`/plants/${plant_id}`);
            const { plant, organs } = response.data;
            dispatch({ type: AC.GET_PLANT_SUCCESS, payload: { plant, organs } });
        } catch (error) {
            dispatch({ type: AC.GET_PLANT_ERROR });
        }
    };

    const getImages = async (plant_id, organ, page, isConcat) => {
        if (isConcat && page > state.images_total_pages)
            return;
        dispatch({ type: AC.GET_IMAGES_BEGIN, payload: { isConcat } });
        try {
            const response = await myFetch.get(`/plants/${plant_id}/image?organ=${organ}&page=${page}`);
            const { plant_imgs, total_pages } = response.data;
            dispatch({ type: AC.GET_IMAGES_SUCCESS, payload: { plant_imgs, total_pages } });
        } catch (error) {
            dispatch({ type: AC.GET_IMAGES_ERROR });
        }
    };

    const getHistories = async () => {
        if (state.histories_cur_page + 1 > state.histories_total_pages) {
            return;
        }
        dispatch({ type: AC.GET_HISTORIES_BEGIN, payload: { reset: state.histories_cur_page == 0 } });
        try {
            const response = await myAuthFetch.get(`/predicts?page=${state.histories_cur_page + 1}`);
            const { predicts, total_pages } = response.data;
            dispatch({ type: AC.GET_HISTORIES_SUCCESS, payload: { predicts, total_pages, page: state.histories_cur_page + 1 } });
        } catch (error) {
            dispatch({ type: AC.GET_HISTORIES_ERROR });
        }
    };

    return (
        <AppContext.Provider value={{
            ...state,
            displayAlert,
            clearAlert,
            switchRegisterLogin,
            registerUser,
            loginUser,
            setImageLib,
            logoutUser,
            predictPlant,
            getPlants,
            getPlant,
            getImages,
            getHistories,
            changePassword,
            updateUser,
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext };