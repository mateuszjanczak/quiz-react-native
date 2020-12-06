import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Animated} from "react-native";
import Header from "../components/navigation/Header";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";

const tasks = [
    {
        question: "Najmłodsza osoba w ekipie",
        answers: [
            {
                content: "Mixer",
                isCorrect: true
            },
            {
                content: "Friz",
                isCorrect: false
            },
            {
                content: "Wujek Łuki",
                isCorrect: false
            },
            {
                content: "Tromba",
                isCorrect: false
            },
        ],
        duration: 5
    },
    {
        question: "Uwielbia helikoptery",
        answers: [
            {
                content: "Mini Majk",
                isCorrect: false
            },
            {
                content: "Wujek Łuki",
                isCorrect: true
            },
            {
                content: "Poczciwy Krzychu",
                isCorrect: false
            },
            {
                content: "Marta",
                isCorrect: false
            },
        ],
        duration: 7
    },
    {
        question: "Opłaca dom ekipy",
        answers: [
            {
                content: "Wujek Łuki",
                isCorrect: false
            },
            {
                content: "Wersow",
                isCorrect: false
            },
            {
                content: "Friz",
                isCorrect: true
            },
            {
                content: "Mixer",
                isCorrect: false
            },
        ],
        duration: 4
    },
    {
        question: "Został zamknięty w swoim pokoju na 24 godziny",
        answers: [
            {
                content: "Mini Majk",
                isCorrect: false
            },
            {
                content: "Poczciwy Krzychu",
                isCorrect: false
            },
            {
                content: "Friz",
                isCorrect: false
            },
            {
                content: "Tromba",
                isCorrect: true
            },
        ],
        duration: 9
    },
    {
        question: "Boi się węży",
        answers: [
            {
                content: "Mini Majk",
                isCorrect: true
            },
            {
                content: "Marta",
                isCorrect: false
            },
            {
                content: "Wersow",
                isCorrect: false
            },
            {
                content: "Marcysia",
                isCorrect: false
            },
        ],
        duration: 9
    },
]

class QuizScreen extends React.Component {

    state = {
        task: {},
        taskIndex: -1,
        points: 0,
        duration: 30,
        loaded: false,
        completed: false
    }

    componentDidMount() {
        this.loadTask();
    }

    loadTask = () => {
        let { taskIndex } = this.state;

        taskIndex = taskIndex + 1;

        if(tasks.length === taskIndex) {
            this.setState({
                ...this.state,
                completed: true,
                loaded: false
            })
        } else {
            this.setState({
                ...this.state,
                task: tasks[taskIndex],
                duration: tasks[taskIndex].duration,
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

    render() {
        let {navigation} = this.props;
        return (
            <View style={styles.wrapper}>
                <Header navigation={navigation} title={"Jak dobrze znasz ekipę Friza?"}/>
                <View style={styles.container}>
                    <View style={styles.quiz}>
                        {this.state.loaded && !this.state.completed &&
                            <>
                                <View style={styles.quizHeader}>
                                    <Text>Question {this.state.taskIndex+2} of {tasks.length}</Text>
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
                                    {this.state.loaded &&
                                    <>
                                        <View style={styles.answer}>
                                            <TouchableOpacity onPress={() => this.markTheAnswer(0)}>
                                                <Text style={styles.answerText}>{this.state.task.answers[0].content}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.answer}>
                                            <TouchableOpacity onPress={() => this.markTheAnswer(1)}>
                                                <Text style={styles.answerText}>{this.state.task.answers[1].content}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.answer}>
                                            <TouchableOpacity onPress={() => this.markTheAnswer(2)}>
                                                <Text style={styles.answerText}>{this.state.task.answers[2].content}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.answer}>
                                            <TouchableOpacity onPress={() => this.markTheAnswer(3)}>
                                                <Text style={styles.answerText}>{this.state.task.answers[3].content}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    }
                                </View>
                            </>
                        }
                        {this.state.completed &&
                            <View style={styles.quizHeader}>
                                <Text>Gratulacje!</Text>
                                <Text>Zdobyłeś {this.state.points} punktów</Text>
                            </View>
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

    quizTitle: {
        margin: 12
    },

    quizTitleText: {
        fontSize: 16,
        fontWeight: "bold"
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