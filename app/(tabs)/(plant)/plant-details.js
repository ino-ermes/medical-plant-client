import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { ItemList } from '../../../components';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../../../context/appContext';
import { useEffect, useState } from 'react';
import { CircleSpin } from '../../../components';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const organImgWidth = Dimensions.get('window').width / 5 - 20;

export default function PlantDetails() {

    const router = useRouter();
    const {plant_id} = useLocalSearchParams();
    const [plant, setPlant] = useState(null);

    const organIcons = {
        'leaf': <Entypo name="leaf" size={28} color="black" style={styles.eachOrganIcon} />,
        'flower': <Entypo name="flower" size={28} color="black" style={styles.eachOrganIcon} />,
        'fruit': <MaterialCommunityIcons name="fruit-cherries" size={28} color="black" style={styles.eachOrganIcon} />,
        'bark': <FontAwesome name="square" size={22} color="black" style={styles.eachOrganIcon} />,
        'habit': <MaterialCommunityIcons name="tree" size={32} color="black" style={styles.eachOrganIcon} />,
    }

    const { myFetch } = useAppContext();
    useEffect(() => {
        (async () => {
            try {
                const response = await myFetch.get(`/plants/${plant_id}`);
                const { plant, organs } = response.data;
                setPlant({
                    plant,
                    organs,
                });
            } catch (error) {
                router.back();
            }
        })();
    }, [plant_id]);

    if (!plant) return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <CircleSpin />
        </View>
    )

    return (
        <ScrollView style={styles.container}>
            <View style={styles.bigTitleContainer}>
                <Image
                    style={styles.bigImage}
                    source={{ uri: plant.plant.img_url }}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                />
                <Text style={styles.bigTitle}>{plant.plant.common_name}</Text>
            </View>

            <View style={styles.details}>
                <ItemList
                    title={'Tên khác'}
                    description={plant.plant.another_name}
                />
                <ItemList
                    title={'Tên khoa học'}
                    description={plant.plant.binomial_name}
                />
                <ItemList
                    title={'Họ'}
                    description={plant.plant.family}
                />
                <ItemList
                    title={'Bộ phận dùng'}
                    description={plant.plant.usable_part}
                />
                <ItemList
                    title={'Công năng, chủ trị'}
                    description={plant.plant.function}
                />
                <ItemList
                    title={'Liều lượng, cách dùng'}
                    description={plant.plant.usage}
                />
            </View>

            <View>
                <Text style={styles.libTitle}>Library</Text>
                <View style={styles.organsContainer}>
                    {plant.organs.map((value) =>
                        <View style={styles.eachOrganContainer} key={value.organ}>
                            <TouchableOpacity onPress={() => router.push({
                                'pathname': 'image-library',
                                'params': {
                                    plant_id: plant.plant._id,
                                    organ: value.organ
                                }
                            })}>
                                <Image
                                    style={styles.organImg}
                                    source={{ uri: value.thumb_img_url }}
                                    placeholder={blurhash}
                                    contentFit="cover"
                                    transition={1000}
                                    blurRadius={4}
                                />
                                {organIcons[value.organ]}
                                <Text style={styles.eachOrganTotal}>{value.count}</Text>
                            </TouchableOpacity>

                        </View>
                    )
                    }
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bigTitleContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    bigTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 20,
    },
    bigImage: {
        height: 250,
        marginTop: 40,
        width: 250,
        borderRadius: 5,
    },
    details: {
        paddingHorizontal: 16,
    },
    libTitle: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 50,
        paddingHorizontal: 50,
        borderRadius: 5,
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 2,
    },
    organsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    eachOrganContainer: {
        position: 'relative',
        marginVertical: 20,
    },
    organImg: {
        width: organImgWidth,
        height: organImgWidth,
        borderRadius: 5,
    },
    eachOrganIcon: {
        position: 'absolute',
        top: -8,
        left: -8,
        color: 'green',
        textShadowColor: '#000',
        textShadowOffset: {
            height: 1,
            width: 1,
        },
        textShadowRadius: 1,
    },
    eachOrganTotal: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -14 }, { translateY: -16 }],
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: {
            height: 1,
            width: 1,
        },
        textShadowRadius: 1,
    },
});