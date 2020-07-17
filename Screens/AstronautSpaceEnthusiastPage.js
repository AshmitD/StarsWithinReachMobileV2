import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons'
import JoinProject from '../Screens/JoinProject'
import MyProjects from '../Screens/MyProjects'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class AstronautSpaceEnthusiastPage extends React.Component {
    constructor() {
        super()
        this.state = {
            projects: {}
        }
        this.fillProjects()
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>MY GROUPS</Text>
                </View>

             
                <View style = {{flexDirection: 'row', marginVertical: 15,backgroundColor: '#24305E'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('JoinProject', {
                    otherParam: this.state.projects})} style = {{width: "50%",borderRadius: 15, textAlign: 'center', alignItems: 'center', justifyContent: 'center', }}>
            
                    <Text style = {{textAlign: 'center', fontSize: 20,fontWeight: "500",color: "#23405E",overflow: "hidden", borderRadius: 10, backgroundColor: "#F76C6C",paddingVertical: 15,textAlignVertical: 'center',width: wp("30%")}}>JOIN</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateProject')} style = {{width: "50%",borderRadius: 15, textAlign: 'center', alignItems: 'center', justifyContent: 'center', }}>
            
                    <Text style = {{fontSize: 20, fontWeight: "500", color: "#23405E", textAlign: 'center', overflow: "hidden", borderRadius: 10, backgroundColor: "#F8E9A1",paddingVertical: 15,textAlignVertical: 'center',width: wp("30%")}}>CREATE</Text>

                    </TouchableOpacity>
                    
                {/* <TouchableOpacity style = {{width: "50%", justifyContent: 'center', height: 50}} onPress={() => this.props.navigation.navigate("CreateProject")} >
                <Text style = {{textAlign: 'center',borderRadius: 10, overflow: 'hidden', textAlignVertical: "center", backgroundColor: "#F8E9A1", paddingVertical: 15, width: 150}}>Create</Text>
                </TouchableOpacity> */}
            </View>
                <MyProjects projects={this.state.projects} navigation={this.props.navigation} />
                
            </View>
        )
    }

    fillProjects = () => {
        const projects = {};
        const db = firebase.firestore();

        const onReceive = (querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                projects[doc.id] = doc.data();
            });
            this.setState({ projects: projects })
           
        }
        db.collection("projects").get()
            .then(onReceive.bind(this));
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#24305E'
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
       
    },
})