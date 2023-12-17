import { View, Pressable, StyleSheet } from "react-native";

export default function Modal({ children, visible, handleOuterPress }) {

    return (
        <View style={visible ? styles.modal : styles.offModal}>
            <Pressable style={styles.outer} onPress={handleOuterPress}>
                {children}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 999,
    },
    offModal: {
        display: 'none',
    },
    outer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});