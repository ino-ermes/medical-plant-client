import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useEffect, useState } from "react";

import ImageViewing from "react-native-image-viewing";
import { ImageHeader, ImageFooter, ImageList, CircleSpin } from "../../../components";
import { useAppContext } from "../../../context/appContext";
import { useLocalSearchParams } from "expo-router";

export default function ImageLibrary() {
    const [currentImageIndex, setImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const { plant_id, organ } = useLocalSearchParams();

    const { myFetch } = useAppContext();

    const [data, setData] = useState({
        total_pages: 1,
        images: [],
    });

    const [curPage, setCurPage] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (curPage < data.total_pages) {
            (async () => {
                if (curPage == 0) setLoading(true);
                try {
                    const response = await myFetch.get(`/plants/${plant_id}/image?organ=${organ}&page=${curPage + 1}`);
                    const { plant_imgs, total_pages } = response.data;
                    setData((prevData) => {
                        return {
                            total_pages: total_pages,
                            images: [...prevData.images, ...plant_imgs],
                        }
                    });
                } catch (error) {

                } finally {
                    if (curPage == 0) setLoading(false);
                }
            })();
        }
    }, [curPage]);

    const handleReachEnd = () => {
        if (curPage < data.total_pages) {
            setCurPage((prevCurPage) => prevCurPage + 1);
        }
    }

    const onSelect = (index) => {
        setImageIndex(index);
        setIsVisible(true);
    };

    const onRequestClose = () => setIsVisible(false);

    if (loading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <CircleSpin />
            </View>
        );
    }

    if (data.images.length == 0 && !loading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>
                    List is empty
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <ImageList
                images={data.images.map((image) => image.thumb_img_url)}
                onPress={(index) => onSelect(index)}
                shift={0.25}
                onEndReached={handleReachEnd}
            />
            <ImageViewing
                images={data.images.map((image) => { return { uri: image.img_url } })}
                imageIndex={currentImageIndex}
                visible={isVisible}
                onRequestClose={onRequestClose}
                HeaderComponent={({ imageIndex }) =>
                    <ImageHeader title={imageIndex + 1} onRequestClose={onRequestClose} />}
                FooterComponent={({ imageIndex }) => (
                    <ImageFooter imageIndex={imageIndex} imagesCount={data.images.length} />
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