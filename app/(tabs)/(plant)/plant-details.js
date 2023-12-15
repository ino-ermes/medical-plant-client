import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ItemList } from '../../../components';
import { Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const tmp = {
    'Tên': 'KIM TIỀN THẢO',
    'Tên khác': 'Đồng tiền lông, mắt trâu, vảy rồng',
    'Tên khoa học': 'Desmodium styracifolium (Osbeck) Merr.',
    'Họ': 'Đậu (Fabaceae)',
    'Bộ phận dùng': 'Bộ phận trên mặt đất',
    'Công năng, chủ trị': 'Thanh nhiệt, trừ thấp, lợi tiểu, thông lâm. Chữa sỏi đường tiết niệu, đái buốt, viêm gan vàng da, phù thũng.',
    'Liều lượng, cách dùng': 'Ngày dùng 15 - 30g, sắc uống.',
}

const organs = {
    'leaf': {
        'image': 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        'total': 10,
    },
    'flower': {
        'image': 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        'total': 11,
    },
    'fruit': {
        'image': 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        'total': 12,
    },
    'bark': {
        'image': 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        'total': 13,
    },
    'habit': {
        'image': 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        'total': 14,
    },
}
const organImgWidth = Dimensions.get('window').width / 5 - 20;

export default function PlantDetails() {

    const router = useRouter();

    const organIcons = {
        'leaf': <Entypo name="leaf" size={28} color="black" style={styles.eachOrganIcon} />,
        'flower': <Entypo name="flower" size={28} color="black" style={styles.eachOrganIcon} />,
        'fruit': <MaterialCommunityIcons name="fruit-cherries" size={28} color="black" style={styles.eachOrganIcon} />,
        'bark': <FontAwesome name="square" size={22} color="black" style={styles.eachOrganIcon} />,
        'habit': <MaterialCommunityIcons name="tree" size={32} color="black" style={styles.eachOrganIcon} />,
    }

    return (
        <ScrollView style={styles.container}>


            <View style={styles.bigTitleContainer}>
                <Image
                    style={styles.bigImage}
                    source={{uri: 'https://bs.plantnet.org/image/m/3b7d7b045c8a2885e791fe8a8c2ac230e2601461'}}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                />
                <Text style={styles.bigTitle}>{tmp['Tên']}</Text>
            </View>

            <View style={styles.details}>
                {
                    Object.entries(tmp).map(([k, v], i) =>
                        <ItemList
                            key={i}
                            title={k}
                            description={v}
                        />)
                }
            </View>

            <View>
                <Text style={styles.libTitle}>Library</Text>
                <View style={styles.organsContainer}>
                    {Object.entries(organs).map(([k, v], i) =>
                        <View style={styles.eachOrganContainer} key={i}>
                            <TouchableOpacity onPress={() => router.push('image-library')}>
                                <Image
                                    style={styles.organImg}
                                    source={{uri: v.image}}
                                    placeholder={blurhash}
                                    contentFit="cover"
                                    transition={1000}
                                    blurRadius={4}
                                />
                            {organIcons[k]}
                            <Text style={styles.eachOrganTotal}>{v.total}</Text>
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
        transform: [{translateX: -14}, {translateY: -16}],
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