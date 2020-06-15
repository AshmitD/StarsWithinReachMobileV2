import React from 'react'
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import firebase from 'firebase'
import { ScrollView } from 'react-native-gesture-handler'

export default class OneProjectScreen extends React.Component {
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        const currProjectID = params ? params.otherParam : null;
        const orderedDocs = []
       
        this.state = {
            orderedDocs: [],
            projectID: currProjectID,
            projectContent: {}
        }

        firebase.firestore().collection('projects').doc(currProjectID).get().then((doc) => {
           this.setState({projectContent: doc.data()})
        
        })
        firebase.firestore().collection("projects")
        .doc(currProjectID).collection("projectPosts").orderBy("timestamp", "desc")
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                    orderedDocs.push(doc.data())
                 
            });
        })
        .then(() => {
             this.setState({orderedDocs : orderedDocs })     
             console.log("orederd", this.state.orderedDocs)})

        // .then(() => {
        //     this.fillProjects()
        //  })
      
       
    
    }
    renderPost = design => {
        // const ref = firebase.storage().ref(post.image);
        //const url =  ref.getDownloadURL();
        return (

            <View style={styles.feedItem}>
                {/* <Image source={post.avatar} style={styles.avatar}></Image> */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View>
                            <Text style={styles.name}>{design.name}</Text>
                            <Text style={styles.timestamp}>{moment(design.timestamp).fromNow()}</Text>
                        </View>
                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </View>
                    <Text style={styles.postss}>{design.text}</Text>
                    {/* <Image source = {{Image_Http_URL }} style = {styles.postImage} resizeMode = "cover"/>  */}
                   { design.imageLink != " " && <Image
                        style={styles.postImage}
                        source={{
                            uri: design.imageLink
                        }}
                    />}
                    { design.imageLink == " " && <View style = {{height: 15}}></View>

                    }
                    <View style={{ flexDirection: "row" }}>
                        <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }} />
                        <Ionicons name="ios-chatboxes" size={24} color="#73788B" style={{ marginRight: 16 }} />
                    </View>

                </View>


            </View>
        )
    }
    render() {
        
        return (

            <View style={styles.container}>
                <View style={styles.header}>

                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Projects")}>
                        <Ionicons name="ios-arrow-round-back" size={32} color="black"></Ionicons>
                    </TouchableOpacity>
                <Text style={styles.headerTitle}>{this.state.projectContent.title}</Text>
               
                </View>
                <View style = {{backgroundColor: "#F76C6C"}}>
                <View style = {{flexDirection: "row", borderBottomWidth: 4,borderBottomColor: "#F76C6C"}}>
                    <Text style = {styles.communicate}>Chat now</Text>
                    <TouchableOpacity style = {{alignSelf: 'center', left: 225,width: 36, height: 36, borderRadius: 18}}>
                    <Ionicons name = "ios-arrow-dropright" onPress={() => this.props.navigation.navigate('Communicate', {
                                otherParam: this.state.projectID,
                                })} style = {{alignSelf: 'center',}} size = {32} color = "black"></Ionicons>
                  </TouchableOpacity> 
                </View>
                </View>
                <View style = {{flexDirection: 'row',padding: 5, alignSelf: 'center'}}>
                     <Text style = {styles.headerTitle2}>Group Designs</Text>

                    <TouchableOpacity style = {{backgroundColor: "lightgrey", left: 100,width: 36, height: 36, borderRadius: 18}}>
                    <Ionicons name = "ios-add" onPress={() => this.props.navigation.navigate('UploadDesign', {
                                otherParam: this.state.projectID,
                                })} style = {{alignSelf: 'center',}} size = {32} color = "black"></Ionicons>
                  </TouchableOpacity> 
                </View> 
                              
                    <FlatList
                    style={styles.feed}
                    data={this.state.orderedDocs}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                   />
              

           
            </View>
        )


    }
    
       
       



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#24305E",
        
    },
    communicate: {
        fontWeight: "600",
        height: 50,
        fontSize: 30,
        textAlignVertical: "center",
        padding: 5,
        color: "#23405E"
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
        width: "25%",
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
    headerTitle2: {
        fontSize: 20,
        fontWeight: "500"
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
  
   
    feed: {
        marginHorizontal: 16,
        paddingHorizontal: 15
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
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    },
    image: {
        width: 500,
        height: 500
    },
})