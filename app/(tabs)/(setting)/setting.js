import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Modal } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Setting() {

    const [isModal, setModal] = useState(false);

    
    const { user, logoutUser, updateUser } = useAppContext();
    const [imgPreview, setImgPreview] = useState(null);
    const router = useRouter();
    
    const changeUserImg = () => {
        if(!imgPreview) return;
        updateUser({
            img_uri: imgPreview,
        });
        setTimeout(() => {
            setModal(false);
        }, 6000);

    };

    const pickImage = async () => {
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImgPreview(result.assets[0].uri);
        }
    };

    const toggleModal = () => {
        setModal(isModal => {
            if (isModal) setImgPreview(null);
            return !isModal;
        });
    };
    return (
        <View style={styles.container}>
            <Modal
                handleOuterPress={toggleModal}
                visible={isModal}
            >
                <View style={styles.chooseImgBox}>
                    <TouchableOpacity
                        onPress={pickImage}
                        style={[styles.imageContainer]}
                        activeOpacity={0.8}
                    >
                        <Image
                            style={styles.image}
                            source={{ uri: imgPreview || user.user.img_url }}
                            contentFit="cover"
                            transition={1000}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {marginTop: 160}]} onPress={changeUserImg} >
                        <Text style={styles.btnText}>Apply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.btnDel]} onPress={toggleModal} >
                        <Text style={styles.btnText}>Cancel</Text>
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
                    source={{ uri: user.user.img_url }}
                    contentFit="cover"
                    transition={1000}
                />
            <Text style={styles.username}>{user.user.name}</Text>
            </TouchableOpacity>
            <View style={styles.navBox}>
                <View style={styles.sep} />
                <TouchableOpacity style={styles.nav} onPress={() => router.push('/change-info')}>
                    <View style={styles.navTitle}>
                        <MaterialIcons name="account-circle" size={24} color="#2cb1bc" />
                        <Text style={styles.navText}>Change account info</Text>
                    </View>
                    <AntDesign name="rightcircleo" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.nav} onPress={() => router.push('/change-password')}>
                    <View style={styles.navTitle}>
                        <FontAwesome name="user-secret" size={24} color="#2cb1bc" />
                        <Text style={styles.navText}>Change password</Text>
                    </View>
                    <AntDesign name="rightcircleo" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.btn, styles.btnDel, {width: '90%', marginBottom: 20}]}
                onPress={logoutUser}
            >
                <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chooseImgBox: {
        width: '80%',
        height: '100%',
    },
    imageContainer: {
        marginTop: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        backgroundColor: '#0553',
        borderRadius: 100,
    },
    navBox: {
        width: '90%',
    },
    sep: {
        width: '100%',
        borderTopColor: '#2cb1bc',
        borderTopWidth: 3,
        marginBottom: 5,
    },
    nav: {
        marginVertical: 0,
        height: 40,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderLeftColor: '#2cb1bc',
        borderLeftWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
    },
    navTitle: {
        flexDirection: 'row',
    },
    navText: {
        fontSize: 16,
        marginLeft: 10,
        letterSpacing: 1,
        color: '#000',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2cb1bc',
        marginTop: 16,
    },
    btnText: {
        fontSize: 16,
        letterSpacing: 1,
        color: '#fff',
    },
    btnDel: {
        backgroundColor: '#dc143c',
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: '#ccc',
        textShadowOffset: {
            height: 1.5,
            width: 1.5,
        },
        textShadowRadius: 1,
    },
});
