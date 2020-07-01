import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, LayoutAnimation } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Fire from '../Fire'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment'
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
    renderTopics = topic => {
        return (
            <View style={{ borderRadius: 5, paddingHorizontal: 15, backgroundColor: '#24305E', width: "100%", paddingVertical: 15, marginBottom: 15 }}>
                <Text style={{ alignSelf: 'center', color: "#F8E9A1", fontSize: 15, fontWeight: "600" }}>{topic}</Text>
            </View>
        )
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
                            <Text style={styles.name}>{project["title"].toUpperCase()}</Text>
                        </View>

                    </View>
                    <Text style={styles.descrip}>{project.descrip}</Text>
                    {/* <Image source = {{Image_Http_URL }} style = {styles.postImage} resizeMode = "cover"/>  */}
                   
                        <FlatList
                         listKey={moment().valueOf().toString()}
                            data={project.topics}
                            renderItem={({ item }) => this.renderTopics(item)}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={true}
                        />
     

                    <TouchableOpacity onPress={() => this.handleJoin(projectID)} style={{ marginTop: 15 }}>
                        <View style={{ flexDirection: "row", backgroundColor: "#F8E9A1", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15 }} >
                            <Text style={{ padding: 5, textAlignVertical: 'center', fontWeight: "400", fontSize: 20, color: "#F76C6C", fontWeight: "600" }}>JOIN GROUP</Text>

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

            <View style={styles.container}>

                <View style={styles.header}>

                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Projects")}>
                        <Ionicons name="ios-arrow-round-back" size={32} color="black"></Ionicons>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>JOIN A GROUP</Text>
                </View>
                {projects && <FlatList
                    style={styles.feed}
                    data={Object.keys(projects)}
                    renderItem={(elem) => this.renderProject(elem.item)}
                    keyExtractor={elem => elem.item}
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
    },

    feed: {
        marginHorizontal: 16,

    },
    feedItem: {
        backgroundColor: "#F76C6C",
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
        color: "#F8E9A1",
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
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#24305E",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F76C6C',
        flexDirection: "row",

        paddingBottom: 5,
        marginBottom: 15,
        alignSelf: 'center'
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "500",
        alignSelf: 'center',
        color: "#F8E9A1",
        textAlign: 'center'
    },
    back: {
        position: "absolute",
        top: hp("8%"),
        left: wp("-20%"),
        width: wp("15%"),
        height: hp("7.5%"),
        borderRadius: 31,
        alignItems: 'center',

        backgroundColor: "rgba(21,22,48,0.1)",
        justifyContent: 'center'
    },


})