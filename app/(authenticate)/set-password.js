import { StyleSheet, View, Text, TouchableOpacity, Easing } from 'react-native';
import { Formik } from 'formik';
import { FormRow, Alert, Logo } from '../../components';
import { useAppContext } from '../../context/appContext';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import { useState } from 'react';

export default function SetPassword() {


    const { email } = useLocalSearchParams();

    const [success, setSuccess] = useState(false);

    if (!email || success) {
        return <Redirect href="/" />;
    }

    const { isLoading, showAlert, resetPassword } = useAppContext();

    const handleSubmit = (value, action) => {
        console.log(value);
        if(value.password == value.repassword && value.password && value.token) {
            resetPassword(email, value.token, value.password, () => {
                setTimeout(() => {
                    setSuccess(true);
                }, 1500);
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Formik
                    initialValues={{ email: '', token: '', password: '', repassword: '' }}
                    onSubmit={handleSubmit}
                >
                    {
                        (props) =>
                            <View >
                                <Logo style={styles.icon} />
                                <Text style={styles.title}>Enter Password</Text>
                                {showAlert && <Alert />}
                                <FormRow
                                    onChangeText={props.handleChange('token')}
                                    value={props.values.token}
                                    name='Token'
                                />
                                <FormRow
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    name='Password'
                                    type='password'
                                />
                                <FormRow
                                    onChangeText={props.handleChange('repassword')}
                                    value={props.values.repassword}
                                    name='Confirm Password'
                                    type='password'
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