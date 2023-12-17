import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { HistoryItem, Dropdown, Modal } from "../../../components";
import { useState } from "react";

const hist = [
    {
        id: '1',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
    {
        id: '2',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
    {
        id: '3',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
    {
        id: '4',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
    {
        id: '5',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
    {
        id: '6',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
    {
        id: '7',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
    {
        id: '8',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
    {
        id: '9',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
    {
        id: '10',
        uri: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        plantId: '1',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        date: '2023/12/12',
        status: '1',
    },
];

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
        id: '123',
        name: 'abc',
    },
    {
        id: '1234',
        name: 'abcd',
    },
];

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
                data={hist}
                renderItem={
                    ({ item }) =>
                        <HistoryItem
                            style={{marginBottom: 10}}
                            name={item.name}
                            date={item.date}
                            imageUri={item.uri}
                            scienceName={item.scienceName}
                            handleDelete={() => setModal({
                                modal: true,
                                action: 'delete',
                                payload: {
                                    histId: item.id,
                                }
                            })}
                            handleShare={() => setModal({
                                modal: true,
                                action: 'share',
                                payload: {
                                    histId: item.id,
                                    plantId: item.plantId,
                                },
                            })}
                        />
                }
                keyExtractor={(item) => item.id}
                onEndReachedThreshold={0}
                onEndReached={() => console.log('reached end')}
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