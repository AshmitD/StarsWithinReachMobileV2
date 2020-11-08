import React from 'react'
<<<<<<< HEAD
import { View, Modal, TextInput, TouchableHighlight, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
=======
import { View, Modal, TouchableHighlight,FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import firebase from 'firebase'
import Fire from '../Fire'
<<<<<<< HEAD
import DropDownPicker from 'react-native-dropdown-picker';
=======
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class ViewProfile extends React.Component {
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        const thisUser = params ? params.otherParam : null;
        this.state = {
            user: thisUser
        }
<<<<<<< HEAD

    }
    handleChat = () => {
        // this.state.user.email
        // firebase.auth().current.user.email
        console.log("This is email in handle", this.state.user.email, firebase.auth().currentUser.email)
        Fire.shared.addChat({ "email1": this.state.user.email, "email2": firebase.auth().currentUser.email }).then((thisID) => {
            console.log("this is id in handle chat", thisID)
            this.props.navigation.navigate('ChatScreen', {
                "id": thisID, "name": this.state.user.name
            })
        })


    }


=======
    
     }
     handleChat = () => {
            // this.state.user.email
            // firebase.auth().current.user.email
            console.log("This is email in handle", this.state.user.email, firebase.auth().currentUser.email)
         Fire.shared.addChat({"email1": this.state.user.email, "email2": firebase.auth().currentUser.email}).then((thisID) => {
            console.log("this is id in handle chat", thisID)
            this.props.navigation.navigate('ChatScreen', {
                "id": thisID, "name": this.state.user.name 
         })
         })
          
        
     }

    
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
    render() {

        return (

            <View style={styles.container}>
<<<<<<< HEAD
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate('Home')
                    }>
                        <Ionicons name="ios-arrow-round-back" size={24} color="#24305e"></Ionicons>
                    </TouchableOpacity>
                    <View style={styles.avatar}>
                        <Text style={{ fontSize: 35, color: "#3772ff", textAlign: 'center', alignItems: 'center' }}>AS</Text>
                    </View>
                    <Text style={styles.name} >{this.state.user.name}</Text>
                    <Text style={styles.description}>{this.state.user.shortBio}</Text>
                    <View style={{ marginTop: 25, width: "85%", alignSelf: 'center' }}>
                    </View>

                </View>
                <TouchableOpacity style={{ backgroundColor: '#fff', width: '80%', alignSelf: 'center', paddingVertical: 15, borderRadius: 15 }}>
                    <Text style={{ color: '#3772ff', textAlign: 'center', fontWeight: '500', fontSize: 21 }}>I am a {this.state.user.who.toUpperCase()}</Text>
                </TouchableOpacity>

                <View style={styles.content}>
                    <TouchableOpacity onPress={() => this.saveFromPfp()} style={{ backgroundColor: '#3772ff', width: '80%', alignSelf: 'center', marginTop: '5%', paddingVertical: 15, borderRadius: 15 }}>

                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500', fontSize: 21 }}>CHAT WITH ME</Text>
                    </TouchableOpacity>
                </View>


=======
                  <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Home")}>
                        <Ionicons name="ios-arrow-round-back" size={32} color="black"></Ionicons>
                    </TouchableOpacity>
                <View style ={{marginHorizontal: 35, backgroundColor: "#F8E9A1", top: "20%", borderRadius: 25}}>
                <Text style ={{fontSize: 35, color: "#F76C6C",marginVertical: 15,textAlignVertical: 'center', alignSelf: 'center'}}>{this.state.user.name.toUpperCase()}</Text>
                <Text style ={{color: "#24305E",textAlignVertical: 'center', alignSelf: 'center'}}>{this.state.user.shortBio}</Text>
                <Text style ={{textAlignVertical: 'center', alignSelf: 'center'}}>{this.state.user.topics}</Text>
                <Text style ={{textAlignVertical: 'center', alignSelf: 'center'}}>I am a {this.state.user.who.toUpperCase()}</Text>
                <TouchableOpacity onPress = {this.handleChat}><Text style ={{marginVertical: 15,alignSelf: 'center'}}>Chat with me</Text></TouchableOpacity>
                </View>
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
            </View>
        )


    }






}
const styles = StyleSheet.create({
    container: {
<<<<<<< HEAD
        backgroundColor: "#3772ff",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    back: {
        width: 35,
        height: 35,
        alignItems: 'center',
        top: '10%',
        right: '20%'
    },
    content: {
        flex: 6,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        width: "100%",
        backgroundColor: "#fff",
        position: "relative",
        zIndex: -1,
        paddingTop: 15,
        marginTop: '15%'
    },
    header: {
        height: 380,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        alignSelf: 'center',

        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        marginTop: 25,
        fontSize: 28,
        color: "white",
        fontWeight: "600",
        alignSelf: 'center'
    },
    info: {
        fontSize: 16,
        color: "black",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "black",
        marginTop: 10,
        textAlign: 'center',
        zIndex: 5000
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
=======
        flex: 1,
        backgroundColor: "#24305E",
       
        textAlignVertical: 'center'
    },
    back: {
        position: "absolute",
        top: hp("6%"),
        left: "5%",
        width: wp("15%"),
        height: hp("7.5%"),
        borderRadius: 31,
        alignItems: 'center',
        backgroundColor: "rgba(21,22,48,0.1)",
        justifyContent: 'center'
    },
  
   
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
})