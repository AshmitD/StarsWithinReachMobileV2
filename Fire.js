import FirebaseKeys from './Config'
import firebase from 'firebase'

class Fire {
    constructor() {
        firebase.initializeApp(FirebaseKeys)
    }

    addPost = async({text, localUri}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri)
      
        return new Promise((res,rej) => {
          
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri
            })
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
            })
        })
    }
    getUserData = async(email) => {
        return new Promise((res, rej) => {
            this.firestore.collection("users").where("email", "==", email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                   
                    res({id: doc.id, user: doc.data()});
                });
            })
            .catch(function(error) {
                rej("Error getting documents: ", error);
            });        
        })
    }
    addUser = async({name, email, who, shortBio}) => {
        return new Promise((res, rej) => {
        
            this.firestore.collection("users").add({
                name: name,
                email: email, 
                who: who,
                shortBio: shortBio,
            
            }) 
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
                console.log(error)
            })
        })
    }
    addProject = async({title, descrip, resources, endGoal, studentsActiosn}) => {
        return new Promise((res, rej) => {
        
            this.firestore.collection("projects").add({
                title: title,
                descrip: descrip, 
                resources: resources,
                endGoal: endGoal,
            
            }) 
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
                console.log("The error is", error)
            })
        })
    }
    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`
       
        return new Promise(async (res,rej) => {

            const response = await fetch(uri).catch(error => {
               
                rej(error)
            })
        
            const file =await response.blob().catch(error => {
                rej(error)
            })
  
          
            let upload = firebase.storage().ref(path).put(file)
          
            upload.on("state_changed", snapshot => {}, err => {
               
                rej(err)
            },
            async() => {
    
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
