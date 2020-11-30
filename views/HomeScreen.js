import * as React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView, Button} from "react-native";
import Header from "../components/navigation/Header";

class HomeScreen extends React.Component {

    quizList = [
        {
            title: 'Title test #1',
            tags: ['#Tag1', "#Tag2"],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis condimentum ipsum, eu convallis tellus molestie ac. '
        },
        {
            title: 'Title test #2',
            tags: ['#Tag1', "#Tag2"],
            description: 'Donec faucibus quam ut lorem auctor, tempus tincidunt nulla fermentum. Aenean rhoncus nibh quis arcu ultrices, id sodales ante pretium.'
        },
        {
            title: 'Title test #3',
            tags: ['#Tag1', "#Tag2"],
            description: 'Duis in sem sapien. Curabitur eu lorem lacinia, venenatis orci vitae, scelerisque dui.'
        },
        {
            title: 'Title test #4',
            tags: ['#Tag1', "#Tag2"],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis condimentum ipsum, eu convallis tellus molestie ac. '
        },
        {
            title: 'Title test #5',
            tags: ['#Tag1', "#Tag2"],
            description: 'Donec faucibus quam ut lorem auctor, tempus tincidunt nulla fermentum. Aenean rhoncus nibh quis arcu ultrices, id sodales ante pretium.'
        },
        {
            title: 'Title test #6',
            tags: ['#Tag1', "#Tag2"],
            description: 'Duis in sem sapien. Curabitur eu lorem lacinia, venenatis orci vitae, scelerisque dui.'
        },
    ]

    renderItem = ({title, tags, description}) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemTags}>{tags}</Text>
                <Text style={styles.itemDescription}>{description}</Text>
            </View>
        )
    }

    render() {
        let {navigation} = this.props;
        return (
            <View style={styles.wrapper}>
                <Header navigation={navigation} title={"Home"}/>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View>
                            {this.quizList.map((item) => this.renderItem(item))}
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
        fontSize: 16
    },

    itemTags: {
        color: "blue",
        fontSize: 12,
        paddingVertical: 8
    },

    itemDescription: {
        fontSize: 12
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
        margin: 10
    }
});

export default HomeScreen;