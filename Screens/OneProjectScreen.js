import React from 'react'
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import firebase from 'firebase'

export default class OneProjectScreen extends React.Component {
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        const currProjectID = params ? params.otherParam : null;
        this.state = {
            designsData: [],
            projectID: currProjectID
        }
        this.fillProjects()

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
                            <Text style={styles.name}>{moment(design.timestamp).fromNow()}</Text>
                        </View>
                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </View>
                    <Text style={styles.postss}>{design.text}</Text>
                    {/* <Image source = {{Image_Http_URL }} style = {styles.postImage} resizeMode = "cover"/>  */}
                    <Image
                        style={styles.postImage}
                        source={{
                            uri: design.image
                        }}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }} />
                        <Ionicons name="ios-chatboxes" size={24} color="#73788B" style={{ marginRight: 16 }} />
                    </View>

                </View>


            </View>
        )
    }
    render() {



console.log("this is project id", this.state.projectID)
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Projects")}>
                        <Ionicons name="ios-arrow-round-back" size={32} color="black"></Ionicons>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}></Text>
                </View>
                <FlatList
                    style={styles.feed}
                    data={this.state.designsData}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('UploadDesign', {
                                otherParam: this.state.projectID,
                                })}
                    ><Text>Upload Posts</Text></TouchableOpacity>
            </View>
        )


    }
    fillProjects = () => {
        const projects = [];
        const db = firebase.firestore();
      
       
     
        db.collection("projects").doc(this.state.projectID).collection('projectPosts').get().then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                projects.push(doc.data())
            });
            this.setState({ designsData: projects })
        });


    }


}
const styles = StyleSheet.create({
    container: {
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
    back: {
        position: "absolute",
        top: 50,
        left: 22,
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        backgroundColor: "rgba(21,22,48,0.1)",
        justifyContent: 'center'
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
})