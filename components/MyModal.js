import React from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

function MyModal(props) {
    return (
        <Modal transparent={true} visible={props.visible}>
            <View style={styles.modalView}>
                <View>
                    <Text style={{fontSize: 24}}>Regulamin!</Text>
                    <Text style={{fontSize: 16}}>1. Baw się dobrze</Text>
                    <Text style={{fontSize: 16}}>3. Drugiego punktu nie ma</Text>
                </View>
                <TouchableOpacity style={styles.openButton} onPress={props.onPress}>
                    <Text>Zgadzam się</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "#D4D4D2",
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    openButton: {
        backgroundColor: "#FF9500",
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
    },
})
export default MyModal;