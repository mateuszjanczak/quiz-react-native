import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import HomeScreen from "./views/HomeScreen";
import ResultScreen from "./views/ResultScreen";
import QuizScreen from "./views/QuizScreen";
import Modal from "./components/MyModal";
import {getData, storeData} from "./service/AsyncStorage";
import CustomDrawerContent from "./components/CustomDrawerContent";
import { useFonts, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { Roboto_300Light, Roboto_400Regular } from '@expo-google-fonts/roboto';
import {View} from "react-native";

const Drawer = createDrawerNavigator();

function MyDrawer() {
    let [fontsLoaded] = useFonts({
        Oswald_700Bold,
        Roboto_400Regular,
        Roboto_300Light
    });

    if (!fontsLoaded) {
        return <View/>;
    }

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Home", unmountOnBlur: true}} unmountOnBlur={true}/>
            <Drawer.Screen name="Result" component={ResultScreen} options={{ title: "Results", unmountOnBlur: true}} unmountOnBlur={true}/>
            <Drawer.Screen name="Quiz" component={QuizScreen} options={{ title: "Quiz", unmountOnBlur: true}} unmountOnBlur={true}/>
        </Drawer.Navigator>
    );
}

export default class App extends React.Component {

    state = {
        modalVisible: false
    }

    componentDidMount() {
        getData('RULES')
            .then(data => data !== 'true')
            .then(data => this.setState({ modalVisible: data }));


        const d = new Date();
        console.log(d);
        getData("updateDate")
            .then(date => {
                if(date !== d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear()){
                    fetch(`http://tgryl.pl/quiz/tests`)
                        .then(res => res.json())
                        .then(quizList => {
                            storeData("database", JSON.stringify(quizList))
                            quizList.map(quiz => {
                                fetch(`http://tgryl.pl/quiz/test/${quiz.id}`)
                                    .then(res => res.json())
                                    .then(quiz => {
                                        storeData(quiz.id, JSON.stringify(quiz));
                                        storeData("updateDate", d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear())
                                        console.log("pobrano wszytsko")
                                    })
                            })
                        })
                }
            })
    }

    handleAcceptRules = () => {
        storeData('RULES', 'true')
            .then(() => this.setState({ modalVisible: false }));
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <NavigationContainer>
                <Modal visible={modalVisible} onPress={this.handleAcceptRules}/>
                <MyDrawer/>
            </NavigationContainer>
        );
    }
}
