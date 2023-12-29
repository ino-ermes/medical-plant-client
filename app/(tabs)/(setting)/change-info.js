import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { FormRow, Alert } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function ChangeInfo() {


    const { isLoading, showAlert, updateUser } = useAppContext();

    const handleSubmit = ({name}) => {
        updateUser({
            name,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Formik
                    initialValues={{ name: ''}}
                    onSubmit={handleSubmit}
                >
                    {
                        (props) =>
                            <View >
                                <MaterialIcons name="account-circle" size={50} color="#2cb1bc" style={styles.icon}/>
                                <Text style={styles.title}>Enter Info</Text>
                                {showAlert && <Alert />}
                                <FormRow
                                    onChangeText={props.handleChange('name')}
                                    value={props.values.name}
                                    name='Name'
                                />
                                <TouchableOpacity style={styles.btn} onPress={props.handleSubmit} disabled={isLoading} >
                                    <Text style={styles.btnTxt}>Change Info</Text>
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