import React from 'react';
import {View, Text, SafeAreaView, TextInput, ScrollView, StyleSheet, FlatList, Image,  TouchableOpacity, LayoutAnimation, ShadowPropTypesIOS} from 'react-native'
import * as firebase from "firebase"
import {Ionicons} from '@expo/vector-icons'
import moment from 'moment'
import db from "firebase"
import Fire from '../Fire'
export default class MyProjects extends React.Component {
   
     
   constructor() {
       super()
        this.fillMyProjects()
       this.state = {
        projects: [],
        }
   }

   
   fillMyProjects = () => {
  
    Fire.shared.getUserData(firebase.auth().currentUser.email).then(({id, user}) => {
        const temp = user["projects"]
        this.setState({projects: temp})
       
    }) 


 
 
    
}

    renderProject = projectId => {
        
        var docRef = Fire.shared.firestore.collection("projects").doc(projectId);
        var tempDoc = null
        docRef.get().then(function(doc) {
           tempDoc = doc
           console.log("this is the temp", tempDoc)
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
     
       
       // const ref = firebase.storage().ref(post.image);
       //const url =  ref.getDownloadURL();
       return (
        
        <View style = {styles.feedItem}>
            {/* <Image source={post.avatar} style = {styles.avatar}></Image> */}
            <View style = {{flex: 1}}>
                <View style = {{flexDirection: 'row', justifyContent: "space-between",alignItems: 'center'}}>
                    <View>
                        
                        <Text style = {styles.name}>{tempDoc["descrip"]}</Text>

                    </View>
                   
                </View>
                <Text style = {styles.descrip}>{tempDoc.descrip}</Text>
                 {/* <Image source = {{Image_Http_URL }} style = {styles.postImage} resizeMode = "cover"/>  */}
             
           
            </View>
           
           
        </View>
    )
    }
    render() {
        LayoutAnimation.easeInEaseOut()
       
        return (
           
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.headerTitle}>My Projects</Text>
                    
                </View>
          
                <FlatList
                    style={styles.feed} 
                    data={this.state.projects} 
                    renderItem={({ item }) => this.renderProject(item)} 
                    keyExtractor = {item => item.id}    
                    showsVerticalScrollIndicator = {false}  
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
       backgroundColor: "#EFECF4",
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
         marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4,
    },
    descrip: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
         borderRadius: 5,
         marginVertical: 16
    },
    image: {
        width: 500,
        height: 500
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