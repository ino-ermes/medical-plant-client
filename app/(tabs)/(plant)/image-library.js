import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";

import { useState } from "react";

import ImageViewing from "react-native-image-viewing";
import ImageHeader from "../../../components/ImageHeader";
import ImageFooter from "../../../components/ImageFooter";
import ImageList from "../../../components/ImageList";

const images = [
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
    {
        thumbnail: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        original: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        key: Math.random(),
    },
]

export default function ImageLibrary() {
    const [currentImageIndex, setImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const onSelect = (index) => {
        setImageIndex(index);
        setIsVisible(true);
    };
    
    const onRequestClose = () => setIsVisible(false);

    return (
        <View style={styles.root}>
            <ImageList
                images={images.map((image) => image.thumbnail)}
                onPress={(index) => onSelect(index)}
                shift={0.25}
            />
            <ImageViewing
                images={images.map((image) => { return {uri: image.original} })}
                imageIndex={currentImageIndex}
                visible={isVisible}
                onRequestClose={onRequestClose}
                HeaderComponent={({ imageIndex }) =>
                    <ImageHeader title={imageIndex + 1} onRequestClose={onRequestClose} />}
                FooterComponent={({ imageIndex }) => (
                    <ImageFooter imageIndex={imageIndex} imagesCount={images.length} />
                )}
                keyExtractor={(imageSrc, index) => index}
                animationType="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});