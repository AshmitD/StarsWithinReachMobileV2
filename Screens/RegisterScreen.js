import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons'
import Fire from '../Fire'
import DropDownPicker from 'react-native-dropdown-picker';
import CustomMultiPicker from "react-native-multiple-select-list";

var userList = ["Spaceship design", "Special materials",
    "Eating food grown in space",
    "New propulsion designs",
    "Building  on mars and the moon",
    "Women astronauts",
    "Space diplomats",
    "Life on other planets",
    "AI and the coming Quantum Brain",
    "Have you seen a UFO?",
];
export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };
    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null,
        who: "Space Enthusiast",
        shortBio: "",

    }

    handleSignUp = () => {
        Fire.shared.addUser({ name: this.state.name, email: this.state.email, pass: this.state.password, who: this.state.who, shortBio: this.state.shortBio, projects: [] })
            .then(userCredentials => {
                // return userCredentials.user.updateProfile({
                //     displayName: this.state.name
                // })
            })
            .catch(error => console.log("The error is", error)
            )
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                })
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <StatusBar barStyle="light-content"></StatusBar>
                    <Image style={{ alignSelf: 'center', width: 205, height: 205, marginTop: 72 }} source={require('../forreallogo.png')}></Image>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="ios-arrow-round-back" size={32} color="black"></Ionicons>
                    </TouchableOpacity>
                    <Text style={styles.greeting}>{`Hello.\nSign up to get started.`}</Text>

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Name</Text>
                            <TextInput
                                style={styles.input}

                                autoCapitalize="none"
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}></TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Email Adress</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"

                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}></TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry

                                autoCapitalize="none"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}></TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Short Bio</Text>
                            <TextInput
                                style={styles.longText}

                                multiline={true} numberOfLines={4}
                                onChangeText={shortBio => this.setState({ shortBio })}
                                value={this.state.shortBio}
                            ></TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Who are you?</Text>
                            <DropDownPicker style={{
                                borderBottomColor: "#8a8F9E",
                                borderBottomWidth: StyleSheet.hairlineWidth, zIndex: 2031, position: 'absolute', borderColor: '#FFF'
                            }}
                                items={[
                                    { label: 'Space Enthusiast', value: 'Space Enthusiast' },
                                    { label: 'Professional', value: 'Space Professional' },
                                    { label: 'Student', value: 'Young Girl' },

                                ]}
                                defaultIndex={0}
                                containerStyle={{ height: 40 }}
                                onChangeItem={who => this.setState({ who })}
                            />
                        </View>
                    </View>
                    <View style={{ width: 370, marginLeft: 20, marginBottom: 32, zIndex: -1 }}>
                        <Text style={styles.lastInputTitle}>What are some topics that you like?</Text>
                        <CustomMultiPicker
                            options={userList}
                            multiple={true}
                            returnValue={"label"} // label or value
                            callback={(res) => { /*this.setState({interestingTopics: res}) */ }} // callback, array of selected items
                            rowBackgroundColor={"#eee"}
                            rowHeight={40}
                            rowRadius={5}
                            iconColor={"#F76C6C"}
                            iconSize={25}

                            selectedIconName={"ios-checkmark-circle-outline"}

                            scrollViewHeight={130}
                        //selected={[1,2]} // list of options which are selected by default
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                        <Text style={{ color: "#F8E9A1", fontSize: 15, fontWeight: "500", textTransform: "uppercase" }}>Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 32 }} onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={{ color: "#414959", fontSize: 13 }}>
                            Already have an account? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>

                        </Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 1200
    },
    greeting: {
        marginTop: 22,
        fontSize: 18,
        fontWeight: "500",
        textAlign: 'center',
        color: "#24305E"
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },
    error: {
        color: "#F76C6C",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    inputTitle: {
        color: "#24305E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8a8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D",
        paddingTop: 10,
    },
    longText: {
        borderBottomColor: "#8a8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 80,
        fontSize: 15,
        color: "#161F3D",
    },
    lastInputTitle: {
        color: "#24305E",
        fontSize: 10,
        textTransform: "uppercase",
        marginLeft: 6,
        marginBottom: 5

    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#F76C6C",
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
    },
    back: {
        position: "absolute",
        top: 40,
        left: 22,
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        backgroundColor: "rgba(21,22,48,0.1)",
        justifyContent: 'center'
    }
})