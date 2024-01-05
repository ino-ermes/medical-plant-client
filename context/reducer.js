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
            return { ...state, isLoading: false, myAuthFetch: action.payload.myAuthFetch, user: action.payload.user, isMember: true, showAlert: true, alertType: 'success', alertText: 'Register successful' };
        case AC.REGISTER_USER_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        case AC.LOGIN_USER_BEGIN:
            return { ...state, isLoading: true };
        case AC.LOGIN_USER_SUCCESS:
            return {
                ...state, isLoading: false, user: action.payload.user, myAuthFetch: action.payload.myAuthFetch, showAlert: true, alertType: 'success', alertText: 'Login successful'
            };
        case AC.LOGIN_USER_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        case AC.LOGOUT_USER:
            return { ...action.payload.initialState };
        case AC.GET_USER_BEGIN:
            return { ...state, isLoading: true };
        case AC.GET_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload.user, myAuthFetch: action.payload.myAuthFetch };
        case AC.GET_USER_ERROR:
            return { ...state, isLoading: false };
        case AC.UPDATE_USER_BEGIN:
            return { ...state, isLoading: true };
        case AC.UPDATE_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload.user, showAlert: true, alertType: 'success', alertText: 'Updated' };
        case AC.CHANGE_AVATAR:
            return { ...state, user: {
                user: { ...state.user.user, img_url: action.payload.img_uri },
                access_token: state.user.access_token,
            } };
        case AC.UPDATE_USER_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        case AC.CHANGE_PASSWORD_BEGIN:
            return { ...state, isLoading: true };
        case AC.CHANGE_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, showAlert: true, alertType: 'success', alertText: action.payload.msg };
        case AC.CHANGE_PASSWORD_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        case AC.FORGOT_PASSWORD_BEGIN:
            return { ...state, isLoading: true };
        case AC.FORGOT_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, showAlert: true, alertType: 'success', alertText: 'Email sent' };
        case AC.FORGOT_PASSWORD_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        case AC.RESET_PASSWORD_BEGIN:
            return { ...state, isLoading: true };
        case AC.RESET_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, showAlert: true, alertType: 'success', alertText: 'Password reseted' };
        case AC.RESET_PASSWORD_ERROR:
            return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg };
        default:
            throw Error(`no such action: ${action.type}`);
    }
}
