import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import firebase from 'firebase'
import Fire from '../Fire'
import StudentPage from '../Screens/StudentPage'
import AstronautSpaceEnthusiastPage from '../Screens/AstronautSpaceEnthusiastPage'

export default class Projects extends React.Component{
constructor() {
    super()
        this.state = {
            userWho: ""
        }
        this.userWho()
}
    userWho = () => {
        Fire.shared.getUserData(firebase.auth().currentUser.email).then(({user}) => {
            this.setState({userWho: user["who"]})
        }) 
    }
    render() {
      
        
       
        if (this.state.userWho == "Student") {
            return (<StudentPage navigation={this.props.navigation}/>)
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