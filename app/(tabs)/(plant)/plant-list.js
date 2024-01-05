import { StyleSheet, View, TextInput, FlatList, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect, useMemo } from 'react';
import { PlantItem } from '../../../components';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../../context/appContext';
import { CircleSpin } from '../../../components';
import { AntDesign } from '@expo/vector-icons';

export default function PlantList() {

    const [search, setSearch] = useState('');
    const [localSearch, setLocalSearch] = useState('');
    const [isFocus, setFocus] = useState(false);
    const [plants, setPlants] = useState([]);

    const [loading, setLoading] = useState(false);

    const debounce = (fn) => {
        let timerId;
        return (text) => {
            if (loading) return;
            clearTimeout(timerId);
            setLocalSearch(text);
            timerId = setTimeout(() => {
                fn(text);
            }, (1000));
        }
    };

    const optimizedDebounde = useMemo(() => {
        return debounce((text) => {
            setSearch(text);
        });
    }, []);

    const router = useRouter();

    const { myFetch } = useAppContext();
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                url = '/plants';
                if (search) {
                    url += `?search=${search}`
                }
                const response = await myFetch.get(url);
                const { plants } = response.data;
                setPlants(plants);
            } catch (error) {
                setPlants([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [search]);

    if (loading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <CircleSpin />
            </View>
        )
    }

    if (plants.length == 0) {
        return (
            <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
                <View style={styles.searchBar}>
                    <TextInput style={[styles.searchInput, isFocus ? styles.searchInputFocus : null]} value={localSearch} onChangeText={optimizedDebounde} onFocus={() => { setFocus(true) }} onBlur={() => { setFocus(false) }} placeholder='Search' />
                    <Feather name="search" size={20} style={[styles.searchIcon, isFocus ? styles.searchIconFocusInput : null]} />
                </View>
                <AntDesign name="meh" size={80} color="black"/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput style={[styles.searchInput, isFocus ? styles.searchInputFocus : null]} value={localSearch} onChangeText={optimizedDebounde} onFocus={() => { setFocus(true) }} onBlur={() => { setFocus(false) }} placeholder='Search' />
                <Feather name="search" size={20} style={[styles.searchIcon, isFocus ? styles.searchIconFocusInput : null]} />
            </View>
            <FlatList contentContainerStyle={{ paddingBottom: 12 }}
                data={plants}
                renderItem={({ item }) =>
                    <PlantItem
                        name={item.common_name}
                        scienceName={item.binomial_name}
                        src={item.thumb_img_url}
                        onPress={() => {
                            router.push({
                                'pathname': '/plant-details',
                                'params': {
                                    'plant_id': item._id
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
    searchInputFocus: {
        borderColor: '#000',
    },
    searchIcon: {
        padding: 10,
        position: 'absolute',
        right: 6,
        opacity: 0.5,
    },
    searchIconFocusInput: {
        opacity: 1,
    }
});
