import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Modal } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import { useRouter } from 'expo-router';

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Predict() {

    const {predictPlant, isLoading} = useAppContext();

    const [isModal, setModal] = useState(false);

    const [image, setImage] = useState(null);

    const toggleModal = () => {
        setModal(prev => !prev);
    };

    const [cameraPermissions, requestPermission] = ImagePicker.useCameraPermissions();

    const takeAPicture = async () => {
        if (!cameraPermissions.granted) {
            await requestPermission();
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            toggleModal();
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            toggleModal();
        }
    };

    const router = useRouter();
    const handlePredict = (image) => {
        predictPlant(image);
        router.push('/result');
    }
    
    return (

        <View style={styles.container}>
            <Modal
                handleOuterPress={toggleModal}
                visible={isModal}
            >
                <View style={styles.chooseImgBox}>
                    <TouchableOpacity style={styles.btnIcon} onPress={takeAPicture}>
                        <Entypo style={styles.icon} name="camera" size={24} color="black" />
                        <Text style={styles.btnIconTxt}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnIcon} onPress={pickImage}>
                        <Entypo style={styles.icon} name="images" size={24} color="black" />
                        <Text style={styles.btnIconTxt}>Library</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={toggleModal}
                style={styles.imageContainer}
                activeOpacity={0.8}
            >
                <Image
                    style={styles.image}
                    source={{uri: image}}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                />
            </TouchableOpacity>

            <TouchableOpacity disabled={isLoading || image == null} style={styles.btn} onPress={() => handlePredict(image)}>
                <Text style={styles.btnTxt}>Predict</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chooseImgBox: {
        width: '50%',
    },
    image: {
        width: 300,
        height: 300,
        backgroundColor: '#0553',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        width: 300,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2cb1bc',
        marginTop: 32,
    },
    btnTxt: {
        fontSize: 16,
        letterSpacing: 1,
        color: '#fff',
    },
    btnIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 32,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2cb1bc',
        marginBottom: 16,
    },
    btnIconTxt: {
        fontSize: 16,
        letterSpacing: 1,
        color: '#fff',
        marginLeft: 16,
    },
    icon: {
        color: '#fff',
    },
});