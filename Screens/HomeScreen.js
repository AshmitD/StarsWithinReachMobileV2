import React from 'react';
import {View, Text, SafeAreaView, TextInput, ScrollView, StyleSheet, FlatList, Image,  TouchableOpacity, LayoutAnimation, ShadowPropTypesIOS} from 'react-native'
import * as firebase from "firebase"
import {Ionicons} from '@expo/vector-icons'
import moment from 'moment'
import db from "firebase"

export default class HomeScreen extends React.Component {
   
     
   constructor() {
       super()
        this.fillPost()
       this.state = {
        posts: [],
        }
   }



 
    fillPost = () => {
      
        const posts = [];
        const db = firebase.firestore();
   //    console.log(firebase.database().ref('posts').orderByValue());
        
        const onReceive = (querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                posts.push(doc.data());
            });
            this.setState({posts: posts})
        }
        db.collection("posts").get()
            .then(onReceive.bind(this));
        
    }
    renderPost = post => {
        
       // const ref = firebase.storage().ref(post.image);
        //const url =  ref.getDownloadURL();
        return (
            
            <View style = {styles.feedItem}>
                <Image source={post.avatar} style = {styles.avatar}></Image>
                <View style = {{flex: 1}}>
                    <View style = {{flexDirection: 'row', justifyContent: "space-between",alignItems: 'center'}}>
                        <View>
                            
                            <Text style = {styles.name}>Billy Bob Joe</Text>
                            <Text style = {styles.name}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                        <Ionicons name = "ios-more" size = {24} color= "#73788B"/>
                    </View>
                    <Text style = {styles.postss}>{post.text}</Text>
                     {/* <Image source = {{Image_Http_URL }} style = {styles.postImage} resizeMode = "cover"/>  */}
                     <Image
                    style={styles.postImage}
                    source={{
                        uri: post.image
                    }}
                    />
                    <View style = {{flexDirection: "row"}}>
                        <Ionicons name = "ios-heart-empty" size = {24} color= "#73788B" style = {{marginRight: 16}}/>
                        <Ionicons name = "ios-chatboxes" size = {24} color= "#73788B" style = {{marginRight: 16}}/>
                    </View>
                    
                </View>
            
               
            </View>
        )
    }
    render() {
        console.log("home page")
        LayoutAnimation.easeInEaseOut()
        
        return (
           
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.headerTitle}>Feed</Text>
                    <TouchableOpacity style = {{backgroundColor: "lightgrey", left: 150,width: 36, height: 36, borderRadius: 18, alignItems: 'center', alignContent: 'center'}}>
                    <Ionicons name = "ios-add" onPress ={() => this.props.navigation.navigate("CreatePost")} style = {{alignSelf: 'center',}} size = {32} color = "black"></Ionicons>
                </TouchableOpacity>  
                </View>
          
                <FlatList
                    style={styles.feed} 
                    data={this.state.posts} 
                    renderItem={({ item }) => this.renderPost(item)} 
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
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        flexDirection: "row" 
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
    postss: {
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