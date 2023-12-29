import {FlatList, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');
const imageSize = (width) / 2 - 6;

const IMAGE_WIDTH = imageSize;
const IMAGE_HEIGH = imageSize;

function ImageList({ images, onPress, onEndReached }) {
    return (
        <FlatList
            data={images}
            renderItem={({ item, index }) =>
                <TouchableOpacity
                    style={styles.button}
                    key={`${item}_${index}`}
                    activeOpacity={0.8}
                    onPress={() => onPress(index)}
                >
                    <Image source={{ uri: item }} style={styles.image} />
                </TouchableOpacity>}
            numColumns={2}
            onEndReachedThreshold={0.3}
            onEndReached={onEndReached}
        />

    )
}

const styles = StyleSheet.create({
    button: {
        margin: 3,
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGH,
        borderRadius: 4,
    }
});

export default ImageList;