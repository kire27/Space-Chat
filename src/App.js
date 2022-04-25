import "./styles/index.css";
import "./styles/AppUI.css";
import "./styles/Authentication.css";
import "./styles/partA.css";
import "./styles/partB.css";
import "./styles/partC.css";

import { 
    React, 
    useState,
} from "./config/React-config"
import {  
    app, 
    getAuth, 
    onAuthStateChanged,
} from "./config/Firebase-config";
import { 
    Authentication, 
    AppUI 
} from "./config/Components-config";


function App() {

    const [userAuth, setUserAuth]  = useState();
    const [registration, setRegistration] = useState(false);

    try {
        onAuthStateChanged(getAuth(app), (currentUser) => setUserAuth(currentUser))
        // console.log("App/USER_AUTH", userAuth);
    } catch (err) { console.log("App/31 error", err); }
    

    return (
        <React.Fragment>
            {userAuth ? <AppUI /> : <Authentication setReg={setRegistration} />}
        </React.Fragment>
    );
}

export default App;

// TODO start with scroll on bottom
// TODO show time of message was sent, only when the time has time difference
// TODO friends function:
    // create multiple databases for specific users and groups
    // be able to search and add users
    // show chat order by recent activity
// TODO deepen modal boxes with functions
// TODO clear components and separate stylings 
// TODO play safe: https://stackoverflow.com/questions/37603118/firebase-auth-onauthstatechanged-not-working
// TODO register with default picture - later randomize colors 
// TODO submit registration and login when user has filled all fields and pfp is correct type 
/* TODO perhaps create animation for logo on change of login and register components */
// TODO chatRoom - change height of textarea on overflow, not characters typed
// TODO chatRoom - textarea enter to make paragraphs function not working
// TODO chatRoom - messages time function crashes cause: unmounted component "createdAt"
            //  - time written in messages is hour behind
// TODO divide chats into groups/sets with friends
// TODO create function to group multiple friends into groups
// TODO when logged out console makes error BLOCKED BY CLIENT, find and fix to not show
// TODO when sending message, on enter make new line in message.
// TODO make this js a react component and use mount
// TODO emoji keyboard
// TODO send images in chat
// TODO option to delete user account. Include user data
// TODO popup messages
// TODO when deleting a friend, make a warning that chat delete too
// TODO bug ChatRoom: multiple clicks on 'send' button will send multiple messages
// TODO when user sends message the message stays in input for second and could be spammable
// TODO change chat textArea height on different practice
// TODO night theme
// TODO when accessing a component make a loading screen


// stay logged in even after reload
    // https://www.youtube.com/watch?v=-N12hjV3DPQ
    // https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
    // https://stackoverflow.com/questions/39097440/on-react-router-how-to-stay-logged-in-state-even-page-refresh
    // login https://www.youtube.com/watch?v=UDMXXwH7uiA

// hamburger menu:
    // https://codepen.io/alvarotrigo/pen/RwLGjKq
    // https://codepen.io/alvarotrigo/pen/PoJGObg
    // https://codepen.io/alvarotrigo/pen/oNGzoYd
    // https://codepen.io/alvarotrigo/pen/XWejzjR
    // https://codepen.io/alvarotrigo/pen/wvrzPWL

// detect mobile device: https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device

// react authenticator
    // https://www.youtube.com/watch?v=9bXhf_TELP4
    // https://www.youtube.com/watch?v=UDMXXwH7uiA
    
// firebase database: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
// firebase database collections: https://cloud.google.com/firestore/docs/samples/firestore-data-reference-subcollection#firestore_data_reference_subcollection-nodejs
// firebase auth: https://css-tricks.com/user-registration-authentication-firebase-react/

// search bar: https://dev.to/salehmubashar/search-bar-in-react-js-545l