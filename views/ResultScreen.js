import * as React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from "react-native";
import Header from "../components/navigation/Header";
import {Row, Table} from "react-native-table-component";

class ResultScreen extends React.Component {

    state = {
        refreshing: false,
        results: []
    }

    componentDidMount() {
        this.refreshResults();
    }

    refreshResults = () => {
        fetch(`http://tgryl.pl/quiz/results?last=50`)
            .then(res => res.json())
            .then(results => {
                this.setState({
                    ...this.state,
                    results
                });
            })
    }

    renderItem = ({item}) => {
        const { nick, score, total, type, createdOn} = item;
        let { date } = item;
        if(date === undefined) {
            date = createdOn.slice(0, 10);
        }
        return <Row data={[nick, score + "/" + total, type, date]} textStyle={{margin: 6}} borderStyle={{borderWidth: 1, borderColor: 'gray'}} />
    }

    handleOnRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.refreshResults();
            this.setState({ refreshing: false})
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
                        <FlatList renderItem={this.renderItem} data={this.state.results} keyExtractor={(item, index) => index.toString()} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.handleOnRefresh} />}/>
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
        flex: 1,
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