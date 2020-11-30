import * as React from 'react';
import {Button, View} from "react-native";

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Home')}
                title="Go to home"
            />
        </View>
    );
}

export default HomeScreen;