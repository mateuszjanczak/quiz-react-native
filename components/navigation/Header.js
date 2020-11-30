import {StatusBar, StyleSheet, Text, View} from "react-native";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as React from "react";

function Header(props) {
    let {navigation, title} = props;
    return (
        <View style={styles.header}>
            <StatusBar style="auto"/>

            <Button style={styles.headerButton} icon={ <Icon
                name="bars"
                size={20}
                color="white"
            /> }  onPress={() => navigation.toggleDrawer()}/>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 0.08,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },

    headerButton: {
        flex: 1
    },

    headerText: {
        flex: 1,
        textAlign: "center"
    },

    container: {
        flex: 0.92,
        backgroundColor: "silver"
    }
});

export default Header;