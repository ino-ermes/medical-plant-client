import { StyleSheet, View, Text, TouchableOpacity, Easing } from 'react-native';
import { Formik } from 'formik';
import { FormRow, Alert, Logo } from '../../components';
import { useAppContext } from '../../context/appContext';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';

export default function SetPassword() {


    const { email } = useLocalSearchParams();

    if (!email) {
        return <Redirect href="/" />;
    }

    const router = useRouter();

    const { isLoading, showAlert, registerUser } = useAppContext();



    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Formik
                    initialValues={{ email: '', token: '', password: '', repassword: '' }}
                    onSubmit={(values, actions) => console.log(values)}
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
                                />
                                <FormRow
                                    onChangeText={props.handleChange('repassword')}
                                    value={props.values.repassword}
                                    name='Confirm Password'
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
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
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