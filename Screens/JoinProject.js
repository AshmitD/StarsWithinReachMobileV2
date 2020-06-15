import React from 'react';
import {View, Text, SafeAreaView, TextInput, ScrollView, StyleSheet, FlatList, Image,  TouchableOpacity, LayoutAnimation, ShadowPropTypesIOS} from 'react-native'
import * as firebase from "firebase"
import {Ionicons} from '@expo/vector-icons'
import moment from 'moment'
import db from "firebase"
import Fire from '../Fire'
export default class JoinProject extends React.Component {

    // fillProjects = () => {
    //     const projects = {};
    //     const db = firebase.firestore();

    //     const onReceive = (querySnapshot) => {
    //         querySnapshot.forEach(function(doc) {
    //             // doc.data() is never undefined for query doc snapshots
    //             projects[doc.id] = doc.data();
    //         });
    //         this.setState({projects: projects})
    //     }
    //     db.collection("projects").get()
    //         .then(onReceive.bind(this));
  
    // }
    handleJoin = projectID => {
      Fire.shared.joinProject(projectID)
    
    }
    renderProject = projectID => {
        const { params } = this.props.navigation.state;
        const projects = params ? params.otherParam : null;
 
        const project = projects[projectID]

       // const ref = firebase.storage().ref(post.image);
        //const url =  ref.getDownloadURL();
         return (
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

                 <TouchableOpacity onPress={() => this.handleJoin(projectID)} style = {{marginTop: 15}}> 
                    <View style = {{flexDirection: "row", backgroundColor: "#F8E9A1", paddingBottom: 2, paddingTop: 9, paddingHorizontal: 10, borderRadius: 15}} >                                  
                    <Text style = {{fontWeight: "400", fontSize: 20, color: "#F76C6C", fontWeight: "600"}}>Join project</Text>
                    <Ionicons name="ios-arrow-dropright" size={30} color={"#F76C6C"} style = {{marginLeft: 7, top:-1,}} />
                    </View>   
                </TouchableOpacity>
      
            </View>


        </View>
        )
    }
    render() {
        LayoutAnimation.easeInEaseOut()
        const { params } = this.props.navigation.state;
        const projects = params ? params.otherParam : null;
        console.log("projects are ", projects)
        return (
         
            <View style = {styles.container}>
    
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>JOIN A PROJECT</Text>
                    <TouchableOpacity style ={styles.back} onPress = {() => this.props.navigation.navigate("Projects")}>
                 <Ionicons name = "ios-arrow-round-back" size ={32} color = "black"></Ionicons>
                 </TouchableOpacity>
                </View>
               { projects && <FlatList
                    style={styles.feed} 
                    data={Object.keys(projects)} 
                    renderItem={( elem ) => this.renderProject(elem.item)} 
                    keyExtractor = {elem => elem.item}    
                    showsVerticalScrollIndicator = {false}  
               /> }
 
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
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#24305E",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F76C6C',
        flexDirection: "row",
        width: "75%",
        paddingBottom: 5,
        marginBottom: 15,
        alignSelf: 'center'
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "500",
        alignSelf: 'center',
        color: "#F8E9A1",
       
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
        backgroundColor: "#F76C6C",
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
        color: "#F8E9A1"
        
    },
    descrip: {
        marginTop: 6,
        fontSize: 16,
        color: "#23405E",
        textAlign: 'center'
    },
    back: {
        position: "absolute",
        top: 60,
        left: -35,
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        backgroundColor: "rgba(21,22,48,0.1)",
        justifyContent: 'center'
    },
    
})