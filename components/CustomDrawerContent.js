import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {Image, StyleSheet, Text, ToastAndroid, View} from "react-native";
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome';
import img from "../assets/quiz-img.png";
import * as React from "react";
import {Button} from "react-native-elements";
import {getData, storeData} from "../service/AsyncStorage";
import NetInfo from "@react-native-community/netinfo";

export default class CustomDrawerContent extends React.Component {

    state = {
        quizList: []
    }

    componentDidMount() {
        this.fetchList();
    }

    fetchList = () => {
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
                        storeData("database", JSON.stringify(quizList))
                        this.setState({
                            ...this.state,
                            quizList: _.shuffle(quizList)
                        })
                    });
            });
    }

    randomPick = () => {
        const { quizList } = this.state;
        let { navigation } = this.props;

        const id = quizList[Math.floor(Math.random() * quizList.length)].id;

        navigation.navigate('Quiz', {
            id
        });
    }

    handleClickQuiz = (id) => {
        let {navigation} = this.props;
        navigation.navigate('Quiz', {
            id
        });
    }

    handleHomepage = () => {
        let {navigation} = this.props;
        navigation.navigate('Home');
    }

    handleResults = () => {
        let {navigation} = this.props;

        NetInfo.fetch().then(({isConnected}) => {
            if(isConnected){
                navigation.navigate('Result');
            }
        })
    }

    render() {
        return (
            <DrawerContentScrollView {...this.props}>
                <View style={styles.container}>
                    <Text style={styles.text}>Quiz App</Text>
                    <Image style={styles.image} source={img}/>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonsContainerButton}>
                            <Button icon={ <Icon
                                name="random"
                                size={20}
                                color="white"
                            /> } onPress={this.randomPick} />
                        </View>
                        <View style={styles.buttonsContainerButton}>
                            <Button icon={ <Icon
                                name="cloud-download"
                                size={20}
                                color="white"
                            /> } onPress={this.fetchList} />
                        </View>
                    </View>
                </View>
{/*
                <DrawerItemList {...this.props} />
*/}
                <View>
                    <DrawerItem label={"Home"} onPress={() => this.handleHomepage()} options={{ title: "Home", unmountOnBlur: true}} unmountOnBlur={true} />
                </View>
                <View>
                    <DrawerItem label={"Results"} onPress={() => this.handleResults()} options={{ title: "Results", unmountOnBlur: true}} unmountOnBlur={true} />
                </View>
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
    },
    buttonsContainerButton: {
        flex: 1,
        marginVertical: 6,
        marginHorizontal: 12
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});