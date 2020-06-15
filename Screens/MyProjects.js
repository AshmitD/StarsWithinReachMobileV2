import React from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, LayoutAnimation, ShadowPropTypesIOS } from 'react-native'
import * as firebase from "firebase"
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import db from "firebase"
import Fire from '../Fire'
export default class MyProjects extends React.Component {


    constructor() {
        super()

        this.state = {
            projectIDs: [],

        }
        this.fillMyProjects()
    }


    fillMyProjects = () => {
        Fire.shared.getUserData(firebase.auth().currentUser.email).then(({ user }) => {
            this.setState({ projectIDs: user["projects"] })
        })
    }

    renderProject = projectID => {

        const project = this.props.projects[projectID]
        // console.log("this is projects", project)
        // const ref = firebase.storage().ref(post.image);
        //const url =  ref.getDownloadURL();
        return project && (

            <View style={styles.feedItem}>
                {/* <Image source={post.avatar} style = {styles.avatar}></Image> */}
                <View style={{ flex: 1, alignItems: 'center', }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style = {styles.name}>{project["title"].toUpperCase()}</Text>
                        </View>

                    </View>
                    <Text style={styles.descrip}>{project.descrip}</Text>
                     {/* <Image source = {{Image_Http_URL }} style = {styles.postImage} resizeMode = "cover"/>  */}

                     <TouchableOpacity onPress={() => this.props.navigation.navigate('OneProject', {
                        otherParam: projectID,
                    })} style = {{marginTop: 15}}> 
                        <View style = {{flexDirection: "row", backgroundColor: "#F76C6C", paddingBottom: 2, paddingTop: 9, paddingHorizontal: 10, borderRadius: 15}} >                                  
                        <Text style = {{fontWeight: "400", fontSize: 20, color: "#F8E9A1", fontWeight: "600"}}>Dive In</Text>
                        <Ionicons name="ios-arrow-dropright" size={30} color={"#F8E9A1"} style = {{marginLeft: 7, top:-1,}} />
                        </View>   
                    </TouchableOpacity>
          
                </View>


            </View>

        )
    }
    render() {
        LayoutAnimation.easeInEaseOut()
        return (

            <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true} indicatorStyle = "white">
                {<FlatList
                    style={styles.feed}
                    data={this.state.projectIDs}
                    renderItem={({ item }) => this.renderProject(item)}
                    keyExtractor={item => item}
                    
                />}
                {/* <View style = {{width: 15}}>
                <TouchableOpacity style = {{backgroundColor: "lightgrey", position: "fixed", width: 24, height: 44, borderRadius: 16, alignItems: 'center', alignContent: 'center'}}>
                   <Ionicons name = "ios-add" onPress ={() => this.props.navigation.navigate("CreatePost")} style = {{alignSelf: 'center'}} size = {32} color = "black"></Ionicons>
                </TouchableOpacity>  
                </View> */}
    </ScrollView>
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

    },
    header: {
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        flexDirection: "row",

    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
        alignSelf: 'center'
    },
    feed: {
        marginHorizontal: 25,
        marginTop: 15
    },
    feedItem: {
        marginTop: 25,
        borderRadius: 5,
        padding: 15,
        flexDirection: 'row',
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        backgroundColor: "#F8E9A1",
        borderRadius: 15
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 30,
        fontWeight: "900",
        alignSelf: 'center',
        color: "#F76C6C"
        
    },
    descrip: {
        marginTop: 6,
        fontSize: 16,
        color: "#23405E",
        textAlign: 'center'
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