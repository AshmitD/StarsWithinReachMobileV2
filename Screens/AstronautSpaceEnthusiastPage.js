import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import {Ionicons} from '@expo/vector-icons'
import JoinProject from '../Screens/JoinProject'
export default class AstronautSpaceEnthusiastPage extends React.Component{

    render() {
 
        return (
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.headerTitle}>Projects</Text>
                    <TouchableOpacity onPress ={() => this.props.navigation.navigate("CreateProject")} style = {{backgroundColor: "lightgrey", left: 130,width: 36, height: 36, borderRadius: 18, alignItems: 'center', alignContent: 'center'}}>
                    <Ionicons name = "ios-add" style = {{alignSelf: 'center',}} size = {32} color = "black"></Ionicons>
                </TouchableOpacity>  
                
                </View>  
                <JoinProject/>
            </View>
        )
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