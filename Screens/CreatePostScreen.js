import React from 'react'
import { View, TouchableWithoutFeedback,Text, StyleSheet, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import Contants from 'expo-constants'
import {Picker} from '@react-native-community/picker';
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
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
            name: "", 
            projectContent: [],
            projectNames: [],
            selectedProjectName: ''
        }
        this.fillProjectNames() 
    }
    fillProjectNames() {
        Fire.shared.getUserData(firebase.auth().currentUser.email).then(({ user }) => {
<<<<<<< HEAD
            this.setState({name: user['name']})
=======
            
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
        const projects = {};
        const db = firebase.firestore();

        const onReceive = (querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                projects[doc.id] = doc.data();
            });
        }
        db.collection("projects").get()
            .then(onReceive.bind(this)).then(() => {
                
                console.log('this is ids', user['projects'], ' these are all projects', projects)
                const temp = []
                for(let i =0; i<user['projects'].length; i++) {
<<<<<<< HEAD
                    if(projects[user['projects'][i]] == undefined) {

                    } else {
                    temp.push({'projectID': user['projects'][i], 'project': projects[user['projects'][i]].title})
                    }
=======
                    temp.push({'projectID': user['projects'][i], 'project': projects[user['projects'][i]].title})
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
                }
                return temp
                }).then((temp) => {
                    const names = []
                    this.setState({projectContent: temp})
                    for  (let i = 0; i<temp.length; i++) {


                        
                        console.log('this is tempp,', temp)
                        console.log("this is temp", temp)
                        names.push({'id': temp[i].projectID,'name': temp[i].project, 'label': temp[i].project, 'value': temp[i].projectID})
                        
                    }
<<<<<<< HEAD
                   
=======
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
                    console.log('this is names',names)
                    this.setState({projectNames:names})
            })

       
        })
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
        console.log('this is selected project', this.state.selectedProjectName)
        if(this.state.localUri === null) {
            this.setState({localUri: ""})
        } 
        if(this.state.selectedProjectName == '') {
            alert("Please select a specific project.")
        } else if(this.state.text.trim().length == 0){
            alert("Please write something before you post.")
        } else {

        
            
        
        console.log('this is everything in handle post', this.state.selectedProjectName)
        Fire.shared.getUserData(firebase.auth().currentUser.email).then(({ user }) => {
            return user;
        }).then((user) => {
            Fire.shared.addPost({ projectID: this.state.selectedProjectName.id, projectName: this.state.selectedProjectName.name,text: this.state.text.trim(), localUri: this.state.image, name: user["name"], email: user["email"]})
                .then(ref => {

                    this.setState({ text: "", image: null })
                })
                .catch(error => {
                    alert(error)
                })
        })
        this.props.navigation.navigate("Home")
    }

    }

    pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
<<<<<<< HEAD
            aspect: [10,20]
=======
            aspect: [4, 3]
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
        })

        if (!result.cancelled) {
            this.setState({ image: result.uri })
        }
    }
    render() {
<<<<<<< HEAD
        let chars = this.state.name.split(" ")[0].substring(0,1)
    if(this.state.name.split(" ").length > 1) {
     chars += this.state.name.split(' ')[1].substring(0, 1)
    } 
        console.log(this.state.projectNames)
        return (
           
            <View style ={{backgroundColor: "white", height: "100%"}}>
=======
       
        console.log(this.state.projectNames)
        return (
           
            <View style ={{backgroundColor: "#F8E9A1", height: "100%"}}>
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
                 <KeyboardAwareScrollView
       
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
          ><View style={styles.header}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate('Home')
                    }>
                        <Ionicons name="ios-arrow-round-back" size={24} color="#24305e"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity>
<<<<<<< HEAD
                        <Text style={{fontSize: 17, fontWeight: "500", color: "white"}} onPress={this.handlePost}>POST</Text>
=======
                        <Text style={{ fontWeight: "500", color: "#24305e"}} onPress={this.handlePost}>Post</Text>
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
<<<<<<< HEAD
                <View style={{ width: 50, marginRight: 15,borderWidth: 2,  justifyContent: 'center', alignItems: 'center', borderRadius: "100%", backgroundColor: "#3772ff", height: 50 }}>
              <Text style={{ color: "white", textAlign: 'center', zIndex: 55 }}>{chars}</Text>
            </View>
=======
                    <Image source={require('../Components/oreo.png')} style={styles.avatar}></Image>
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
                   
                    <TextInput scrollEnabled = {true} dataDetectorTypes = {'link'}  maxHeight = {200} maxLength = {700} multiline={true} numberOfLines={4} style={{ flex: 1, }} placeholder="Want to share something?" onChangeText={text => {this.setState({ text })}} value={this.state.text}></TextInput>


                </View>
                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
<<<<<<< HEAD
                    <Ionicons name="md-camera" size={32} color="#3772ff"></Ionicons>
                </TouchableOpacity>

                {this.state.image &&    <View style={{ marginTop: 32}}>
                   <Image source={{ uri: this.state.image }} style={{  alignSelf: 'center', width: "95%",
    height: 300, }}></Image>
                </View>}

                {!this.state.image && <View style = {{alignSelf: 'center', alignContent: 'center', justifyContent: 'center', marginTop: 50,alignItems: 'center'}}>
                    <Text style ={{marginHorizontal: 50, marginBottom: 10}}>Selete project to post in:</Text>
                 {this.state.projectNames.length !== 0 &&   <DropDownPicker style={{
                            backgroundColor: '#3772ff',padding: 25, width: '100%',
                            }}
                            items={this.state.projectNames}
                                containerStyle={{height: 40, width: '55%'}}
                                onChangeItem={selectedProjectName => this.setState({ selectedProjectName })}
                            />}
                            </View>}
                            {this.state.image && <View style = {{alignSelf: 'center', marginVertical: 25,justifyContent: 'center', alignItems: 'center'}}>
                    <Text style ={{marginHorizontal: 50, marginBottom: 10}}>Selete project to post in:</Text>
                 {this.state.projectNames.length !== 0 &&   <DropDownPicker style={{
                            backgroundColor: '#3772ff',padding: 25, width: '100%',
                            }}
                            items={this.state.projectNames}
                                containerStyle={{height: 40, width: '55%'}}
                                onChangeItem={selectedProjectName => this.setState({ selectedProjectName })}
                            />}
                            </View>}
                            
=======
                    <Ionicons name="md-camera" size={32} color="#24305e"></Ionicons>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>}
                </View>

                    <Text>Which one of your projects would you like to post this in?</Text>
                    <DropDownPicker style={{
                                borderBottomColor: "#8a8F9E",
                                borderBottomWidth: StyleSheet.hairlineWidth, zIndex: 2031, position: 'absolute', borderColor: '#FFF'
                            }}
                  
                            items={this.state.projectNames}
                                containerStyle={{ height: 40 }}
                                onChangeItem={selectedProjectName => this.setState({ selectedProjectName })}
                            />
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
                                    </KeyboardAwareScrollView>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    back: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingVertical: 12,
<<<<<<< HEAD
        backgroundColor: "#3772ff",
=======
        backgroundColor: "#F76c6c",
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
        paddingTop: 35,
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
<<<<<<< HEAD
        backgroundColor: '#3772ff',
=======
        borderColor: "#24305e",
>>>>>>> 262bd03bbf28744a8f1e0f042fa0f72db6b7942b
        borderWidth: 2, 
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32,
    }
})