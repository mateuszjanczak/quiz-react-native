import * as React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView, Button, TouchableOpacity} from "react-native";
import _ from 'lodash'
import Header from "../components/navigation/Header";
import {getData} from "../service/AsyncStorage";
import NetInfo from "@react-native-community/netinfo";

class HomeScreen extends React.Component {

    state = {
        quizList : [

        ]
    }

    componentDidMount() {
       /* fetch(`http://tgryl.pl/quiz/tests`)
            .then(res => res.json())
            .then(quizList => {
                this.setState({
                    ...this.state,
                    quizList: _.shuffle(quizList)
                });
            })*/

        getData('database')
            .then(data => JSON.parse(data))
            .then(quizList => {
                this.setState({
                    ...this.state,
                    quizList: _.shuffle(quizList)
                });
            })
            .catch(() => {
                fetch(`http://tgryl.pl/quiz/tests`)
                    .then(res => res.json())
                    .then(quizList => {
                        this.setState({
                            ...this.state,
                            quizList: _.shuffle(quizList)
                        });
                    })
            });
    }


    renderItem = ({id, name, tags, description}) => {
        return (
            <TouchableOpacity key={id} onPress={() => this.handleClick(id)}>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}>{name}</Text>
                    <Text style={styles.itemTags}>{tags.join(", ")}</Text>
                    <Text style={styles.itemDescription}>{description}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    handleClick = (id) => {
        let {navigation} = this.props;
        navigation.navigate('Quiz', {
            id
        });
    }

    render() {
        let {navigation} = this.props;
        return (
            <View style={styles.wrapper}>
                <Header navigation={navigation} title={"Home"}/>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View>
                            {this.state.quizList.map((item) => this.renderItem(item))}
                        </View>
                        <View style={styles.rank}>
                            <Text style={styles.rankTitle}>Get to know your ranking result</Text>
                            <Button title={"Check!"} onPress={() => navigation.navigate('Result')} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
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

    item: {
        margin: 8,
        padding: 16,
        backgroundColor: "white"
    },

    itemTitle: {
        fontSize: 16,
        fontFamily: "Oswald_700Bold"
    },

    itemTags: {
        color: "blue",
        fontSize: 12,
        paddingVertical: 8,
        fontFamily: "Roboto_400Regular"
    },

    itemDescription: {
        fontSize: 14,
        fontFamily: "Roboto_400Regular"
    },

    rank: {
        marginTop: 8,
        padding: 16,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },

    rankTitle: {
        textAlign: "center",
        margin: 10,
        fontFamily: "Roboto_400Regular"
    }
});

export default HomeScreen;