import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';

function HistoryItem({ imageUri, name, scienceName, date, onPress}) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Image
                style={styles.image}
                source={{ uri: imageUri }}
                contentFit="cover"
                transition={1000}
            />
            <View style={styles.textBox}>
                <Text numberOfLines={1} style={styles.name}>{name}</Text>
                <Text numberOfLines={2} style={styles.scienceName}>{scienceName} </Text>
                <Text style={styles.date}>{date} </Text>
            </View>
            <AntDesign name="delete" size={24} color="red" onPress={onPress} style={{padding: 10}}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        borderRightColor: '#2cb1bc',
        borderRightWidth: 3,
        backgroundColor: '#fff',
        elevation: 3,
        marginBottom: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,

    },
    textBox: {
        flex: 1,
        height: 100,
        flexDirection: 'column',
        paddingHorizontal: 4,
        paddingVertical: 7,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scienceName: {
        fontSize: 16,
        flex: 1,
        color: '#555',
    },
    date: {
        fontSize: 16,
        color: '#aaa',
    },
});

export default HistoryItem;