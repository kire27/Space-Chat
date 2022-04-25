import { 
    React, 
    useState,
} from "../../config/React-config";
import {
    auth,
} from "../../config/Firebase-config";
import { 
    ModalBoxes,
} from "../../config/Components-config"


function MenuPanel(props) {
    const setReceiver = props.setReceiver;
    const [modalBox, setModalBox] = useState(null);

    
    return (
        <React.Fragment>
            <ModalBoxes modalBox={modalBox} setModalBox={setModalBox} />

            <div className="chatBasicDiv">
                <img src={require("../../res/icons/logo.png")} 
                    alt="logo" 
                    className="chatLogoIcon"
                    onClick={()=>setReceiver("none")}
                />

                <div className="chatBasicMenuDiv">
                    <img src={require("../../res/icons/account.png")} 
                        className="chatIcons" 
                        alt="settings" 
                        onClick={() => setModalBox("accounts")}
                    />
                    <img src={require("../../res/icons/friends.png")} 
                        className="chatIcons" 
                        alt="settings" 
                        onClick={() => setModalBox("friends")}
                    />
                    <img src={require("../../res/icons/theme.png")} 
                        className="chatIcons" 
                        alt="settings" 
                    />
                    <img src={require("../../res/icons/settings.png")} 
                        className="chatIcons" 
                        alt="settings" 
                        onClick={() => setModalBox("settings")}
                    />
                    <img src={require("../../res/icons/logout.png")} 
                        className="chatIcons"
                        onClick={async () => await auth.signOut()} 
                        alt="logout" 
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default MenuPanel;