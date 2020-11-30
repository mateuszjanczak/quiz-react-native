import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import HomeScreen from "./views/HomeScreen";
import ResultScreen from "./views/ResultScreen";
import img from "./assets/quiz-img.png";
import QuizScreen from "./views/QuizScreen";

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Text style={styles.text}>Quiz App</Text>
                <Image style={styles.image} source={img}/>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem label="Help" onPress={() => alert('Link to help')} />
        </DrawerContentScrollView>
    );
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
    }
});

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

export default function App() {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
}
