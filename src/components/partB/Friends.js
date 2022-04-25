import { 
    React, 
    useState,
    useRef,
} from "../../config/React-config";
import {
    firestore,
    useCollectionData,
    auth,
} from "../../config/Firebase-config";
import { 
    RecentFriends,
} from "../../config/Components-config";
import {
    LatestUsers
} from "../../config/Functions-config";


const Friends = (props) => {
    const receiver = props.receiver;
    const setReceiver = props.setReceiver;

    const [searchOutput, setSearchOutput] = useState({});
    const searchInput = useRef("");

    const usersRef = firestore.collection("Users")
    const [users] = useCollectionData(usersRef);

    // these variables cannot be in LatestUsers because it would update the hook, causing fewer hooks render
    const getUsers = firestore.collection("Messages").where('userId', '==', auth.currentUser.uid);
    const [userMsg] = useCollectionData(getUsers, { idField: "id" });


    const updateData = () => {
        const updateSearchObj = {};
        const input = String(searchInput.current.value)
            .trim()
            .toLowerCase();

        input && Object.entries(users)
            .map(([key, value], index) => {
                if (value.email.includes(input)) {
                    updateSearchObj[key] = value;
                }
                return updateSearchObj;
            })
        setSearchOutput(updateSearchObj);
    }

    const renderUsers = String(searchInput.current.value).trim() ? searchOutput : LatestUsers(userMsg, users);


    return (
        <div className="chatsPanelDiv">
            <h2>Chats</h2>

            <div className="peopleSearchDiv" >
                <img src={require("../../res/icons/search.png")} className="searchImg" alt="search" />  
                <input className="searchInput" 
                    type="text" 
                    placeholder="Search for user" 
                    ref={searchInput}
                    onInputCapture={updateData}
                />
            </div>

            <hr className="friendsPanelHr" />

            <div className="recentChatsLibrary">
                {
                searchInput && Object.entries(renderUsers).map(([key, value]) => (
                    <RecentFriends 
                        entryValues={value} 
                        key={"ch"+key}
                        receiver={receiver}
                        setReceiver={setReceiver}
                    />
                ))
                }
            </div>
            
        </div>
    );
}

export default Friends;