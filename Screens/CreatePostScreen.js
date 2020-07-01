import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import Contants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'
import Oreo from '../Components/oreo.png'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase'
// const firebase = require('firebase');
require("firebase/firestore");

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
      
        this.state = {
            text: "",
            image: null,
            name: ""
        } 
    }
    componentDidMount() {
        this.getPhotoPermissions()
    }
    getPhotoPermissions = async () => {
        if (Contants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status != "granted") {
                // alert("We need permissions to access your camera roll")
            }
        }
    }


    handlePost = () => {
        
        if(this.state.localUri === null) {
            this.setState({localUri: ""})
        } 
        
        Fire.shared.getUserData(firebase.auth().currentUser.email).then(({ user }) => {
        
           const currName = user["name"]
            console.log("This is the name", this.state.name)
            return currName;

        }).then((currName) => {
            Fire.shared.addPost({ text: this.state.text.trim(), localUri: this.state.image, name: currName})
                .then(ref => {
                    console.log("handle post")
                    this.setState({ text: "", image: null })
                })
                .catch(error => {
                    alert(error)
                })
        })
        this.props.navigation.navigate("Home")

    }

    pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if (!result.cancelled) {
            this.setState({ image: result.uri })
        }
    }
    render() {
        return (
            <View style ={{backgroundColor: "#F8E9A1", height: "100%"}}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate('Home')
                    }>
                        <Ionicons name="ios-arrow-round-back" size={24} color="black"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: "500", marginTop: 5, }} onPress={this.handlePost}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require('../Components/oreo.png')} style={styles.avatar}></Image>
                    <TextInput autoFocus={true} multiline={true} numberOfLines={4} style={{ flex: 1, }} placeholder="Want to share something?" onChangeText={text => this.setState({ text })} value={this.state.text}></TextInput>


                </View>
                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name="md-camera" size={32} color="#F76C6C"></Ionicons>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>}
                </View>


                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
        
        marginTop: 35
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row'
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32,
    }
})