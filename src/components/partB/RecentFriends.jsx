import { React, useState } from "../../config/React-config";
import {
    auth,
    firestore,
    getDownloadURL,
    useCollectionData
} from "../../config/Firebase-config";
import {
    UserMiniMenu,
} from "../../config/Components-config"
import {
    updateReceiver
} from "../../config/Functions-config";


/*
component could be renamed to UserListing
could be global component 
center name if there is no text
*/

const RecentFriends = (props) => {
    const receiver = props.receiver;
    const setReceiver = props.setReceiver;
    
    const { displayName, email, photoURL, uid } = props.entryValues;

    const messagesRef = firestore.collection("Messages")
        .doc(auth.currentUser.uid).collection(uid?uid:"none");
    const lastQuery = messagesRef.orderBy("createdAt").limitToLast(1);
    const [lastMessage] = useCollectionData(lastQuery, { idField: "id" });

    const text = lastMessage && lastMessage.map((msg) => msg.text);

    const [miniMenu, setMiniMenu] = useState();
    const [leftClick, setLeftClick] = useState(false);
    const LeftClick = (e) => {
        switch (e.button) {
            case 0:
                updateReceiver(uid, setReceiver);
                setLeftClick(false); 
                break;
            case 2:
                e.preventDefault();
                setLeftClick(true);
                setMiniMenu(e);
                break;
            default: return null;
        }
    }
    console.log(leftClick);

    return (
        <>
            {leftClick ?
                <UserMiniMenu 
                    e={miniMenu}
                    receiver={props.entryValues}
                    setReceiver={setReceiver}
                    setLeftClick={setLeftClick} 
                />
                : 
                null
            }

            <div className='rcBlock' 
                onClick={(e) => LeftClick(e)}
                onContextMenu={(e) => LeftClick(e)}
            >            
                <div className='rcImage'>
                    <img src={photoURL} alt="pfp" />
                </div>

                <div className='rcText'>
                    <div className='textName'>
                    {displayName?displayName:email}

                    </div>
                    <div className='textMessage'>
                        {text}
                    </div>
                </div>
            </div>  
        </>     
    );
}





export default RecentFriends;