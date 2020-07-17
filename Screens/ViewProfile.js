import React from 'react'
import { View, Modal, TouchableHighlight,FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import firebase from 'firebase'
import Fire from '../Fire'
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

    
    render() {

        return (

            <View style={styles.container}>
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
            </View>
        )


    }






}
const styles = StyleSheet.create({
    container: {
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
  
   
})