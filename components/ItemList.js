import { Text, View, StyleSheet } from 'react-native';

function ItemList({ title, description }) {

    return (
        <View style={styles.container}>
            <Text style={styles.description}><Text style={styles.title}>{title}</Text>: {description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 36,
        width: '100%',
        paddingHorizontal: 5,
        paddingVertical: 8,
    },
    title: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    description: {
        fontSize: 20,
        letterSpacing: 1,
    },
})

export default ItemList;