import React from 'react';

import { View, TouchableHighlight, Modal, Text, SafeAreaView, TextInput, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, LayoutAnimation, ShadowPropTypesIOS } from 'react-native'
import * as firebase from "firebase"
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import db from "firebase"
import Fire from '../Fire'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert } from 'react-native'

export default class HomeScreen extends React.Component {


    constructor() {
        super()
        const orderedDocs = []
        this.state = {
            posts: [],
            modalVisible: false,
            
        }
        Fire.shared.getUserData(firebase.auth().currentUser.email)
            .then(({user}) => {
                return user["block"];
            })
            .then((blockArr)=> {
                // TODO MOVE THIS LOGIC TO THE FIRE CLASS DONT BE GARBGE
                firebase.firestore().collection("posts").orderBy("timestamp", "desc")
                .get().then(function (querySnapshot) {
                    console.log(querySnapshot)
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log("this is ordered", orderedDocs)
                        orderedDocs.push({ ...doc.data(), id: doc.id})
    
                    });
                })
                .then(() => {
                    console.log("this is ordered", orderedDocs)
                    const filteredPosts = orderedDocs.filter((post)=> {
                        return !blockArr.includes(post["email"]);
                    });
                    const withKey = filteredPosts.map(post => ({
                        ...post,
                        key: post.id
                    }));
                    this.setState({ posts: withKey});
                    console.log("orederd", this.state.posts);
                })
            })
      
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    signOutUser = () => {
        firebase.auth().signOut()
    }
    blockUser = (email) => {
        Fire.shared.addBlock(email)
            .then(userCredentials => {
               alert(`User blocked`)
            })
            .catch(error => console.log("The error is", error)
            )
    }
   
    
    renderPost = post => {
        const { modalVisible } = this.state;
        // const ref = firebase.storage().ref(post.image);
        //const url =  ref.getDownloadURL();
        {return (

            <View style={styles.feedItem}>
                {/* <Image source={post.avatar} style={styles.avatar}></Image> */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            
             <TouchableOpacity onPress={() => this.props.navigation.navigate('Report', {
                            otherParam: post,
                        })}>
                    <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 5, fontWeight: "700", color: "#F76C6C", overflow: "hidden", borderRadius: 10, backgroundColor: "#F8E9A1", paddingVertical: 15, textAlignVertical: 'center', width: 250, }}>REPORT THIS POST</Text>
                </TouchableOpacity>
                <TouchableOpacity style ={{marginTop: 15}}onPress={() => this.props.navigation.navigate('ReportUser', {
                            otherParam: post,
                        })}>
                    <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 5, fontWeight: "700", color: "#F76C6C", overflow: "hidden", borderRadius: 10, backgroundColor: "#F8E9A1", paddingVertical: 15, textAlignVertical: 'center', width: 250, }}>REPORT THIS USER</Text>
                </TouchableOpacity>
                <TouchableOpacity style ={{marginTop: 15}} onPress={() => this.blockUser(post["email"])}>
                    <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 5, fontWeight: "700", color: "#F76C6C", overflow: "hidden", borderRadius: 10, backgroundColor: "#F8E9A1", paddingVertical: 15, textAlignVertical: 'center', width: 250, }}>BLOCK THIS USER</Text>
                </TouchableOpacity>

              <TouchableHighlight
               style ={{marginTop: 15, borderBottomColor: "#24305E", borderBottomWidth: 3}}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={{color: "#24305E"}}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Ionicons name = "ios-more" color = "#0a0f21"size ={36}></Ionicons>
        </TouchableHighlight>
      </View>
                        {/* <TouchableOpacity style={{ backgroundColor: "rgba(36, 48, 94, 0.9)", borderRadius: 15, o: 80 }} onPress={() => this.props.navigation.navigate('Report', {
                            otherParam: post,
                        })}><Ionicons name="ios-flag" size={24} style={{ alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 7.5 }} color="grey" /></TouchableOpacity> */}
 
 

                    </View>

                    <Text style={styles.postss}>{post.text}</Text>

                    {/* <Image source = {require('../Components/Oreo.jpg'} style = {styles.postImage} resizeMode = "cover"/>  */}
                    {post.image != " " &&

                        <Image
                            style={styles.image}
                            source={{
                                uri: post.image
                            }}
                        />

                    }

                    {post.image == " " && <View style={{ height: 15 }}></View>}
                    <View style={{ flexDirection: "row" }}>

                        <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }} />
                        <Ionicons name="ios-chatboxes" size={24} color="#73788B" style={{ marginRight: 16 }} />
                    </View>

                </View>


            </View>
        )}
    }
    render() {
        console.log("home page")
        LayoutAnimation.easeInEaseOut()

        return (
            <View style={styles.container}>
             
               
                <View style={styles.header}>
                 
                    <View style ={{borderBottomColor: "#F76C6C", alignSelf: 'center',width: 85,paddingBottom: 5,borderBottomWidth: 3}}><Text style={styles.headerTitle}>Feed</Text></View>
                    <TouchableOpacity style={{ backgroundColor: "#24305E", borderRadius: 15, marginTop: -65,padding: 25, marginLeft: wp("65%"),}} onPress={this.signOutUser}>
                        <Ionicons name="ios-log-out" size={36} color="#73788B" />
                    </TouchableOpacity>
                </View>
             

                <TouchableOpacity onPress={() => this.props.navigation.navigate("CreatePost")} style={{ alignSelf: 'center', marginVertical: 15 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 5, fontWeight: "700", color: "#23405E", overflow: "hidden", borderRadius: 10, color: "#F8E9A1", backgroundColor: "#F76C6C", paddingVertical: 15, textAlignVertical: 'center', width: 250, }}>CREATE A POST</Text>
                </TouchableOpacity>
                <FlatList
                    style={styles.feed}
                    data={this.state.posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
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
        backgroundColor: "#F8E9A1",
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