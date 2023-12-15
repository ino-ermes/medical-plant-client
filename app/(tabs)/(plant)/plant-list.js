import { StyleSheet, View, TextInput, FlatList, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { PlantItem } from '../../../components';
import { useRouter } from 'expo-router';

const list = [
    {
        image: 'https://yte123.com/wp-content/uploads/2018/07/c%C3%A2y-kim-ng%C3%A2n-hoa-e1532269686635.jpg',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        key: '1'
    },
    {
        image: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        key: '2'
    },
    {
        image: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        key: '3'
    },
    {
        image: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        key: '4'
    },
    {
        image: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        key: '5'
    },
    {
        image: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        id: '6'
    },
    {
        image: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        id: '7'
    },
    {
        image: 'https://bs.plantnet.org/image/s/3b7d7b045c8a2885e791fe8a8c2ac230e2601461',
        name: 'KIM TIỀN THẢO',
        scienceName: 'Desmodium styracifolium (Osbeck) Merr.',
        id: '8'
    },
]

export default function PlantList() {

    const [searchText, setSearchText] = useState('');
    const [focusSearch, setfocusSearch] = useState(false);

    const router = useRouter();

    const handelSearch = () => {
        Keyboard.dismiss();
        console.log(searchText);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput style={styles.searchInput} onSubmitEditing={handelSearch} value={searchText} onChangeText={(text) => { setSearchText(text) }} onFocus={() => { setfocusSearch(true) }} onBlur={() => { setfocusSearch(false) }} />
                <Feather name="search" size={20} style={focusSearch ? styles.searchIconFocusInput : styles.searchIcon} onPress={handelSearch} />
            </View>
            <FlatList contentContainerStyle={{ paddingBottom: 12 }}
                data={list}
                renderItem={({ item }) =>
                    <PlantItem
                        name={item.name}
                        scienceName={item.scienceName}
                        src={item.image}
                        onPress={() => {router.push('/plant-details')}}
                    />

                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingTop: 90,
        marginBottom: 5,
    },
    searchBar: {
        position: 'absolute',
        width: '100%',
        height: 40,
        flexDirection: 'row',
        top: 50,
        zIndex: 999,
    },
    searchInput: {
        height: '100%',
        flex: 1,
        padding: 4,
        paddingLeft: 14,
        paddingRight: 40,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        borderWidth: 2,
        marginHorizontal: 6,
        fontSize: 16,
    },
    searchIcon: {
        padding: 10,
        position: 'absolute',
        right: 6,
        opacity: 0.5,
    },
    searchIconFocusInput: {
        padding: 10,
        position: 'absolute',
        right: 6,
    }
});
