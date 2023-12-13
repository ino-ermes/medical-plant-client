import {Text, View, TextInput, StyleSheet} from 'react-native';
function FormRow({value, onChangeText, name}) {
    return (
        <View style={styles.formRow}>
            <Text style={styles.formLabel}>{name}</Text>
            <TextInput style={styles.formInput}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}

styles = StyleSheet.create({
    formRow: {
        marginBottom: 16,
    },
    formLabel: {
        fontSize: 14,
        marginBottom: 8,
        textTransform: 'capitalize',
        letterSpacing: 1,
    },
    formInput: {
        width: '100%',
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: '#f0f4f8',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#bcccdc',
        height: 35,
    }
})

export default FormRow;