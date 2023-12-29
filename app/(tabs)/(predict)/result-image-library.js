import {
    StyleSheet,
    View,
    Text,
} from "react-native";

import { useEffect, useState } from "react";

import ImageViewing from "react-native-image-viewing";
import { ImageHeader, ImageFooter, ImageList } from "../../../components";
import { useAppContext } from "../../../context/appContext";
import { useLocalSearchParams } from "expo-router";

export default function ImageLibrary() {
    const [currentImageIndex, setImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const { plant_id, organ } = useLocalSearchParams();

    const { images, getImages, images_total_pages, isLoading } = useAppContext();
    const [page, setPage] = useState(1);

    useEffect(() => {
        getImages(plant_id, organ, page, page != 1);
    }, [page]);

    const handleReachEnd = () => {
        if (page < images_total_pages) {
            setPage((page) => page + 1);
        }
    }

    const onSelect = (index) => {
        setImageIndex(index);
        setIsVisible(true);
    };

    const onRequestClose = () => setIsVisible(false);

    return (
        <View style={styles.root}>
            <ImageList
                images={images.map((image) => image.thumb_img_url)}
                onPress={(index) => onSelect(index)}
                shift={0.25}
                onEndReached={handleReachEnd}
            />
            <ImageViewing
                images={images.map((image) => { return { uri: image.img_url } })}
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