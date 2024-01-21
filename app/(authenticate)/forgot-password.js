import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { FormRow, Alert, Logo } from '../../components';
import { useAppContext } from '../../context/appContext';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {

    const { isLoading, showAlert, forgotPassword } = useAppContext();

    const router = useRouter();

    const handleSubmit = (values, actions) => {
        forgotPassword(values.email, () => {
            setTimeout(() => {
                router.push(`/set-password?email=${values.email}`);
            }, 1500);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={handleSubmit}
                >
                    {
                        (props) =>
                            <View >
                                <Logo style={styles.icon} />
                                <Text style={styles.title}>Forgot Password</Text>
                                {showAlert && <Alert />}
                                <FormRow
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    name='Email'
                                    type='email'
                                />
                                <TouchableOpacity style={styles.btn} onPress={props.handleSubmit} disabled={isLoading} >
                                    <Text style={styles.btnTxt}>Next</Text>
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