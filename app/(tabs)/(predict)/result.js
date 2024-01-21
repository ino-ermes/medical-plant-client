import { StyleSheet, View, FlatList, Text } from 'react-native';
import { PlantItem } from '../../../components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppContext } from '../../../context/appContext';
import { EarthLoading } from '../../../components';
import { useEffect, useState } from 'react';

export default function Result() {

    const { myAuthFetch } = useAppContext();

    const [predictList, setPredictList] = useState(null);

    const router = useRouter();

    const { img_uri } = useLocalSearchParams();

    useEffect(() => {
        (async () => {
            const formData = new FormData();
            formData.append("image", {
                uri: img_uri,
                type: 'image/jpeg',
                name: 'plant.jpeg',
            });

            try {
                const response = await myAuthFetch.post('/predicts', formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                });

                const { predict_list } = response.data;

                setPredictList(predict_list);
            } catch (error) {
                router.back();
            }
        })();
    }, []);

    if (!predictList) return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <EarthLoading />
        </View>
    )

    if (predictList.length == 0) return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{fontSize: 20, opacity: 0.6}}>Predict server is disconnected. Try another time.</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList contentContainerStyle={{ paddingBottom: 12 }}
                data={predictList}
                renderItem={({ item }) =>
                    <PlantItem
                        name={item.common_name}
                        scienceName={item.binomial_name}
                        src={item.thumb_img_url}
                        confidence={item.confidence}
                        onPress={() => {
                            router.push({
                                pathname: '/result-plant-details',
                                params: {
                                    plant_id: item._id,
                                }
                            })
                        }}
                    />
                }
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
