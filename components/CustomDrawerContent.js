import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {Image, StyleSheet, Text, View} from "react-native";
import img from "../assets/quiz-img.png";
import * as React from "react";

export default class CustomDrawerContent extends React.Component {

    state = {
        quizList: []
    }

    componentDidMount() {
        fetch(`http://tgryl.pl/quiz/tests`)
            .then(res => res.json())
            .then(quizList => {
                this.setState({
                    ...this.state,
                    quizList
                });
            })
    }

    handleClickQuiz = (id) => {
        let {navigation} = this.props;
        navigation.navigate('Quiz', {
            id
        });
    }

    render() {
        return (
            <DrawerContentScrollView {...this.props}>
                <View style={styles.container}>
                    <Text style={styles.text}>Quiz App</Text>
                    <Image style={styles.image} source={img}/>
                </View>
                <DrawerItemList {...this.props} />
                <View style={styles.anotherList}>
                    {this.state.quizList.map(({id, name}, index) =>{
                        return (
                            <View key={index}>
                                <DrawerItem label={name} onPress={() => this.handleClickQuiz(id)} options={{ title: "Quiz", unmountOnBlur: true}} unmountOnBlur={true} />
                            </View>
                        )
                    })}
                </View>
            </DrawerContentScrollView>
        );
    }
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
        borderTopWidth: 1
    }
});