import React from 'react';

import { View, TouchableHighlight, Modal, Text, SafeAreaView, TextInput, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, LayoutAnimation, ShadowPropTypesIOS } from 'react-native'
import firebase from "firebase"
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import Fire from '../Fire'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert } from 'react-native'
//TODO Add sorting for the messages, enable push notifications
export default class HomeScreen extends React.Component {


  constructor() {
    super()

    this.state = {
      chats: [],
      modalVisible: false,

    }
    Fire.shared.getUserData(firebase.auth().currentUser.email).then(({ user }) => {
      console.log("hi", firebase.auth().currentUser.email)
      const chatIDs = user["messageIDs"]
      console.log("this is chatids", chatIDs)
<<<<<<< HEAD
      this.getEmail(chatIDs).then(() => {
        console.log("Do you get here")
        this.sort()
      })
      console.log("Do you get here")
     
=======
      return this.getEmail(chatIDs).then(() => {
        
        console.log('got the emails')
        this.sort()
      })
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
    })
  }

  // TODO RENAME THIS METHOD need to change this logic im dumb
  getEmail = chatIDs => {
    const promises = [];
    console.log("is it getting here?")
    for (let i = 0; i < chatIDs.length; i++) {
      // Problem with i for multichats
      const chatID = chatIDs[i]
      console.log("This is one id", chatID)
      const promise = firebase.database().ref('/messages/specificChatss/' + chatID).once('value').then((snapshot) => {
        var everything = (snapshot.val()) || 'Anonymous'
        if(everything['groupChat'] == true) {
          this.setState({ chats: this.state.chats.concat({ id: chatID, newestMessage: everything['newestMessage'], name: everything['name'] }) })
        } else {
        const email1 = everything["email1"]
        console.log("this is the email", email1, "this is chatttt", chatIDs[i])
        if (email1 != firebase.auth().currentUser.email) {
          return Fire.shared.getUserData(email1).then(({ user }) => {
            this.setState({ chats: this.state.chats.concat({ id: chatID, newestMessage: everything['newestMessage'], name: user["name"] }) })
          })
        } else {
          return Fire.shared.getUserData(everything["email2"]).then(({ user }) => {
            this.setState({ chats: this.state.chats.concat({ id: chatID, name: user.name, newestMessage: everything['newestMessage'] }) })
          })
        }
      }

<<<<<<< HEAD
      }).catch(() => {
        console.log("this is the erroror")
=======
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
      })
      promises.push(promise);
    }

    return Promise.all(promises);
  }

  sort = () => {
    const temp = this.state.chats
<<<<<<< HEAD
    console.log('himh', temp)
    temp.sort((a, b) => {
      console.log("This is aa", a, '\n this is bb', b)
      if(a.newestMessage == undefined) {
        return 1
      }
      if(b.newestMessage == undefined) {
        return -1
      }
=======
    console.log('himh')
    temp.sort((a, b) => {
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
      if (a.newestMessage.timestamp > b.newestMessage.timestamp) {
        return -1
      }
      else {
        return 1
      }
    })
    console.log('tempowawy', temp)
    this.setState({ chats: temp })

  }
  renderChat = chat => {
    console.log("this is newest message", chat.newestMessage)

    let chars = chat.name.split(" ")[0].substring(0, 1)
    if (chat.name.split(" ").length > 1) {
      chars += chat.name.split(' ')[1].substring(0, 1)
    }
    return (
      <View style={styles.feedItem}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatScreen', {
          "id": chat["id"], "name": chat["name"],
        })} style={{ marginTop: 0 }}>
          <View style={styles.chatContainer}>
            <View style={styles.chatProfile}>
              <View style={{
                height: 60,
                width: 60,
                backgroundColor: "#3772ff",
                borderRadius: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#080708"
              }}><Text style={{ color: "white", fontSize: 20, }}>{chars}</Text></View>
            </View>
            <View style={styles.chatContent}>
              <Text style={styles.name}>{chat['name']}</Text>
             {chat.newestMessage !== undefined && <Text style={styles.message}>{chat.newestMessage.text}</Text>}
            </View>
            <View style={styles.chatNotifications}>
              <View style={{
                alignItems: "center",
                justifyContent: "center",
                height: 30,
                width: 30,
                backgroundColor: "#3772ff",
                borderRadius: "100%",
              }}>
                <Text style={styles.chatNotificationsText}>2</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {

    LayoutAnimation.easeInEaseOut()
    console.log('these are the chats from mom', this.state.chats)

    LayoutAnimation.easeInEaseOut()
    console.log('these are the chats from mom', this.state.chats)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.linesContainer}>
            <Text style={styles.heading}>Chat</Text>
<<<<<<< HEAD
            <View style={styles.plus}><TouchableOpacity onPress = {() => this.props.navigation.navigate('FindChat')}><Ionicons name="md-add-circle-outline" size={32} color={"#fff"} /></TouchableOpacity></View>
=======
            <View style={styles.plus}><Ionicons name="md-add-circle-outline" size={32} color={"#fff"} /></View>
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
          </View>
        </View>

        <View style={{
          flex: 6,
          backgroundColor: "#eee",
          width: "100%",
          position: "relative",
          top: -30,
          borderTopLeftRadius: "35%",
          borderTopRightRadius: "35%",
        }}>

          {this.state.chats.length == 0 && <View style={{ alignSelf: 'center' }}>
            <Text style={{ textAlign: 'center', color: "#F8E9A1", fontSize: 20, paddingHorizontal: 25, marginTop: "25%" }}>"Click on anyone's name to start                         chat!!"</Text>
          </View>}
          {this.state.chats && <FlatList
            style={styles.feed}
            data={this.state.chats}
            renderItem={({ item }) => this.renderChat(item)}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
          />}

        </View>
      </View>
    )

  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: "#3772ff",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 0.75,
    paddingBottom: 40,
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
    right: 20,
  },
  content: {

  },
  heading: {
    fontSize: 30,
    textTransform: "uppercase",
    letterSpacing: 2,
    paddingHorizontal: 20,
    marginBottom: 5,
    color: "#fff",
  },
  chatContainer: {
    borderBottomWidth: 2,
    borderColor: "#080708",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 100,
    position: "relative",
  },
  chatProfile: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  chatContent: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 18,
    marginVertical: 5,
  },
  message: {
    fontSize: 14,
    marginVertical: 5,
  },
  chatNotifications: {
    position: "absolute",
    right: 20,
  },

  chatNotificationsText: {
    color: "#fff",
  },
})