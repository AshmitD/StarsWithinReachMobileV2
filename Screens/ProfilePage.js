import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase'
export default class ProfilePage extends React.Component{
        state = {
        email: "",
         displayName: ""
    } 
    componentDidMount() {
        const {email, displayName} = firebase.auth().currentUser;
        this.setState({email, displayName})
    }

    renderPost = post => {
        return (
            <View>
                <Text>I'm a post</Text>
            </View>
        )
    }

    signOutUser = () =>{
        firebase.auth().signOut()  
    }
    render() {
        return (
            <View style = {styles.container}>
                <Text>Profile Screen</Text>

                 <TouchableOpacity style ={{marginTop: 32}} onPress = {this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})