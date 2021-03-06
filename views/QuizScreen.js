import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Animated, Button, ToastAndroid} from "react-native";
import _ from 'lodash'
import Header from "../components/navigation/Header";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";
import {Input} from "react-native-elements";
import {getData} from "../service/AsyncStorage";
import * as NetInfo from "@react-native-community/netinfo";

class QuizScreen extends React.Component {

    state = {
        testId: '',
        name: 'Quiz',
        tasks: {},
        tags: [],
        task: {},
        taskIndex: -1,
        points: 0,
        duration: 30,
        loaded: false,
        completed: false,
        nick: ''
    }

    componentDidMount() {
        const { id } = this.props.route.params;
        fetch(`http://tgryl.pl/quiz/test/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    ...this.state,
                    tasks: _.shuffle(data.tasks),
                    id: data.id,
                    name: data.name,
                    tags: data.tags
                });
            })
            .then(() => this.loadTask())
            .catch(() => {
                getData(id)
                    .then(data => JSON.parse(data))
                    .then(quiz => {
                        this.setState({
                            ...this.state,
                            tasks: _.shuffle(quiz.tasks),
                            id: quiz.id,
                            name: quiz.name,
                            tags: quiz.tags
                        });
                    })
                    .then(() => this.loadTask());
            })

    }

    loadTask = () => {
        let { taskIndex } = this.state;

        taskIndex = taskIndex + 1;

        if(this.state.tasks.length === taskIndex) {
            this.setState({
                ...this.state,
                completed: true,
                loaded: false
            })
        } else {
            this.setState({
                ...this.state,
                task: {
                    question: this.state.tasks[taskIndex].question,
                    answers: _.shuffle(this.state.tasks[taskIndex].answers),
                    duration: this.state.tasks[taskIndex].duration
                },
                duration: this.state.tasks[taskIndex].duration,
                loaded: true
            })
        }
    }

    handleNextTask = () => {
        let { taskIndex } = this.state;
        taskIndex = taskIndex + 1;
        this.setState({
            ...this.state,
            taskIndex
        }, () => {
            this.loadTask();
        })
    }

    markTheAnswer = (id) => {
        const { answers } = this.state.task;
        let { points } = this.state;

        if(answers[id].isCorrect === true) {
            points += 1;
        }

        this.setState({
            ...this.state,
            points,
            loaded: false
        }, () => this.handleNextTask())
    }

    handleChange = (nick) => {
        this.setState({
            ...this.state,
            nick
        })
    }

    handleSubmit = () => {
        const { nick, points, tasks, name } = this.state;

        const object = {
            nick: nick,
            score: points,
            total: tasks.length,
            type: name
        }

        NetInfo.fetch().then(({isConnected}) => {
            if(isConnected){
                fetch(`http://tgryl.pl/quiz/result`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
                ToastAndroid.show("Result submitted!", ToastAndroid.SHORT)
            } else {
                ToastAndroid.show("No internet connection!", ToastAndroid.SHORT)
            }
        })
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
        let {navigation} = this.props;
        return (
            <View style={styles.wrapper}>
                <Header navigation={navigation} title={this.state.name}/>
                <View style={styles.container}>
                    <View style={styles.quiz}>
                        {this.state.loaded && !this.state.completed &&
                            <>
                                <View style={styles.quizHeader}>
                                    <Text style={styles.quizHeaderText}>Question {this.state.taskIndex+2} of {this.state.tasks.length}</Text>
                                </View>

                                <View style={styles.quizTitle}>
                                    <Text style={styles.quizTitleText}>{this.state.task.question}</Text>
                                </View>

                                <View style={styles.timer}>
                                    {this.state.loaded && <CountdownCircleTimer key={this.state.taskIndex} onComplete={this.handleNextTask} isPlaying duration={this.state.duration} colors={[['#004777', 0.4], ['#F7B801', 0.4], ['#A30000', 0.2],]}>
                                        {({ remainingTime, animatedColor }) => (
                                            <Animated.Text style={{ color: animatedColor }}>
                                                {remainingTime}
                                            </Animated.Text>
                                        )}
                                    </CountdownCircleTimer>}
                                </View>

                                <View style={styles.answers}>
                                    {this.state.task.answers.map(({content}, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={styles.answer} onPress={() => this.markTheAnswer(index)}>
                                                <Text style={styles.answerText}>{content}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </>
                        }
                        {this.state.completed &&
                            <>
                            <View style={styles.notice}>
                                <View>
                                    <Text style={styles.noticeText}>Congratulations!</Text>
                                    <Text style={styles.noticeTextBottom}>You got {this.state.points} points!</Text>
                                    <Text>  </Text>
                                </View>
                            </View>
                            <View style={styles.notice}>
                                <Text style={styles.noticeTextBottom}>Would you like to share your result with friends? :)</Text>
                                <Input value={this.state.nick} onChangeText={(value) => this.handleChange(value)} placeholder={"Your nickname"}/>
                                <Button title={"Send"} onPress={this.handleSubmit}/>
                            </View>
                            <View style={styles.rank}>
                                <Text style={styles.rankTitle}>Get to know your ranking result</Text>
                                <Button title={"Check!"} onPress={this.handleResults} />
                            </View>
                            </>
                        }
                    </View>
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

    quizHeaderText: {
      fontFamily: "Oswald_700Bold",
        fontSize: 20
    },

    quizTitle: {
        margin: 12
    },

    quizTitleText: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Roboto_400Regular"
    },

    timer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    answers: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent:'stretch',
        justifyContent: 'center',
    },

    answer: {
        flexBasis: "40%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        margin: 12,
        borderColor: 'black',
        borderWidth: 1
    },

    answerText: {
        textAlign: "center"
    },

    notice: {
        marginBottom: 25,
    },

    noticeText: {
        fontSize: 20,
        textAlign: "center"
    },

    noticeTextBottom: {
        fontSize: 16,
        textAlign: "center"
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

export default QuizScreen;