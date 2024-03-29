import { React, useState, useRef } from "../../config/React-config";
import {
    firestore,
    useCollectionData,
    auth,
} from "../../config/Firebase-config";
import { RecentFriends } from "../../config/Components-config";
import { LatestUsers } from "../../config/Functions-config";

/*
sort friends by alphabet
make into 2 columns
*/
function ChatIntroduce(props) {
    const receiver = props.receiver;
    const setReceiver = props.setReceiver;

    const usersRef = firestore.collection("Users");
    const [users] = useCollectionData(usersRef);

    const getUsers = firestore
        .collection("Messages")
        .where("userId", "==", auth.currentUser.uid);
    const [userMsg] = useCollectionData(getUsers, { idField: "id" });

    const latestUsers = LatestUsers(userMsg, users);

    console.log(latestUsers);
    return (
        <div className="friendsMainDiv">
            <h2>Friends: </h2>

            <div className="friendsFilterControls">
                <input placeholder="type name" />
                <button>online</button>
                <button>all</button>
                <button>pending</button>
                <button>blocked</button>
            </div>

            <div className="friendsList">
                {true &&
                    Object.entries(latestUsers).map(([key, value, array]) => (
                        console.log(array)
                        // <RecentFriends
                        //     entryValues={value}
                        //     key={"ch" + key}
                        //     receiver={receiver}
                        //     setReceiver={setReceiver}
                        // />
                    ))}
            </div>
        </div>
    );
}

export default ChatIntroduce;
