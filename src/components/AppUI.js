import { React, useState, useEffect } from "../config/React-config";
import { auth, firestore, useCollectionData } from "../config/Firebase-config";
import {
    ChatRoom,
    Friends,
    MenuPanel,
    FriendsOnline,
} from "../config/Components-config";

const AppUI = () => {
    // contains receiver user information upon his selection
    const [receiver, setReceiver] = useState("none");

    // const [isOnline, set_isOnline] = useState(true);
    // let interval = null;

    // const InternetErrMessagenger = () => set_isOnline(navigator.onLine); // for do like this shortform

    // useEffect(() => {
    //     interval = setInterval(InternetErrMessagenger, 5000);

    //     console.log(isOnline);

    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    //     if (navigator.onLine) {
    // firestore.collection("Users").doc(auth.currentUser.uid)
    //             .update({online: true})
    //     } else {
    //         firestore.collection("Users").doc(auth.currentUser.uid)
    //             .update({online: false})
    //     }

    //     return () => {
    //         clearInterval(interval); // for component unmount stop the interval
    //     };
    // }, []);

    const friendsRef = firestore.collection("Friends");
    const [friends] = useCollectionData(friendsRef);

    console.log(friends);

    return (
        <div className="partLayout">
            <MenuPanel setReceiver={setReceiver} />

            <Friends receiver={receiver} setReceiver={setReceiver} />

            {receiver === "none" ? (
                <FriendsOnline receiver={receiver} setReceiver={setReceiver} />
            ) : (
                <ChatRoom receiver={receiver} />
            )}
        </div>
    );
};

export default AppUI;
