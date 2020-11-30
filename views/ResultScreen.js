import * as React from 'react';
import {StyleSheet, View} from "react-native";
import Header from "../components/navigation/Header";
import {Row, Rows, Table} from "react-native-table-component";

class ResultScreen extends React.Component {
    state = {
        HeadTable: ['User', 'Points', 'Type', 'Date'],
        DataTable: [
            ['QWE', '500', 'Test1', '25.11.2020'],
            ['RTY', '400', 'Test2', '28.11.2020'],
            ['UIO', '300', 'Test1', '27.11.2020'],
            ['ASD', '200', 'Test3', '29.11.2020'],
            ['FGH', '100', 'Test1', '30.11.2020']
        ]
    }

    render() {
        let {navigation} = this.props;
        let {HeadTable, DataTable} = this.state;
        return (
            <View style={styles.wrapper}>
                <Header navigation={navigation} title={"Results"}/>
                <View style={styles.container}>
                    <Table style={styles.table} borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                        <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
                        <Rows data={DataTable} textStyle={styles.TableText}/>
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