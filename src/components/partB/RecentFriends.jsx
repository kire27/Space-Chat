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
    const { receiver, setReceiver, entryValues } = props;
    
    const { displayName, email, photoURL, uid } = entryValues;

    const messagesRef = firestore.collection("Messages")
        .doc(auth.currentUser.uid).collection(uid?uid:"none");
    const lastQuery = messagesRef.orderBy("createdAt").limitToLast(1);
    const [lastMessage] = useCollectionData(lastQuery, { idField: "id" });

    const text = lastMessage && lastMessage.map((msg) => msg.text);

    const [closeKebab, setCloseKebab] = useState(false);

    return (
        <div className='rcBlock' onMouseLeave={(e) => setCloseKebab(false)}>
            <div className="rcFlex">
                <div className='rcImage'>
                    <img src={photoURL} alt="pfp" />
                </div>

                <div className='rcText' onClick={(e) => updateReceiver(uid, setReceiver)}>
                    <div className='textName'>
                    {displayName?displayName:email}

                    </div>
                    <div className='textMessage'>
                        {text}
                    </div>
                </div>

                <div className="rcMenu" onClick={(e) => setCloseKebab(true)}>
                    <img
                        className="rcKebabMenu"
                        src={require("../../res/icons/kebab menu.png")} 
                        alt="kebab menu" />
                </div>
            </div>
            
            { closeKebab ?
                <UserKebabOptions closeKebab={closeKebab} setCloseKebab={setCloseKebab} />
                :
                null
            }

        </div>  
           
    );
}


const UserKebabOptions = (props) => {
    const { closeKebab, setCloseKebab } = props;
    
    return (
        <div className="kebabContainer">
            <hr className="kebabHr" />
            <div className="kebabBox">
                add friend
            </div>

            <div className="kebabBox">
                remove friend
            </div>

            <hr className="kebabHr" />
            <div className="kebabBox">
                sdfasdf
            </div>

            <div className="kebabBox">
                sdfasdf
            </div>

            <hr className="kebabHr" />
            <div className="kebabBox">
                sdfasdf
            </div>

            <div className="kebabBox">
                sdfasdf
            </div>

        </div>
    )
}



export default RecentFriends;