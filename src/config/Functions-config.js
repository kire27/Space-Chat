import {
    firestore,
    auth,
    setDoc,
    set,
    addDoc,
} from "../config/Firebase-config";







// remake so output will update receiver hook throughout other components
export const LatestUsers = (msgUserUids, usersData) => {
    // makes array of user's id
    const { "userId": removedProp, ...usersObject } = 
        msgUserUids ? Object.entries(msgUserUids).length !== 0 ? msgUserUids[0] : {} : {}
    const uidContainer = [];
    const sortable = Object.entries(usersObject).sort((a,b) => a[1]-b[1]);
    // pushes already sorted entries into new array - "uidContainer"
    sortable.map((entry) => {
        if(entry[0] !== "userId") {
            return uidContainer.push(entry[0]);    
        }
    })

    // uses uidContainer to locate user data
    const latestUsersObject = {};
    uidContainer && uidContainer.map((value, id) => {
        usersData && usersData.map(object => {
            return object['uid'] === value ? Object.assign(latestUsersObject, {[id]: object}) : {}; 
        })
    })
    return latestUsersObject;
}


export const updateReceiver = (uid, setNewReceiver) => firestore.collection("Users").where("uid", "==", uid)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setNewReceiver(doc.data()); 
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


export const updateFriends = async (uid, e) => {
    // have to clone doc to add item
    e.preventDefault();
    const db = firestore.collection("Friends").doc(auth.currentUser.uid);
    await db.set( {[uid]: Date()} );
}