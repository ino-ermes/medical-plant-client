import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function PlantItem({ src, name, scienceName, style, ...props }) {

    return (
        <TouchableOpacity style={[styles.container, style]} {...props}>
            <Image 
                    style={styles.image}
                    source={{uri: src}}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
            />
            <View style={styles.info}>
                <Text numberOfLines={1} style={styles.name}>{name}</Text>
                <Text numberOfLines={2} style={styles.scienceName}>{scienceName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 110,
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 4,
        elevation: 3,
        borderTopColor: '#2cb1bc',
        borderTopWidth: 4,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 4,
    },
    info: {
        padding: 10,
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#000',
    },
    scienceName: {
        fontSize: 16,
        color: '#aaa',
    },
})

export default PlantItem;