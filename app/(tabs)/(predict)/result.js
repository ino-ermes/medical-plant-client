import { StyleSheet, View, FlatList, Text } from 'react-native';
import { PlantItem } from '../../../components';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../../context/appContext';

export default function Result() {

    const { isLoading, predict_list } = useAppContext();
    const router = useRouter();

    if (isLoading) return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontSize: 30, color: '#ccc' }}>Predicting...</Text>
        </View>
    )


    return (
        <View style={styles.container}>
            <FlatList contentContainerStyle={{ paddingBottom: 12 }}
                data={predict_list}
                renderItem={({ item }) =>
                    <PlantItem
                        name={item.common_name}
                        scienceName={item.binomial_name}
                        src={item.thumb_img_url}
                        confidence={item.confidence}
                        onPress={() => { router.push({
                            pathname: '/result-plant-details',
                            params: {
                                plant_id: item._id,
                            }
                        }) }}
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
