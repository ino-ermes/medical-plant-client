import * as AC from './action'

export default function reducer(state, action) {
    switch (action.type) {
        case AC.DISPLAY_ALERT:
            return { ...state, showAlert: true, alertType: 'success', alertText: 'Success' };
        case AC.CLEAR_ALERT:
            return { ...state, showAlert: false, alertType: '', alertText: '' };
        case AC.SWITCH_REGISTER_LOGIN:
            return { ...state, isMember: !state.isMember };
        case AC.REGISTER_USER_BEGIN:
            return { ...state, isLoading: true };
        case AC.REGISTER_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload.user, isMember: true, showAlert: true, alertType: 'success', alertText: 'Register successful' };
        case AC.REGISTER_USER_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        case AC.LOGIN_USER_BEGIN:
            return { ...state, isLoading: true };
        case AC.LOGIN_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload.user, showAlert: true, alertType: 'success', alertText: 'Login successful' };
        case AC.LOGIN_USER_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        case AC.LOGOUT_USER:
            return { ...state, isMember: true, user: null };
        case AC.SET_IMAGE_LIB:
            return { ...state, images: action.payload.images, index: action.payload.index };
        case AC.PREDICT_PLANT_BEGIN:
            return { ...state, isLoading: true };
        case AC.PREDICT_PLANT_SUCCESS:
            return { ...state, isLoading: false, predict_list: action.payload.predict_list, histories_total_pages: 1, histories_cur_page: 0, histories: [] };
        case AC.PREDICT_PLANT_ERROR:
            return { ...state, isLoading: false };
        case AC.GET_PLANTS_BEGIN:
            return { ...state, isLoading: true };
        case AC.GET_PLANTS_SUCCESS:
            return { ...state, isLoading: false, plants: action.payload.plants };
        case AC.GET_PLANTS_ERROR:
            return { ...state, isLoading: false };
        case AC.GET_PLANT_BEGIN:
            return { ...state, isLoading: true };
        case AC.GET_PLANT_SUCCESS:
            return { ...state, isLoading: false, plant_details: action.payload.plant, organs: action.payload.organs };
        case AC.GET_PLANT_ERROR:
            return { ...state, isLoading: false };
        case AC.GET_IMAGES_BEGIN:
            return { ...state, isLoading: true, images: action.payload.isConcat ? state.images : [] };
        case AC.GET_IMAGES_SUCCESS:
            return { ...state, isLoading: false, images: [...state.images, ...action.payload.plant_imgs], images_total_pages: action.payload.total_pages };
        case AC.GET_IMAGES_ERROR:
            return { ...state, isLoading: false };
        case AC.GET_HISTORIES_BEGIN:
            return { ...state, isLoading: true, histories: action.payload.reset ? [] : state.histories };
        case AC.GET_HISTORIES_SUCCESS:
            return { ...state, isLoading: false, histories: [...state.histories, ...action.payload.predicts], histories_total_pages: action.payload.total_pages, histories_cur_page: action.payload.page };
        case AC.GET_HISTORIES_ERROR:
            return { ...state, isLoading: false };
        case AC.GET_USER_BEGIN:
            return { ...state, isLoading: true };
        case AC.GET_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload.user };
        case AC.GET_USER_ERROR:
            return { ...state, isLoading: false };
        case AC.UPDATE_USER_BEGIN:
            return { ...state, isLoading: true };
        case AC.UPDATE_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload.user, showAlert: true, alertType: 'success', alertText: 'Updated' };
        case AC.UPDATE_USER_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        case AC.CHANGE_PASSWORD_BEGIN:
            return { ...state, isLoading: true };
        case AC.CHANGE_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, showAlert: true, alertType: 'success', alertText: action.payload.msg};
        case AC.CHANGE_PASSWORD_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        default:
            throw Error(`no such action: ${action.type}`);
    }
}
