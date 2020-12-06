import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Image, StyleSheet, Text, View} from "react-native";
import img from "../assets/quiz-img.png";
import * as React from "react";

export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Text style={styles.text}>Quiz App</Text>
                <Image style={styles.image} source={img}/>
            </View>
            <DrawerItemList {...props} />
            {/*<View style={styles.anotherList}>*/}
            {/*    <DrawerItem label="Test1" onPress={() => alert('Link to help')} />*/}
            {/*</View>*/}
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    text: {
        textAlign: "center",
        fontSize: 24
    },
    image: {
        width: 230,
        height: 110,
        margin: 12
    },
    anotherList: {
        marginVertical: 16
    }
});