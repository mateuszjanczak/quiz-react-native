import {StatusBar, StyleSheet, Text, View} from "react-native";
import { Button } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as React from "react";

class Header extends React.Component {

    state = {
        isNetwork: false
    }

    componentDidMount() {
        NetInfo.addEventListener(state => {
            this.setState({
                isNetwork: state.isConnected
            })
        });
    }

    render() {
        let {navigation, title} = this.props;
        return (
            <>
                <View style={styles.header}>
                    <StatusBar style="auto"/>

                    <Button style={styles.headerButton} icon={<Icon
                        name="bars"
                        size={20}
                        color="white"
                    />} onPress={() => navigation.toggleDrawer()}/>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                {!this.state.isNetwork && <View style={styles.internetError}>
                    <Text style={styles.internetErrorText}>Brak internetu</Text>
                </View>}
            </>
        );
    }
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
        textAlign: "center",
        fontFamily: "Roboto_400Regular"
    },

    container: {
        flex: 0.92,
        backgroundColor: "silver"
    },

    internetError: {
        backgroundColor: "red"
    },

    internetErrorText: {
        textAlign: "center",
        color: "white",
        padding: 8
    }
});

export default Header;