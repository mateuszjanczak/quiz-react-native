import * as React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Header from "../components/navigation/Header";

function QuizScreen(props) {
    let {navigation} = props;
    return (
        <View style={styles.wrapper}>
            <Header navigation={navigation} title={"Test #1"}/>
            <View style={styles.container}>
                <View style={styles.quiz}>
                    <View style={styles.quizHeader}>
                        <Text>Question 3 of 10</Text>
                        <Text>Time: 28 sec</Text>
                    </View>

                    <View style={styles.quizTitle}>
                        <Text style={styles.quizTitleText}>This is some example of a long question to fill the content?</Text>
                    </View>

                    <View style={styles.answers}>
                        <View style={styles.answer}>
                            <Text style={styles.answerText}>Yes</Text>
                        </View>
                        <View style={styles.answer}>
                            <Text style={styles.answerText}>No</Text>
                        </View>
                        <View style={styles.answer}>
                            <Text style={styles.answerText}>Maybe</Text>
                        </View>
                        <View style={styles.answer}>
                            <Text style={styles.answerText}>Unknown</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    container: {
        flex: 0.92,
        backgroundColor: "silver"
    },

    quiz: {
        margin: 8,
        padding: 16,
        backgroundColor: "white",
    },

    quizHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 12
    },

    quizTitle: {
        margin: 12
    },

    quizTitleText: {
        fontSize: 16,
        fontWeight: "bold"
    },

    answers: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent:'stretch',
        justifyContent: 'center',
    },

    answer: {
        flexBasis: "40%",
        height: 75,
        justifyContent: "center",
        alignItems: "center",
        margin: 12,
        borderColor: 'black',
        borderWidth: 1
    },

    answerText: {

    }
});

export default QuizScreen;