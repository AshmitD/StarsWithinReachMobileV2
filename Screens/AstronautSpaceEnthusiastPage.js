import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'
import JoinProject from '../Screens/JoinProject'
import MyProjects from '../Screens/MyProjects'
export default class AstronautSpaceEnthusiastPage extends React.Component{
    constructor() {
        super()
        this.state = {
            projects: {}
        }
         this.fillProjects()
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.headerTitle}>Projects</Text>
                    <TouchableOpacity onPress ={() => this.props.navigation.navigate("CreateProject")} style = {{backgroundColor: "lightgrey", left: 130,width: 36, height: 36, borderRadius: 18, alignItems: 'center', alignContent: 'center'}}>
                    <Ionicons name = "ios-add" style = {{alignSelf: 'center',}} size = {32} color = "black"></Ionicons>
                </TouchableOpacity>  
                
                </View>  

                <JoinProject projects = {this.state.projects} navigation = {this.props.navigation}/>
                <MyProjects projects = {this.state.projects} navigation = {this.props.navigation}/>
            </View>
        )
    }

    fillProjects = () => {
        const projects = {};
        const db = firebase.firestore();
                
        const onReceive = (querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                projects[doc.id] = doc.data();
            });
            this.setState({projects: projects})
            console.log("state has been set with projects of length " + Object.keys(projects).length)
        }
        db.collection("projects").get()
            .then(onReceive.bind(this));
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
})