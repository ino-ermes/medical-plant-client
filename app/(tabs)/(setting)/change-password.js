import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { FormRow, Alert } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import { FontAwesome } from '@expo/vector-icons';


export default function ChangePassword() {


    const { isLoading, showAlert, changePassword } = useAppContext();

    const handleSubmit = ({password, newPassword, reNewPassword}) => {
        if(newPassword == reNewPassword) {
            changePassword(password, newPassword);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Formik
                    initialValues={{ password: '', newPassword: '', reNewPassword: ''}}
                    onSubmit={handleSubmit}
                >
                    {
                        (props) =>
                            <View >
                                <FontAwesome name="user-secret" size={50} color="#2cb1bc" style={styles.icon}/>                                
                                <Text style={styles.title}>Enter Password</Text>
                                {showAlert && <Alert />}
                                <FormRow
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    name='Password'
                                />
                                <FormRow
                                    onChangeText={props.handleChange('newPassword')}
                                    value={props.values.newPassword}
                                    name='New Password'
                                />
                                <FormRow
                                    onChangeText={props.handleChange('reNewPassword')}
                                    value={props.values.reNewPassword}
                                    name='Confirm New Password'
                                />
                                <TouchableOpacity style={styles.btn} onPress={props.handleSubmit} disabled={isLoading} >
                                    <Text style={styles.btnTxt}>Change Password</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </Formik>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    form: {
        borderTopColor: '#2cb1bc',
        borderTopWidth: 4,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation: 3,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    title: {
        fontSize: 32,
        alignSelf: 'center',
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 48,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2cb1bc',
        marginTop: 16,
    },
    btnTxt: {
        fontSize: 16,
        letterSpacing: 1,
        color: '#fff',
    },
});