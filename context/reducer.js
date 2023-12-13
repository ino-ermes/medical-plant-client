import * as AC from './action'

export default function reducer(state, action) {
    switch(action.type) {
        case AC.DISPLAY_ALERT:
            return {...state, showAlert: true, alertType: 'success', alertText: 'Success'};
        case AC.CLEAR_ALERT:
            return {...state, showAlert: false, alertType: '', alertText: ''};
        case AC.SWITCH_REGISTER_LOGIN:
            return {...state, isMember: !state.isMember};
        case REGISTER_USER_BEGIN:
            return {...state, isLoading: true};
        case REGISTER_USER_SUCCESS:
            return {...state, isLoading: false, user: action.payload.user, showAlert: true, alertType: 'success', alertText: 'Register successful'};
        case REGISTER_USER_ERROR:
            return {...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg};
        case LOGIN_USER_BEGIN:
            return {...state, isLoading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, isLoading: false, user: action.payload.user, showAlert: true, alertType: 'success', alertText: 'Login successful'};
        case LOGIN_USER_ERROR:
            return {...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg};
        default:
                throw Error(`no such action: ${action.type}`);
        }
}
