import React from 'react';

import { View, TouchableHighlight, Modal, Text, SafeAreaView, TextInput, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, LayoutAnimation, ShadowPropTypesIOS } from 'react-native'
import firebase from "firebase"
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import Fire from '../Fire'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert } from 'react-native'

export default class HomeScreen extends React.Component {


    constructor() {
        super()
  
        this.state = {
            chats: [],
            modalVisible: false,

        }
        Fire.shared.getUserData(firebase.auth().currentUser.email).then(({ user }) => {
            console.log("hi") 
            const chatIDs = user["messageIDs"]
            console.log("this is chatids", chatIDs)
                this.getEmail(chatIDs)
        })

       

    }

    getEmail = chatIDs => {
        console.log("is it getting here?") 
        var i;
        for (i = 0; i < chatIDs.length; i++) {
         // Problem with i for multichats
            const chatID = chatIDs[i]
               console.log("This is one id", chatID)
            firebase.database().ref('/messages/specificChatss/' + chatID).once('value').then((snapshot) => {
                var everything = (snapshot.val()) || 'Anonymous'

                const email1 = everything["email1"]
                console.log("this is the email", email1, "this is chatttt", chatIDs[i])
                if (email1 != firebase.auth().currentUser.email) {
                    Fire.shared.getUserData(email1).then(({ user }) => {
                        this.setState({ chats: this.state.chats.concat({id: chatID, name: user["name"]}) })
                    })
                } else {
                    Fire.shared.getUserData(everything["email2"]).then(({ user }) => {
                        this.setState({chats: this.state.chats.concat({ id: chatID, name: user.name }) })
                    })
                }
        

            })
        }
    }


    renderChat = chat => {
        console.log("this is the chatt", chat)
        return (
        <View style={styles.feedItem}>
            
             <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatScreen', {
                        "id": chat["id"],"name": chat["name"] ,
            
                    })} style = {{marginTop: 15}}> 
                        <View style = {{flexDirection: "row", backgroundColor: "#F76C6C", paddingBottom: 2, paddingTop: 9, paddingHorizontal: 10, borderRadius: 15}} >                                  
                        <Text>{chat["name"]}</Text>
                        <Ionicons name="ios-arrow-dropright" size={30} color={"#F8E9A1"} style = {{marginLeft: 7, top:-1,}} />
                        </View>   
                    </TouchableOpacity></View>)
    }

    render() {

        LayoutAnimation.easeInEaseOut()

        return (
            <View style={styles.container}>
                
                <View style={styles.header}><View style={{ borderBottomColor: "#F76C6C", alignSelf: 'center', width: 85, paddingBottom: 5, borderBottomWidth: 3 }}><Text style={styles.headerTitle}>Chat</Text></View>
                </View>

                {this.state.chats.length==0 && <View style ={{alignSelf: 'center'}}>
                    <Text style ={{textAlign:'center', color: "#F8E9A1", fontSize: 20, paddingHorizontal: 25,marginTop: hp("25%")}}>Click on anyone's name to start a chat!!</Text>
                </View>}
                {this.state.chats && <FlatList
                    style={styles.feed}
                    data={this.state.chats}
                    renderItem={({ item }) => this.renderChat(item)}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                />}

                {/* <View style = {{width: 15}}>
                <TouchableOpacity style = {{backgroundColor: "lightgrey", position: "fixed", width: 24, height: 44, borderRadius: 16, alignItems: 'center', alignContent: 'center'}}>
                   <Ionicons name = "ios-add" onPress ={() => this.props.navigation.navigate("CreatePost")} style = {{alignSelf: 'center'}} size = {32} color = "black"></Ionicons>
                </TouchableOpacity>  
                </View> */}

            </View>

            /* <TouchableOpacity style ={{marginTop: 32}} onPress = {this.signOutUser}>
                <Text>Logout</Text>
            </TouchableOpacity> */
        )


    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#24305E",
        flex: 1,
        paddingHorizontal: 15,
    },
    header: {
        paddingTop: 55,
        backgroundColor: "#24305E",
        justifyContent: 'center',
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {

        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        bottom: 25,
        left: 80
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "500",
        alignSelf: 'center',
        color: "#F8E9A1",
    },
    feed: {
        marginHorizontal: 16,

    },
    feedItem: {

        borderRadius: 15,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 15,
        textAlign: 'left',
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        width: wp('80%'),
        alignSelf: 'center'
    },
    name: {
        fontSize: 20,
        fontWeight: "500",
        color: "#F76C6C",
        marginBottom: 5
    },
    timestamp: {
        fontSize: 15,
        fontWeight: "500",
        color: "#24305E"
    },

    postss: {
        marginTop: 16,
        fontSize: 14,
        color: "#24305E"
    },
    postImage: {
        height: 400,
        width: undefined,
        borderRadius: 5,

    },
    image: {
        width: undefined,
        height: 300,
        maxWidth: 500,
        marginVertical: 15,

    },
    back: {
        width: 32,
        height: 32,
        borderRadius: 21,
        alignItems: 'center',
        backgroundColor: "rgba(21,22,48,0.1)",
        justifyContent: 'center'
    },


})