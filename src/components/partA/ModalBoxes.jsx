import { 
    React, 
} from "../../config/React-config";
import {
    auth
} from "../../config/Firebase-config";
import { 
} from "../../config/Components-config"


const ModalBoxes = (props) => {
    const { modalBox, setModalBox } = props;

    switch (modalBox) {
        case "friends": 
            return <FriendsModalBox 
                setModalBox={setModalBox} 
            />;
        case "accounts": 
            return <AccountModalBox 
                setModalBox={setModalBox} 
            />;
        case "settings": 
            return <SettingsModalBox 
                setModalBox={setModalBox}
            />;
        default: return null;
    };

};


const FriendsModalBox = (props) => {
    const { setModalBox } = props;

    return (
        <div className={"modalBox"}>
            <div className="modalContainer">
                <h2>friends:</h2>
                <div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
            </div>
            
            <div className="modal" onClick={() => setModalBox(false)}></div>
        </div>
    );
}


const AccountModalBox = (props) => {
    const { setModalBox } = props;
    const { displayName, uid, email, phoneNumber, photoUrl } = auth.currentUser;

    // hooks of pfp
    // const [defaultMenuProfile, setDefaultMenuProfile] = useState(true);
    // const [imageUrl, setImageUrl] = useState(require("../../res/images/default_profile.jpg"));


// brain of profile picture change, change to update profile and not only upload into storage
    // const handleUserImage = async (e) => {
    //     const receivedPic = e.target.files[0];

    //     if (await receivedPic) {
    //         console.log("TARGET 1", receivedPic ? true : false);
    //         console.log(receivedPic);
    //         console.log(receivedPic.name);

    //         const imageRef = ref(storage, auth.currentUser.uid +"/"+ receivedPic.name);

    //         uploadBytes(imageRef, receivedPic)
    //             .then(() => getDownloadURL(imageRef)
    //                 .then(url => setImageUrl(url)
    //                 ).catch(err => console.log(err.message, "error getting the image url"))
    //             ).catch(err => console.log(err));
    //     } else {
    //         console.log("TARGET 2", receivedPic ? true : false);
    //         return getDownloadURL(ref(storage, "default_profile.jpg")).then(url => setImageUrl(url));
    //     }
    // };

    
    return (
        <div className={"modalBox"}>
            <div className="modalContainer">
                <img src={photoUrl} alt="profilePic" />
                <div>
                    !some flex! to center
                    <p>username: {displayName}</p>
                    <p>email: {email}</p>
                    <p>{uid}</p>
                    <p>this profile</p>
                    <p>add account</p>
                </div>
                <button>cancel</button>
            </div>

            <div className="modal" onClick={() => setModalBox(null)}></div>
        </div>
    );
            
    /*             
div for change of profile picture, pick file, hover, shows default 
    <div className="loginMenuImgDiv">
        <input
            type="file"
            onChange={(e) => handleUserImage(e)}
            onMouseOver={() => setDefaultMenuProfile(false)}
            onMouseOut={() => setDefaultMenuProfile(true)}
            className="loginImgInput"
            accept=".jpg,.jpeg,.png"
            />
        <img
            src={require(defaultMenuProfile ? "../../res/images/empty.png" : "../../res/images/add_profile_picture_icon.png")}
            alt="menuHover"
            className="defaultUserImg"
            style={{ position: "absolute", zIndex: 1 }}
        />
        <img
            src={imageUrl}
            alt="menu"
            className="defaultUserImg"
        />
    </div>    
    */
}


const SettingsModalBox = (props) => {
    const { setModalBox } = props;

    return (
        <div className={"modalBox"}>
            <div className="modalContainer">
                <h2>Settings:</h2>
                <div>
                    <div>edit profiles</div>
                    <div>notification</div>
                    <div>privacy and security</div>
                    <div>chat settings</div>
                    <div>advanced</div>
                    <div>language</div>
                </div>
            </div>
            
            <div className="modal" onClick={() => setModalBox(null)}></div>
        </div>
    );
}


export default ModalBoxes;