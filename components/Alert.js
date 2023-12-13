import { useAppContext } from '../context/appContext';
import { StyleSheet, View, Text } from 'react-native';

function Alert() {
    const { alertText, alertType } = useAppContext();
    return (
        <View style={[styles.alert, (alertType === 'danger' ? styles.danger : styles.success)]}>
            <Text style={[styles.text, (alertType === 'danger' ? styles.textDanger : styles.textSuccess)]}>{alertText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    alert: {
        paddingHorizontal: 6,
        paddingVertical: 12,
        marginVertical: 16,
        borderColor: 'transparent',
        borderRadius: 4,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 16,
    },
    textDanger: {
        color: '#842029',
    },
    textSuccess: {
        color: '#0f5132',
    },
    danger: {
        backgroundColor: '#f8d7da'
    },
    success: {
        backgroundColor: '#d1e7dd'
    }
})

export default Alert;