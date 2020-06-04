import React from 'react';
import {View, ScrollView, Image, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar} from 'react-native'
import firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'
import Fire from '../Fire'
import DropDownPicker from 'react-native-dropdown-picker';
import CustomMultiPicker from "react-native-multiple-select-list";

var userList = ["Spaceship design","Special materials",
    "Eating food grown in space",
    "New propulsion designs",
    "Building  on mars and the moon",
    "Women astronauts",
    "Space diplomats",
    "Life on other planets",
    "AI and the coming Quantum Brain",
    "Have you seen a UFO?",
    ];
export default class CreateNewProjectScreen extends React.Component {
    static navigationOptions = {  
        headerShown: false
    };
    state ={
        title: "",
        descrip:"",
        resources:"", 
        error: null,
        endGoal: "",
        studentsActions: "",
    
    }
    
    handleSignUp = () => {
        Fire.shared.addProject({title: this.state.title, descrip: this.state.descrip, resources: this.state.resources, endGoal: this.state.endGoal, studentsActions: this.state.studentsActions})
        .then(userCredentials => {
            // return userCredentials.user.updateProfile({
            //     displayName: this.state.name
            // })
        })
        .catch(error => console.log("The error is",error)
        )
        this.props.navigation.navigate("Projects")
       
    }
    render() {
        return (
   <ScrollView>
        <View style = {styles.container}>
            <StatusBar barStyle = "light-content"></StatusBar>
             {/* <Image style = {{left: 305, width: 100, height: 100, marginTop: 2}}source ={require('../forreallogo.png')}></Image> */}
             <TouchableOpacity style ={styles.back} onPress = {() => this.props.navigation.navigate("Projects")}>
                 <Ionicons name = "ios-arrow-round-back" size ={32} color = "black"></Ionicons>
             </TouchableOpacity>
            <Text style = {styles.greeting}>{`Thank's for starting a project.\nPlease answer these short questions.`}</Text>
            
            <View style = {styles.errorMessage}>
                {this.state.errorMessage && <Text style = {styles.error}>{this.state.errorMessage}</Text>}
            </View>

            <View style = {styles.form}>
                <View>
                    <Text style = {styles.inputTitle}>Title</Text>
                    <TextInput
                    style = {styles.input}
                   
              
                    onChangeText ={title => this.setState({title})}
                    value = {this.state.title}></TextInput>
                </View>
        
                <View style = {{marginTop: 32}}>
                    <Text style = {styles.inputTitle}>Please describe your project</Text>
                    <TextInput
                    style = {styles.longText}
                  
                    multiline = {true} numberOfLines={4} 
                    onChangeText ={descrip => this.setState({descrip})}
                    value = {this.state.descrip}
                    ></TextInput>
                </View>

                <View style = {{marginTop: 32}}>
                    <Text style = {styles.inputTitle}>Do you need us to provide any resources?</Text>
                    <TextInput
                    style = {styles.longText}
                  
                    multiline = {true} numberOfLines={4} 
                    onChangeText ={resources => this.setState({resources})}
                    value = {this.state.resources}
                    ></TextInput>
                </View>
                <View style = {{marginTop: 32}}>
                    <Text style = {styles.inputTitle}>What is your end goal?</Text>
                    <TextInput
                    style = {styles.longText}
                  
                    multiline = {true} numberOfLines={4} 
                    onChangeText ={endGoal => this.setState({endGoal})}
                    value = {this.state.endGoal}
                    ></TextInput>
                </View>
                <View style = {{marginTop: 32}}>
                    <Text style = {styles.inputTitle}>What will the students do?</Text>
                    <TextInput
                    style = {styles.longText}
                  
                    multiline = {true} numberOfLines={4} 
                    onChangeText ={studentsActions => this.setState({studentsActions})}
                    value = {this.state.studentsActions}
                    ></TextInput>
                </View>

               
                </View>
                    <View style = {{width: 370, marginLeft: 20, marginBottom: 32, zIndex: -1}}>
                        <Text style = {styles.lastInputTitle}>Does your project fit under any of these topics?</Text>
                        <CustomMultiPicker
                            options={userList}
                            multiple={true} 
                            returnValue={"label"} // label or value
                        callback={(res)=>{ /*this.setState({interestingTopics: res}) */}} // callback, array of selected items
                            rowBackgroundColor={"#eee"}
                            rowHeight={40}
                            rowRadius={5}
                            iconColor={"#00a2dd"}
                            iconSize={25}
                
                            selectedIconName={"ios-checkmark-circle-outline"}
                        
                            scrollViewHeight={130}
                            //selected={[1,2]} // list of options which are selected by default
                        />
                </View>
          
            <TouchableOpacity style = {styles.button} onPress = {this.handleSignUp}>
                <Text style = {{color: "white"}}>Create Project</Text>
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
        marginTop: 102,
        fontSize: 18,
        fontWeight: "500",
        textAlign: 'center',
        paddingLeft: 15,
        paddingRight: 15,
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
    color: "#8a8F9E",
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