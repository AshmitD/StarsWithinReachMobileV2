import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, LayoutAnimation} from 'react-native'
import firebase from 'firebase'
export default class LoginScreen extends React.Component {
    static navigationOptions = { 
        headerShown: false
    };
    state ={
        email:"",
        password:"", 
        errorMessage: null
    }

    handleLogin =() => {
        const {email, password} = this.state
        firebase.auth().signInWithEmailAndPassword(email,password).catch(error => this.setState({errorMessage: error.message}))
    }
    render() {
        return (
            <ScrollView> 
        <View style = {styles.container}>
            <StatusBar barStyle = "light-content"></StatusBar>
            <Image style = {{alignSelf: 'center', width: 205, height: 205, marginTop: 72}}source ={require('../forreallogo.png')}></Image>
            <Text style = {styles.greeting}>{`Hello again\nWelcome Back.`}</Text>
            
            <View style = {styles.errorMessage}>
                {this.state.errorMessage && <Text style = {styles.error}>{this.state.errorMessage}</Text>}
            </View>

            <View style = {styles.form}>
                <View>
                    <Text style = {styles.inputTitle}>Email Adress</Text>
                    <TextInput
                    style = {styles.input}
                    autoCapitalize="none"
                    onChangeText ={email => this.setState({email})}
                    value = {this.state.email}></TextInput>
                </View>
                <View style = {{marginTop: 32}}>
                <Text style = {styles.inputTitle}>Password</Text>
                <TextInput
                style = {styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText ={password => this.setState({password})}
                value = {this.state.password}></TextInput>
                </View>
                
            </View>

            <TouchableOpacity style = {styles.button} onPress = {this.handleLogin}>
                <Text style = {{color: "white"}}>Sign in</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style ={{alignSelf: 'center',marginTop: 32}} onPress ={() => this.props.navigation.navigate("Register")}>
                <Text style = {{color: "#414959", fontSize: 13}}>
                    New to Stars Within Reach? <Text style = {{fontWeight: "500", color: "#E9446A"}}>Sign Up</Text>

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
      height: 900
    },
    greeting: {
        marginTop: 12,
        fontSize: 18,
        fontWeight: "500",
        textAlign: 'center'
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
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600", 
        textAlign: "center"
    },
    inputTitle: {
        color: "#8a8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8a8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#F76C6C",
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    }
})