import React from 'react';
import {View, ScrollView, Image, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native'
import firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'
import Fire from '../Fire'
import DropDownPicker from 'react-native-dropdown-picker';
import CustomMultiPicker from "react-native-multiple-select-list";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var userList = ["SCIENCE", "TECHNOLOGY", "ENGINEERING", "MATH", "SPACE"
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
        topics: []
    }
    
    handleSignUp = () => { 
       if(this.state.descrip.length == 0) {
            Alert.alert("Please describe your group.")
       }
       else if(this.state.topics.length == 0) {
<<<<<<< HEAD
            Alert.alert("Please enter some topics.")
        }else {

        return Fire.shared.addProject({title: this.state.title, descrip: this.state.descrip, resources: this.state.resources, endGoal: this.state.endGoal, studentsActions: this.state.studentsActions, topics: this.state.topics})
        .then(userCredentials => {
            console.log('credentials: ', userCredentials);
            const { params } = this.props.navigation.state;
            console.log("This is params", params)
         
                this.props.navigation.navigate("Projects")
            
            // return userC$redentials.user.updateProfile({
=======
        Alert.alert("Please enter some topics.")
    }else {

        Fire.shared.addProject({title: this.state.title, descrip: this.state.descrip, resources: this.state.resources, endGoal: this.state.endGoal, studentsActions: this.state.studentsActions, topics: this.state.topics})
        .then(userCredentials => {
            // return userCredentials.user.updateProfile({
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
            //     displayName: this.state.name
            // })
        })
        .catch(error => Alert(error)
<<<<<<< HEAD
        ).then(() => {
           
        })
      
=======
        )
        this.props.navigation.navigate("Projects")
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
       }
       
        
    }
    render() {
        return (
<<<<<<< HEAD

                 <ScrollView style = {styles.scrollContainer}>
        <View style = {styles.container}>
           
             {/* <Image style = {{left: 305, width: 100, height: 100, marginTop: 2}}source ={require('../forreallogo.png')}></Image> */}
             <View style={styles.header}>
              <View style={styles.linesContainer}>
              <View style={styles.plus}><TouchableOpacity onPress = {() => this.props.navigation.navigate('Projects')}><Ionicons name="ios-arrow-round-back" size={32} color={"#fff"} /></TouchableOpacity></View>
                <Text style={styles.heading}>Create Project</Text>
              
              </View>
            </View> 
            <View style ={styles.content}>
=======
   <ScrollView>
        <View style = {styles.container}>
            <StatusBar barStyle = "light-content"></StatusBar>
             {/* <Image style = {{left: 305, width: 100, height: 100, marginTop: 2}}source ={require('../forreallogo.png')}></Image> */}
            
             <View style={styles.header}>

<TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Projects")}>
    <Ionicons name="ios-arrow-round-back" size={32} color="black"></Ionicons>
</TouchableOpacity>
<Text style={styles.headerTitle}>CREATE A GROUP</Text>
</View>
            
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
            <View style = {styles.errorMessage}>
                {this.state.errorMessage && <Text style = {styles.error}>{this.state.errorMessage}</Text>}
            </View>

            <View style = {styles.form}>
                <View style = {{marginTop: -35}}>
                    <Text style = {styles.inputTitle}>Title</Text>
                    <TextInput
                    style = {styles.input}
                   
              
                    onChangeText ={title => this.setState({title})}
                    value = {this.state.title}></TextInput>
                </View>
        
                <View style = {{marginTop: 32}}>
                    <Text style = {styles.inputTitle}>Please describe your group: </Text>
                    <TextInput
                    style = {styles.longText}
                  
                    multiline = {true} numberOfLines={4} 
                    onChangeText ={descrip => this.setState({descrip})}
                    value = {this.state.descrip}
                    ></TextInput>
                </View>

                <View style = {{marginTop: 32}}>
                    <Text style = {styles.inputTitle}>Please provide some information about you: </Text>
                    <TextInput
                    style = {styles.longText}
                  
                    multiline = {true} numberOfLines={4} 
                    onChangeText ={resources => this.setState({resources})}
                    value = {this.state.resources}
                    ></TextInput>
                </View>
                <View style = {{marginTop: 32}}>
                    <Text style = {styles.inputTitle}>What will you discuss?</Text>
                    <TextInput
                    style = {styles.longText}
                  
                    multiline = {true} numberOfLines={4} 
                    onChangeText ={studentsActions => this.setState({studentsActions})}
                    value = {this.state.studentsActions}
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
               

               
                </View>
                    <View style = {{width: 370, marginLeft: 20, marginBottom: 32, zIndex: -1}}>
                        <Text style = {styles.lastInputTitle}>Choose topics that your group will focus on: </Text>
                      <CustomMultiPicker
                            options={userList}
                            multiple={true} 
                            returnValue={"label"} // label or value
                        callback={(res)=>{this.setState({topics: res})}} // callback, array of selected items
                            
                            rowHeight={40}
                            rowRadius={5}
                           
<<<<<<< HEAD
                            iconColor={"#3772ff"}
=======
                            iconColor={"#F76C6C"}
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
                            iconSize={25}
                            selected={[]}
                            selectedIconName={"ios-checkmark-circle-outline"}
                        
                            scrollViewHeight={130}
                            //selected={[1,2]} // list of options which are selected by default
                        />
                      
                </View>
          
            <TouchableOpacity style = {styles.button} onPress = {this.handleSignUp}>
                <Text style = {{color: "white"}}>CREATE GROUP</Text>
            </TouchableOpacity>
            
          
<<<<<<< HEAD
            </View>
=======

>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
        </View>

        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
<<<<<<< HEAD
        backgroundColor: "#f8f8f8",
        height: "100%",
        width: "100%", 

        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      },
     scrollContainer: {
         height: '100%',
         width: '100%'
     },
      header: {
        backgroundColor: "#3772ff",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 0.75,
        paddingTop: 30,
        paddingBottom: 40
      },
      linesContainer: {
        backgroundColor: "transparent",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      },
      plus: {
        position: "absolute",
        left: 20
      },
      content: {
        flex: 6,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        width: "100%",
        backgroundColor: "#fff",
        position: "relative",
        top: -30,
      },
      heading: {
        fontSize: 30,
        textTransform: "uppercase",
        letterSpacing: 2,
        paddingHorizontal: 20,
        marginBottom: 5,
        color: "#fff",
      },
=======
      backgroundColor: '#F8E9A1',
      height: 1200
    },
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
    greeting: {
        marginTop: 102,
        fontSize: 18,
        fontWeight: "700",
        textAlign: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        color: "#F76C6C"
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
<<<<<<< HEAD
        color: "black",
        fontSize: 14,
        textTransform: "uppercase"
    },
  
    input: {
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "black",
        paddingTop: 10,
    },
    longText: {
        borderBottomColor: "black",
=======
        color: "#24305E",
        fontSize: 14,
        textTransform: "uppercase"
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#F8E9A1",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F76C6C',
        flexDirection: "row",
       
        paddingBottom: 5,
        marginBottom: 15,
        alignSelf: 'center'
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "500",
        alignSelf: 'center',
        color: "#24305E",
        textAlign: 'center'
    },
    back: {
        position: "absolute",
        top: hp("9%"),
        left: wp("-16%"),
        width: wp("15%"),
        height: hp("7.5%"),
        borderRadius: 31,
        alignItems: 'center',
        backgroundColor: "rgba(21,22,48,0.1)",
        justifyContent: 'center'
    },
    input: {
        borderBottomColor: "#24305E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#24305E",
        paddingTop: 10,
    },
    longText: {
        borderBottomColor: "#24305E",
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 80,
        fontSize: 15,
        color: "#161F3D",      
    },
   lastInputTitle: { 
<<<<<<< HEAD
    color: "black",
=======
    color: "#24305E",
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
        fontSize: 13,
        textTransform: "uppercase",
        marginLeft: 6,
        marginBottom: 5

},
    button: {
        marginHorizontal: 30,
<<<<<<< HEAD
        backgroundColor: "#3772ff",
=======
        backgroundColor: "#F76C6C",
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
    },

})