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

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Home"}}/>
            <Drawer.Screen name="Result" component={ResultScreen} options={{ title: "Results"}}/>
            <Drawer.Screen name="Test1" component={QuizScreen} options={{ title: "Test #1"}}/>
        </Drawer.Navigator>
    );
}

export default class App extends React.Component {

    state = {
        modalVisible: false
    }

    componentDidMount() {
        getData()
            .then(data => data !== 'MODALL')
            .then(data => this.setState({ modalVisible: data }));
    }

    handleAcceptRules = () => {
        storeData('MODALL')
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
