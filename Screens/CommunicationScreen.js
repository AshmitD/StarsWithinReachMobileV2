import React from 'react'
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import firebase from 'firebase'
import { ScrollView } from 'react-native-gesture-handler'
import Fire from '../Fire'
import DropDownPicker from 'react-native-dropdown-picker';
export default class OneProjectScreen extends React.Component {
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        const currProjectID = params ? params.otherParam : null;
        const orderedDocs = []
        this.state = {
            projectID: currProjectID,
            type: "Google Classroom",
            link: "",
            arrLinks: []
        }
        firebase.firestore().collection("projects").doc(currProjectID).collection("CommunicationLinks")
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    orderedDocs.push(doc.data())
                });
            })
            .then(() => {
                this.setState({ arrLinks: orderedDocs })
                console.log("orederd", this.state.posts)
            })



    }
    handleAdd = () => {
        Fire.shared.addComm({ projectID: this.state.projectID, type: this.state.type, link: this.state.link })
            .then(userCredentials => {
                this.setState({ type: "Google Classroom", link: "" })
            })
            .catch(error => console.log("The error is", error)
            )
    }
    renderPost = link => {
        // const ref = firebase.storage().ref(post.image);
        //const url =  ref.getDownloadURL();
        return (

            <View style={styles.feedItem}>
                {/* <Image source={post.avatar} style={styles.avatar}></Image> */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View>

                            <Text style={styles.name}>{link.type}</Text>
                        </View>
                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </View>
                    <Text style={styles.postss}>{link.link}</Text>
                
              

                </View>

            </View>
        )
    }

    render() {

        return (

            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate('OneProject', {
                        otherParam: this.state.projectID,
                    })}>
                        <Ionicons name="ios-arrow-round-back" size={24} color="black"></Ionicons>
                    </TouchableOpacity>

                </View>
                <View style={{ marginTop: 32, marginHorizontal: 15, }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.inputTitle}>What platform is this link for?</Text>
                        <TouchableOpacity style={{ marginTop: -3 }}>
                            <Text style={{ fontWeight: "500", left: 175, }} onPress={this.handleAdd}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <DropDownPicker style={{
                        borderBottomColor: "#8a8F9E",
                        borderBottomWidth: StyleSheet.hairlineWidth, zIndex: 2031, position: 'absolute', borderColor: '#FFF'
                    }}
                        items={[
                            { label: 'Google Classroom', value: 'Google Classroom' },
                            { label: 'Discord', value: 'Discord' },
                            { label: 'Google Hangouts', value: 'Google Hangouts' },


                        ]}
                        defaultIndex={0}
                        containerStyle={{ height: 40 }}
                        onChangeItem={type => this.setState({ type })}
                    />
                </View>
                <View style={{ marginTop: 32, zIndex: -1, marginHorizontal: 15 }}>
                    <Text style={styles.inputTitle}>Insert the link here:</Text>
                    <TextInput
                        style={styles.longText}

                        multiline={true} numberOfLines={1}
                        onChangeText={link => this.setState({ link })}
                        value={this.state.link}
                    ></TextInput>
                </View>

                <FlatList
                    style={styles.feed}
                    data={this.state.arrLinks}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        )


    }

}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    longText: {
        borderBottomColor: "#8a8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 30,
        fontSize: 15,
        color: "#161F3D",
    },
    feed: {
        marginHorizontal: 16,
        height: 300,
    },
    back: {


        width: 32,
        height: 32,
        borderRadius: 21,
        alignItems: 'center',
        backgroundColor: "rgba(21,22,48,0.1)",
        justifyContent: 'center'
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB",
    },
    inputContainer: {
        margin: 32,

    },
    inputTitle: {
        color: "#8a8F9E",
        fontSize: 10,
        textTransform: "uppercase"
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