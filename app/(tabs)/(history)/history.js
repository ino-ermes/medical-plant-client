import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { HistoryItem, Dropdown, Modal } from "../../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/appContext";

const DeleteForm = ({ data, handleDelete, hideModal }) => {
    return (
        <View style={formStyles.form}>
            <Text style={formStyles.text}>Do you want to delete?</Text>
            <View style={formStyles.btnBox}>
                <TouchableOpacity
                    style={[formStyles.btn, formStyles.btnDel]}
                    onPress={() => {
                        handleDelete(data.payload.histId);
                        hideModal();
                    }}
                >
                    <Text style={formStyles.btnText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={formStyles.btn}
                    onPress={hideModal}
                >
                    <Text style={formStyles.btnText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};
const plants = [
    {
        "id": 0,
        "name": "BẠC HÀ",
    },
    {
        "id": 1,
        "name": "BẠCH ĐỒNG NỮ",
    },
    {
        "id": 2,
        "name": "BỐ CHÍNH SÂM",
    },
    {
        "id": 3,
        "name": "BỒ CÔNG ANH",
    },
    {
        "id": 4,
        "name": "CAM THẢO ĐẤT",
    },
    {
        "id": 5,
        "name": "CỎ MẦN TRẦU",
    },
    {
        "id": 6,
        "name": "CỎ NHỌ NỒI",
    },
    {
        "id": 7,
        "name": "CỎ TRANH",
    },
    {
        "id": 8,
        "name": "CỎ XƯỚC",
    },
    {
        "id": 9,
        "name": "CỐI XAY",
    },
    {
        "id": 10,
        "name": "CỐT KHÍ",
    },
    {
        "id": 11,
        "name": "CÚC HOA",
    },
    {
        "id": 12,
        "name": "DÀNH DÀNH",
    },
    {
        "id": 13,
        "name": "DÂU TẰM",
    },
    {
        "id": 14,
        "name": "ĐỊA LIỀN",
    },
    {
        "id": 15,
        "name": "DIỆP HẠ CHÂU",
    },
    {
        "id": 16,
        "name": "ĐINH LĂNG",
    },
    {
        "id": 17,
        "name": "ĐƠN LÁ ĐỎ",
    },
    {
        "id": 18,
        "name": "DỪA CẠN",
    },
    {
        "id": 19,
        "name": "GAI",
    },
    {
        "id": 20,
        "name": "GỪNG",
    },
    {
        "id": 21,
        "name": "HẠ KHÔ THẢO",
    },
    {
        "id": 22,
        "name": "HÚNG CHANH",
    },
    {
        "id": 23,
        "name": "HƯƠNG NHU TÍA",
    },
    {
        "id": 24,
        "name": "HUYẾT DỤ",
    },
    {
        "id": 25,
        "name": "HY THIÊM",
    },
    {
        "id": 26,
        "name": "KÉ ĐẦU NGỰA",
    },
    {
        "id": 27,
        "name": "KIM NGÂN",
    },
    {
        "id": 28,
        "name": "KIM TIỀN THẢO",
    },
    {
        "id": 29,
        "name": "LÁ LỐT",
    },
    {
        "id": 30,
        "name": "MÃ ĐỀ",
    },
    {
        "id": 31,
        "name": "MẠCH MÔN",
    },
    {
        "id": 32,
        "name": "MẦN TƯỚI",
    },
    {
        "id": 33,
        "name": "NÁNG",
    },
    {
        "id": 34,
        "name": "NGẢI CỨU",
    },
    {
        "id": 35,
        "name": "NGHỆ",
    },
    {
        "id": 36,
        "name": "CÂY ỔI",
    },
    {
        "id": 37,
        "name": "RAU MÁ",
    },
    {
        "id": 38,
        "name": "RAU SAM",
    },
    {
        "id": 39,
        "name": "SẢ",
    },
    {
        "id": 40,
        "name": "SẮN DÂY",
    },
    {
        "id": 41,
        "name": "TÍA TÔ",
    },
    {
        "id": 42,
        "name": "TRẮC BÁCH DIỆP",
    },
    {
        "id": 43,
        "name": "XẠ CAN",
    },
    {
        "id": 44,
        "name": "XUYÊN TÂM LIÊN",
    },
    {
        "id": 45,
        "name": "Ý DĨ",
    }
]

const organs = [
    {
        id: 'leaf',
        name: 'Leaf',
    },
    {
        id: 'flower',
        name: 'Flower',
    },
    {
        id: 'fruit',
        name: 'Fruit',
    },
    {
        id: 'bark',
        name: 'Bark',
    },
    {
        id: 'habit',
        name: 'Habit',
    },
];

const ShareForm = ({ data, handleShare, hideModal }) => {

    const [plantId, setPlantId] = useState(data.payload.plantId);
    const [organ, setOrgan] = useState('leaf');

    return (
        <View style={formStyles.form}>
            <Text style={formStyles.text}>Share image to Library</Text>

            <View style={formStyles.dropdownBox}>
                <Dropdown
                    data={plants}
                    setValue={setPlantId}
                    value={plantId}
                />
                <Dropdown
                    data={organs}
                    setValue={setOrgan}
                    value={organ}
                />
            </View>

            <View style={formStyles.btnBox}>
                <TouchableOpacity

                    style={[formStyles.btn, formStyles.btnDel]}
                    onPress={hideModal}
                >
                    <Text style={formStyles.btnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={formStyles.btn}
                    onPress={() => {
                        handleShare(data.payload.histId, plantId, organ);
                        hideModal();
                    }}
                >
                    <Text style={formStyles.btnText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const formStyles = StyleSheet.create({
    form: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderTopColor: '#2cb1bc',
        borderTopWidth: 4,
        borderStyle: 'solid',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    dropdownBox: {
        width: '100%',
        marginTop: 20,
    },
    btnBox: {
        flexDirection: 'row',
        marginTop: 30,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2cb1bc',
        flexGrow: 1,
        marginHorizontal: 5,
    },
    btnText: {
        color: '#fff',
    },
    btnDel: {
        backgroundColor: '#dc143c',
    },
});

export default function History() {

    const handleDelete = (histId) => {
        console.log(histId);
    }

    const handleShare = (histId, plantId, organ) => {
        console.log(histId, plantId, organ);
    }

    const [modal, setModal] = useState({
        modal: false,
        action: null,
        payload: null,
    });

    const hideModal = () => {
        setModal({
            modal: false,
            action: null,
            payload: null,
        })
    }

    
    const {getHistories, histories, predict_list} = useAppContext();

    useEffect(() => {
        getHistories();
    }, [predict_list]);

    return (
        <View
            style={styles.container}
        >
            <Modal
                handleOuterPress={hideModal}
                visible={modal.modal}
            >
                {
                    modal.action && modal.action === 'share' ?
                        <ShareForm
                            handleShare={handleShare}
                            data={modal}
                            hideModal={hideModal}
                        /> :
                        <DeleteForm
                            handleDelete={handleDelete}
                            data={modal}
                            hideModal={hideModal}
                        />
                }
            </Modal>

            <View style={{paddingTop: 60}}/>

            <FlatList
                contentContainerStyle={styles.list}
                data={histories}
                renderItem={
                    ({ item }) =>
                        <HistoryItem
                            name={item.common_name}
                            date={item.updated_at}
                            imageUri={item.thumb_img_url}
                            scienceName={item.binomial_name}
                            handleDelete={() => setModal({
                                modal: true,
                                action: 'delete',
                                payload: {
                                    histId: item._id,
                                }
                            })}
                            handleShare={() => setModal({
                                modal: true,
                                action: 'share',
                                payload: {
                                    histId: item._id,
                                    plantId: item.plant_id,
                                },
                            })}
                        />
                }
                keyExtractor={(item) => item._id}
                onEndReachedThreshold={0.3}
                onEndReached={getHistories}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    list: {
        paddingHorizontal: 10,
    }
});