import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import firebase from 'firebase'
import Fire from '../Fire'
import Config from '../Config'
import StudentPage from '../Screens/StudentPage'
import AstronautSpaceEnthusiastPage from '../Screens/AstronautSpaceEnthusiastPage'
export default class Post extends React.Component{
    state = {
        userWho: ""
    }
    render() {
        Fire.shared.getUserData(firebase.auth().currentUser.email).then(({id, user}) => {
            this.setState({userWho: user["who"]})
        }) 
       
        if (this.state.userWho === "Student") {
            return (<StudentPage/>)
          }
        
          return (
          <AstronautSpaceEnthusiastPage navigation={this.props.navigation}/>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})