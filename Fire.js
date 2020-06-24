import FirebaseKeys from './Config'
import firebase from 'firebase'
import { Alert } from 'react-native'

class Fire {
    constructor() {
        firebase.initializeApp(FirebaseKeys)
    }

    addPost = async ({ text, localUri, name }) => {
        let remoteUri;
        if(localUri) {
            console.log("this is url", localUri)
            remoteUri = await this.uploadPhotoAsync(localUri)
        }
        else {
            remoteUri = " "
        }
        console.log("This is local uri", localUri)

        return new Promise((res, rej) => {

            this.firestore.collection("posts").add({
                name: name,
                text: text,
                timestamp: this.timestamp,
                uid: this.uid,
                image: remoteUri,

            })
                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    console.log("this is the error", error)
                    rej(error)
                })
        })

    }
    addComm = async ({ projectID, type, link }) => {
       

        return new Promise((res, rej) => {

            this.firestore.collection("projects").doc(projectID).collection("CommunicationLinks").add({
                type: type,
                link: link,

            })
                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    console.log("this is the error", error)
                    rej(error)
                })
        })

    }
    addDesign = async ({ text, localUri, projectID, name }) => {
        let remoteUri;
        if(localUri) {
            console.log("this is url", localUri)
            remoteUri = await this.uploadPhotoAsync(localUri)
        }
        else {
            remoteUri = " "
        }
        console.log("This is local uri", localUri)

        return new Promise((res, rej) => {

            this.firestore.collection("projects").doc(projectID).collection("projectPosts").add({
                name: name,
                text: text,
                timestamp: this.timestamp,
                uid: this.uid,
                imageLink: remoteUri,

            })
                .then(ref => {
                    res(ref)
                })
                .catch(error => {
                    console.log("this is the error", error)
                    rej(error)
                })
        })

    }
    getUserData = async (email) => {
        return new Promise((res, rej) => {
            this.firestore.collection("users").where("email", "==", email)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots

                        res({ id: doc.id, user: doc.data() });
                    });
                })
                .catch(function (error) {
                    rej("Error getting documents: ", error);
                });
        })
    }
    addUser = async ({ name, email, who, shortBio, projects, topics }) => {
       console.log("this is topics", topics)
        return new Promise((res, rej) => {

            this.firestore.collection("users").add({
                name: name,
                email: email,
                who: who,
                shortBio: shortBio,
                projects: projects,
                topics: []
            })
                .get().then(ref => {
                    console.log("this is topics in then", topics)
                    this.getUserData(email).then(({ id}) => {   
                            const userDoc = this.firestore.collection("users").doc(id)
                            userDoc.update({
                                topics: topics
                            });
                    })
                    res(ref)
                })
                .catch(error => {
                    console.log("this is the error", error)
                    rej(error)
                      console.log(error)
                })
        }) 
    }

    joinProject = projectId => {
        console.log("This is project id",projectId)
        this.getUserData(firebase.auth().currentUser.email).then(({ id, user }) => {
            const arr = user["projects"]
            console.log("This is usre", arr)
            if (arr.includes(projectId)) {
               Alert.alert("You are already in this project.")
            } else {
                arr.push(projectId)
                const userDoc = this.firestore.collection("users").doc(id)
                userDoc.update({
                    projects: arr
                });
             
            }
       
        })

    }
    addProject = async ({ title, descrip, resources, endGoal, topics }) => {
        return new Promise((res, rej) => {

            this.firestore.collection("projects").add({
                title: title,
                descrip: descrip,
                resources: resources,
                endGoal: endGoal,
                topics: topics
            })
                .then(ref => {
                    console.log("This is ref", ref.data())
                    this.joinProject
                    res(ref)
                })
                .catch(error => {
                    rej(error)
                    // console.log("The error is", error)
                })
        })
    }
    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`

        return new Promise(async (res, rej) => {

            const response = await fetch(uri).catch(error => {
                rej(error)
            })

            const file = await response.blob().catch(error => {
                rej(error)
            })


            let upload = firebase.storage().ref(path).put(file)

            upload.on("state_changed", snapshot => { }, err => {

                rej(err)
            },
                async () => {

                    const url = await upload.snapshot.ref.getDownloadURL();

                    res(url)
                })
        })
    }
    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        return Date.now()
    }
}


Fire.shared = new Fire()
export default Fire
 