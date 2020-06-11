import React from 'react'
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import firebase from 'firebase'
import { ScrollView } from 'react-native-gesture-handler'

export default class OneProjectScreen extends React.Component {
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        const currProjectID = params ? params.otherParam : null;
        const orderedDocs = []
       
        this.state = {
           
            projectID: currProjectID,
           
        }

      
    
    }
   
    render() {
        
        return (

            <View style={styles.container}>
                  <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.navigate("Projects")}>
                        <Ionicons name="ios-arrow-round-back" size={32} color="black"></Ionicons>
                    </TouchableOpacity>
                <Text style = {{textAlignVertical: 'center'}}>Hi This is the communcation pages</Text>
            </View>
        )


    }
    
       
       



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    
})