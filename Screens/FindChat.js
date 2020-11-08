import React from 'react'
import { View, Modal, TouchableHighlight, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import CustomMultiPicker from "react-native-multiple-select-list";
import firebase from 'firebase'
import Fire from '../Fire'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const userList = {
    "student": "Student",
    "prof": "Professional",
    "org": "Organization"
}
export default class FindChat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            everyone: [],
            whoToSearchThrough: [],
            filteredData: [],
            keepData: []
        }
        this.fillUsers()
    }
    handleChat = (email, name) => {
        // this.state.user.email
        // firebase.auth().current.user.email
        console.log("This is email in handle", email, firebase.auth().currentUser.email)
        Fire.shared.addChat({ "email1": email, "email2": firebase.auth().currentUser.email }).then((thisID) => {
            console.log("this is id in handle chat", thisID)
            this.props.navigation.navigate('ChatScreen', {
                "id": thisID, "name": name
            })
        })
    }
    filterData = (users, keep) => {
        console.log(users.length);
        console.log("This is dataaa and keep", users.filter(user => keep.includes(user.user['who'])), keep)

        return users.filter(data => keep.includes(data.user['who']))
    }

    fillUsers = () => {
        let everyone = []
        console.log("this is who to search through?", this.state.whoToSearchThrough)
        const db = firebase.firestore();
        console.log("herehehrehrhehr?")
        const onReceive = (querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                everyone.push({ 'user': doc.data(), 'id': doc.id })
                // doc.data() is never undefined for query doc snapshots
            });
            console.log("this is everyone in fillUsers", everyone)
            this.setState({ everyone })

        }
        db.collection("users").get()
            .then(onReceive.bind(this));
    }
    renderUser = user => {
        console.log("hellenr")
        let chars = user.user.name.split(" ")[0].substring(0, 1)
        if (user.user.name.split(" ").length > 1) {
            chars += user.user.name.split(' ')[1].substring(0, 1)
        }
        return (
            <View style={styles.showContainer}>


                <View style={styles.showAvatar}>
                    <Text style={styles.showAvatarText}>{chars}</Text>
                </View>

                <Text style={styles.showName}>{user.user['name']}</Text>
                <Text style={styles.showBio}>{user.user['shortBio']}</Text>

                <TouchableOpacity onPress = {() => {this.handleChat(user.user.email,user.user.name)}}><Text style={styles.showChat}>Chat Now</Text></TouchableOpacity>
            </View>
        )
    }


    render() {

        return (

            <View style={styles.container}>
<View style={styles.header}>
          <View style={styles.linesContainer}>
            <TouchableOpacity style={{
              position: "absolute",
              left: 20,
            }} onPress={() => { this.props.navigation.navigate('Chat')}}><Ionicons size={36} color={"#3772ff"}  name="ios-arrow-round-back" ></Ionicons></TouchableOpacity>
            <Text style={styles.heading}>FIND CHAT</Text>
          
          </View>
        </View>
                <View style={styles.content}>
            <View style = {{marginHorizontal: 25}}>
                    <CustomMultiPicker
                        options={userList}
                        multiple={true} //
                        placeholderTextColor={'#757575'}
                        returnValue={"label"} // label or value
                        callback={(res) => { this.setState({ whoToSearchThrough: res }) }} // callback, array of selected items
                        rowBackgroundColor={"#fff"}
                        rowHeight={40}
                        rowRadius={5}

                        iconColor={"#00a2dd"}
                        iconSize={30}
                        selectedIconName={"ios-checkmark-circle-outline"}
                        unselectedIconName={"ios-radio-button-off"}
                        scrollViewHeight={170}
                        selected={1}
                    // list of options which are selected by default
                    />
                    </View>

                    {console.log('before you kill me, this is state.everyone:', this.state.everyone)}
                    {console.log('kill me: ', this.filterData(this.state.everyone, this.state.whoToSearchThrough))}
                    {this.state.everyone.length !== 0 && <FlatList
                        style={styles.feed}
                        data={this.filterData(this.state.everyone, this.state.whoToSearchThrough)}
                        // data={this.state.everyone}
                        renderItem={({ item }) => {
                            console.log("hi in crap format");
                            return this.renderUser(item);
                        }}
                        extraData={this.state.everyone}
                        showsVerticalScrollIndicator={false}
                    />}

                </View>
            </View>
        )


    }






}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3772ff",
        textAlignVertical: 'center',
        width: "100%",
    },
    header: {
        backgroundColor: "#fff",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 0.75,
        paddingBottom: 40,
      },
      linesContainer: {
        backgroundColor: "transparent",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      },
      plus: {
        position: "absolute",
        right: 20,
      },
      content: {
        paddingTop: '8%',      
        flex: 6,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        width: "100%",
        backgroundColor: "#3772ff",
        position: "relative",
        top: -30,
        height: '100%'
      },
      heading: {
        fontSize: 30,
        textTransform: "uppercase",
        letterSpacing: 2,
        paddingHorizontal: 20,
        marginBottom: 5,
        color: "#3772ff",
      },
    
    feed: {
        height: 'auto',
        marginBottom: 0
    },
    showContainer: {
        flexDirection: "column",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
    },
    showAvatar: {
        height: 80,
        width: 80,
        borderRadius: 100,
        flexDirection: "column",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        marginBottom: 5,
    },
    showAvatarText: {
        fontSize: 25,
    },
    showName: {
        textTransform: "capitalize",
        fontSize: 24,
        fontWeight: "600",
        color: "#fff",
        marginVertical: 5,
    },
    showBio: {
        fontSize: 18,
        color: "#fff",
        textAlign: 'center'
    },
    showChat: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#000",
        marginVertical: 20,
        color: "white",
        fontSize: 16,
    },

})
