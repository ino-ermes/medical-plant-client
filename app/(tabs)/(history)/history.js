import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from "react-native";
import { HistoryItem, CircleSpin } from "../../../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/appContext";
import { AntDesign } from '@expo/vector-icons';

export default function History() {
    const [curId, setCurId] = useState(null);

    const { myAuthFetch } = useAppContext();

    const [data, setData] = useState({
        total_pages: 1,
        histories: [],
    });
    const [curPage, setCurPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (curPage < data.total_pages) {
            (async () => {
                if (curPage == 0) setLoading(true);
                try {
                    const response = await myAuthFetch.get(`/predicts?page=${curPage + 1}`);
                    const { predicts, total_pages } = response.data;
                    setData((prevData) => {
                        return {
                            total_pages: total_pages,
                            histories: [...prevData.histories, ...predicts],
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

    const handleDelete = async () => {
        if(curId) {
            try {
                await myAuthFetch.delete(`/predicts/${curId}`);
                setData({
                    total_pages: 1,
                    histories: [],  
                })
                setCurPage(data.total_pages);
                setCurPage(0);
            } catch (error) {
            } finally {
                setCurId(null);
            }
        }
    };

    if (loading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <CircleSpin />
            </View>
        );
    }

    if (data.histories.length == 0 && !loading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>
                    <AntDesign name="meh" size={80} color="black" />
                </Text>
            </View>
        );
    }

    return (
        <View
            style={styles.container}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={curId != null}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you really want to delete?</Text>
                        <View>
                            <TouchableOpacity style={[styles.btn, styles.btnDelete]} onPress={handleDelete}>
                                <Text style={styles.btnTxt}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => { setCurId(null) }}>
                                <Text style={styles.btnTxt}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <FlatList
                contentContainerStyle={styles.list}
                data={data.histories}
                renderItem={
                    ({ item }) =>
                        <HistoryItem
                            name={item.common_name}
                            date={item.updated_at}
                            imageUri={item.thumb_img_url}
                            scienceName={item.binomial_name}
                            onPress={() => { if(curId == null) setCurId(item._id) }}
                            key={item._id}
                        />
                }
                // keyExtractor={(item, index) => item._id}
                onEndReachedThreshold={0.3}
                onEndReached={handleReachEnd}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingTop: 60,
    },
    list: {
        paddingHorizontal: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2cb1bc',
        marginVertical: 16,
    },
    btnDelete: {
        backgroundColor: '#c91f37',
    },
    btnTxt: {
        fontSize: 16,
        letterSpacing: 1,
        color: '#fff',
    },
});