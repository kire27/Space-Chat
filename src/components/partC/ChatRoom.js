import { 
    React, 
    useState,
    useRef
} from "../../config/React-config";
import {
    firestore,
    useCollectionData,
    setDoc,
    doc,
    auth,
} from "../../config/Firebase-config";
import { 
    ChatMessage,
} from "../../config/Components-config"


function ChatRoom(props) {
    const { uid: rUid, email: rEmail, photoURL: rPhotoUrl, displayName: rDisplayName } = props.receiver;

    const { displayName, email, photoURL, uid } = auth.currentUser;
    
    const messagesRef = firestore.collection("Messages")
        .doc(uid).collection(rUid);
    const query = messagesRef.orderBy("createdAt"); //.limitToLast(5)
    const latestMsgRef = firestore.collection("Messages").doc(uid)

    const messagesRefReceiver = firestore.collection("Messages")
        .doc(rUid).collection(uid);
    const latestMsgRefReceiver = firestore.collection("Messages").doc(rUid)
    
    const [messages] = useCollectionData(query, { idField: "id" });
    const id = () => messages.length+1;
    const [formValue, setFormValue] = useState("");

    const getUsers = firestore.collection("Messages").where('userId', '==', auth.currentUser.uid);
    const [userMsg] = useCollectionData(getUsers, { idField: "id" });

    // changes order of latest users on message send
    const updateLatestUserOrder = (forUser, users) => {
        if (users && users[0][forUser] === 0) return {}; // if user is not first

        const { "userId": removedProp, ...usersObject } = users ? users[0] : {};
        const usersOrder = {};
        usersOrder[forUser] = 0;
        
        const sortable = Object.entries(usersObject).sort((a, b) => a[1]-b[1]);
        sortable.map((entry, id) => {
            if(entry[0] !== forUser) usersOrder[entry[0]] = id+1;
        })

        return usersOrder;
    }


    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            if (formValue.trim()) {
                // database write for current user
                await setDoc(doc(messagesRef), {
                    text: formValue,
                    createdAt: Date(), // firebase.firestore.FieldValue.serverTimestamp(),
                    id: id(),
                    displayName,
                    uid,
                    photoURL,
                }) // add receiver's uid into current doc
                .then (async () => {
                    await latestMsgRef.update(
                        updateLatestUserOrder(rUid, userMsg)
                    );
                }).catch (err => console.log(err));

                // database write for receiver user
                if (uid !== rUid) {
                    await setDoc(doc(messagesRefReceiver), {
                        text: formValue,
                        createdAt: Date(),
                        id: id(),
                        displayName,
                        uid,
                        photoURL,
                    }) // add user's uid into receiver's doc
                    .then (async () => {
                        await latestMsgRefReceiver.update(
                            updateLatestUserOrder(uid, userMsg)
                        );
                    }).catch (err => console.log(err));
                }
                
                setFormValue("");
            }
        } catch (error) {
            if (error instanceof Error) console.log(error);
        }
    };

    // TODO remake textarea enlargement, shift + enter to make paragraph
    const [textareaHeight, setTextareaHeight] = useState(0);
    
    const dummyScroll = useRef();
    const scrollChat = () => dummyScroll.current.scrollIntoView();


    return (
        <div className="chatMainDiv" onLoad={scrollChat}>
            <main>
                <div className="chatIntroduction">
                    <img src={rPhotoUrl} alt="receiver" />
                    Say hello to {rDisplayName}
                </div>

                {messages && messages.map((msg, index, array) => (
                    <ChatMessage 
                        key={"ms"+index} 
                        message={msg} 
                        array={array}
                        index={index} />
                    )
                )}
                <div ref={dummyScroll}></div>
            </main>

            <form>
                <textarea
                    style={{height: `${textareaHeight}vh`}}
                    onKeyDown={e=>manageTextarea(e, sendMessage, setTextareaHeight, formValue)}
                    placeholder="Type here"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                /> 
                <img src={require("../../res/icons/send_arrow.png")} alt="send" onClick={sendMessage} />
            </form>
        </div>
    );
}


const manageTextarea = (e, send, setHeightHook, formValue) => {
    if(e.keyCode === 13 && e.shiftKey === false) send(e);    
    
    if (formValue.length <= 44) setHeightHook(0); 
    if (formValue.length >= 45) setHeightHook(8);
    if (formValue.length >= 89) setHeightHook(12);
    if (formValue.length >= 133) setHeightHook(16);
    if (formValue.length >= 177) setHeightHook(19);
    if (formValue.length >= 221) setHeightHook(23);
}


export default ChatRoom;