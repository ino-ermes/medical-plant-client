import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";


export default function HistoryItem({ imageUri, name, scienceName, date, handleShare, handleDelete, style }) {
    return (
        <TouchableOpacity style={[styles.container, style]} activeOpacity={0.8}>
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
            <View style={styles.btnBox}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleShare}
                >
                    <Text style={styles.btnText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, styles.btnDel]}
                    onPress={handleDelete}
                >
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </View>
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
    btnBox: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginRight: 10,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2cb1bc',
        width: '100%',
    },
    btnText: {
        color: '#fff',
    },
    btnDel: {
        backgroundColor: '#dc143c',
    },
});