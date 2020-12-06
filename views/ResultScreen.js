import * as React from 'react';
import {FlatList, RefreshControl, SafeAreaView, StyleSheet, View} from "react-native";
import Header from "../components/navigation/Header";
import {Row, Table} from "react-native-table-component";

const results = [
    {
        nick: 'Golem',
        score: 30,
        total: 40,
        type: "historia",
        date: "2018-11-22"
    },
    {
        nick: 'Golem',
        score: 30,
        total: 40,
        type: "historia",
        date: "2018-11-22"
    },
    {
        nick: 'Golem',
        score: 30,
        total: 40,
        type: "historia",
        date: "2018-11-22"
    }
];

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class ResultScreen extends React.Component {

    state = {
        refreshing: false
    }

    renderItem = ({item}) => {
        const { nick, score, total, type, date } = item;
        return <Row data={[nick, score + "/" + total, type, date]} textStyle={{margin: 6}} borderStyle={{borderWidth: 1, borderColor: 'gray'}} />
    }

    handleOnRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            wait(2000).then(() => this.setState({ refreshing: false}));
        })
    }


    render() {
        let {navigation} = this.props;
        const {refreshing} = this.state;
        return (
            <View style={styles.wrapper}>
                <Header navigation={navigation} title={"Results"}/>
                <View style={styles.container}>
                    <Table style={styles.table}>
                        <Row data={['User', 'Points', 'Type', 'Date']} style={styles.HeadStyle} textStyle={styles.TableText}/>
                        <SafeAreaView>
                            <FlatList renderItem={this.renderItem} data={results} keyExtractor={(item, index) => index.toString()} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.handleOnRefresh} />}/>
                        </SafeAreaView>
                    </Table>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    container: {
        flex: 0.92,
        backgroundColor: "silver"
    },

    table: {
        margin: 8,
        backgroundColor: "white",
    },

    HeadStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: 'lightgray'
    },

    TableText: {
        margin: 10
    }
});

export default ResultScreen;