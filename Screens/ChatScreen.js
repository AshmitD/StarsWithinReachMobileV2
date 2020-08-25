import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { Platform, StyleSheet, View, Text, KeyboardAvoidingView, SafeAreaView } from "react-native"
import Fire from '../Fire';
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
disableYellowBox = true;
export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state;
    console.log("This is params", params)
    const userID = params["id"];
    const otherUserName = params["name"]


    this.state = {
      otherName: otherUserName,
      messages: [],
      currUserName: "",
      currID: userID
    }

    Fire.shared.getUserData(firebase.auth().currentUser.email).then(({ user }) => {
      this.state.currUserName = user["name"]
      
    })
  
  }
  get user() {

    return {
      _id: Fire.shared.uid,
      name: this.state.currUserName
    }


  }
  componentDidMount() {
    console.log("This is curr", this.state.currID)
    Fire.shared.get(message => { 
      console.log("message is ", message)
      this.setState(previous => ({
      messages: GiftedChat.append(previous.messages, message)
      }))
    }
    , this.state.currID)
  }
  componentWillUnmount() {
    Fire.shared.off()
  }

  render() {
    console.log("Thisi s messages", this.state.messages)
    console.log("This i suer", this.user)
    const chat = <GiftedChat style={{ zIndex: -1, position: "absolute" }} messages={this.state.messages} onSend={(messages) => Fire.shared.send(messages, this.state.currID, this.user)} user={this.user} />

    return (



      <View style={{flex: 1 }} behavior="padding" keyboardVerticalOffset={10} enabled>
        <View style={styles.header}>
         
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Chat")}>
            <Ionicons name="ios-arrow-round-back" size={32} color="black"></Ionicons>
          </TouchableOpacity>
          <Text style ={{textAlign: 'center',alignSelf: 'center'}}>{this.state.otherName}</Text>
        </View>

        {chat}

      </View>


    );
  }


}

const styles = StyleSheet.create({

  header: {
    textAlign: 'center',
    flexDirection: "row",
    alignSelf: 'center',
    width: "100%",
    alignContent: 'center',
    marginTop: 45,
  },
  headerTitle: {
    
    fontSize: 30,
    fontWeight: "500",
    alignSelf: 'center',
    color: "#F8E9A1",
    textTransform: 'uppercase',


  },
  back: {
    marginHorizontal: 15,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    backgroundColor: "rgba(21,22,48,0.1)",
    justifyContent: 'center'
  
  },



})