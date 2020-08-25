import React from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, LayoutAnimation, ShadowPropTypesIOS } from 'react-native'
import * as firebase from "firebase"
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import db from "firebase"
import Fire from '../Fire'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class MyProjects extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            projectIDs: [],
            myProjects: []
        }
        this.fillMyProjects()

    }

    fillMyProjects = () => {
        Fire.shared.getUserData(firebase.auth().currentUser.email).then(({ user }) => {
            this.setState({ projectIDs: user["projects"] })
        }).then(() => {
            const allProjects = []



           const allOfTheProjects = this.state.projectIDs.map((projectID => {
                
                const currProject = this.props.projects[projectID]
                const arrNames = []
                currProject.id = projectID
                console.log("curr project user emails", currProject['userEmails'])
                const userNames = currProject['userEmails'].map((email => {
                   return (
                    Fire.shared.getUserData(email).then((user) => {
                        arrNames.push(user.user["name"])
                        console.log("This is array names",arrNames)
                    })
                   )
                }))
                return (
                Promise.all(userNames).then(() => {
                    console.log("this is arr names", arrNames)
                    currProject.names = arrNames
                    allProjects.push(currProject)
                    console.log("this is all projects", allProjects)
                })
                )
           
            }))
                Promise.all(allOfTheProjects).then(() => {
                    this.setState({ myProjects: allProjects })
                console.log('this.stateing', this.state)})


        })




    }

    //     // const projects = [];
    //     // const db = firebase.firestore();

    //     // const onReceive = (querySnapshot) => {
    //     //     querySnapshot.forEach(function (doc) {
    //     //         // doc.data() is never undefined for query doc snapshots
    //     //         projects[doc.id] = doc.data();
    //     //     });           
    //     // }
    //     // db.collection("projects").get()
    //     //     .then(onReceive.bind(this));

    //     Fire.shared.getUserData(firebase.auth().currentUser.email).then(({ user }) => {

    //         user['projects'].forEach(projectID => {
    //                 console.log("this is projectsss", projects)
    //                 const currProject =  projects[projectID]
    //                 console.log("This is currproject", currProject)
    //                 let arrNames = []
    //                 console.log("currproject", currProject.userEmails)
    //                 const userDataPromises = currProject.userEmails.map(email => {
    //                     console.log('INSIDE MAP CALLBACK')
    //                     return Fire.shared.getUserData(email).then(({user}) => {
    //                         arrNames.push(user["name"])
    //                         console.log("this is arr Names", arrNames)
    //                     })
    //                 })
    //                 Promise.all(userDataPromises).then(() => {
    //                     currProject.names = arrNames
    //                     myProjects.push({'id': projectID, 'project': currProject})
    //                     console.log('this is id', projects)
    //                     // const temp = this.state.projects
    //                     // temp.push(currProject)
    //                     // 
    //                     // console.log("this is projects", this.state.projects)
    //                 })

    //                 console.log("This is arr names before", myProjects)

    //             })
    //                 console.log("this is projects in state", this.state.projects)
    //                 this.setState({projects: myProjects}) 

    //         })


    // }

    renderProject = project => {
       
        
        // console.log("this is projects", project)
        // const ref = firebase.storage().ref(post.image);
        //const url =  ref.getDownloadURL();
        return project && (

            <View>
                {/* <Image source={post.avatar} style = {styles.avatar}></Image> */}
                <View style={{ flex: 1, zIndex: 25, alignItems: 'center', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', }}>
                            {project.topics[0].toLowerCase()== "math" && <View style={{ width: 50, borderWidth: 2, borderColor: "#f76c6c", justifyContent: 'center', alignItems: 'center', borderRadius: "100%", backgroundColor: "#f76c6c", height: 50 }}>
                                <Ionicons name="ios-clipboard" size={30} color="#F8E9A1"></Ionicons>
                            </View>}
                            {project.topics[0].toLowerCase()== "science" && <View style={{ width: 70, borderWidth: 2, borderColor: "#f76c6c", justifyContent: 'center', alignItems: 'center', borderRadius: "100%", backgroundColor: "#f76c6c", height: 70 }}>
                                <Ionicons name="ios-beaker" size={40} color="#F8E9A1"></Ionicons>
                            </View>}
                            {project.topics[0].toLowerCase()== "engineering" && <View style={{ width: 50, borderWidth: 2, borderColor: "#f76c6c", justifyContent: 'center', alignItems: 'center', borderRadius: "100%", backgroundColor: "#f76c6c", height: 50 }}>
                                <Ionicons name="ios-build" size={30} color="#F8E9A1"></Ionicons>
                            </View>}
                            {project.topics[0].toLowerCase()== "technology" && <View style={{ width: 50, borderWidth: 2, borderColor: "#f76c6c", justifyContent: 'center', alignItems: 'center', borderRadius: "100%", backgroundColor: "#f76c6c", height: 50 }}>
                                <Ionicons name="ios-git-merge" size={30} color="#F8E9A1"></Ionicons>
                            </View>}
                            {project.topics[0].toLowerCase()== "space" && <View style={{ width: 50, borderWidth: 2, borderColor: "#f76c6c", justifyContent: 'center', alignItems: 'center', borderRadius: "100%", backgroundColor: "#f76c6c", height: 50 }}>
                                <Ionicons name="ios-rocket" size={30} color="#F8E9A1"></Ionicons>
                            </View>}
                            <View style={{ flexDirection: 'column', marginLeft: 20, alignItems: "flex-start", justifyContent: "center" }}>
                                <Text style={{ fontSize: 25, color: "#F76C6C", fontWeight: '500' }}>{project.title}</Text>
                                <Text style={{ color: '#24305E', fontSize: 15, }}>{project.names.slice(0,3).join(', ')} </Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('OneProject', {
                                otherParam: project.id,
                            })} style={{ marginTop: 15 }}>
                                <View style={{ flexDirection: "row", paddingBottom: 2, paddingTop: 9, paddingHorizontal: 10, borderRadius: 15 }} >

                                    <Ionicons name="ios-arrow-dropright" size={30} color={"black"} style={{top: -1, }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* <Image source = {{Image_Http_URL }} style = {styles.postImage} resizeMode = "cover"/>  */}



                </View>


            </View>

        )
    }
    render() {
        LayoutAnimation.easeInEaseOut()
        return (

            <View style={styles.container}>
                {this.state.projectIDs == 0 && <View style={{ alignSelf: 'center' }}>
                    <Text style={{ textAlign: 'center', color: "#F8E9A1", fontSize: 20, paddingHorizontal: 25, marginTop: hp("25%") }}>You aren't in any groups yet... Join a group!</Text>
                </View>}
                {<FlatList
                    style={styles.feed}
                    data={this.state.myProjects}
                    renderItem={({ item }) => this.renderProject(item)}
                    keyExtractor={item => item}

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
        backgroundColor: "#f8e9a1",
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
        borderRadius: 15,
        width: wp('80%'),
        alignSelf: 'center'
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
        color: "#F76C6C",
        textAlign: 'center',
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