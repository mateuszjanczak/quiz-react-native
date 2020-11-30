import * as React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Header from "../components/navigation/Header";

function ResultScreen(props) {
    let {navigation} = props;
    return (
        <View style={styles.wrapper}>
            <Header navigation={navigation} title={"Results"}/>
            <View style={styles.container}>
                <Text>Content...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    container: {
        flex: 0.92,
        backgroundColor: "silver"
    }
});

export default ResultScreen;