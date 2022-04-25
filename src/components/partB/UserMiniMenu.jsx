import { React, useState } from "../../config/React-config";
import {} from "../../config/Firebase-config";
import {} from "../../config/Components-config";
import { updateReceiver, updateFriends } from "../../config/Functions-config";

// https://www.pluralsight.com/guides/how-to-create-a-right-click-menu-using-react
const UserMiniMenu = (props) => {
    const { e, receiver, setReceiver, setLeftClick } = props;
    const { pageX, pageY, button } = e;
    const { displayName, email, uid } = receiver;

    const [abc, setAbc] = useState(false);

    const manageClick = (e) => {
        e.preventDefault();
    };

    console.log(abc);

    return (
        <div
            className="miniMenu"
            onClick={(e) => manageClick(e)}
            onContextMenu={(e) => manageClick(e)}
            onBlur={() => setAbc(true)}
            // onClickCapture={(e) => !e.currentTarget.contains(e.relatedTarget) ? setLeftClick(false) : null}
        >
            <div>{displayName}</div>
            <div>
                <button onClick={(e) => updateFriends(uid, e)}>
                    {" "}
                    add friend{" "}
                </button>
            </div>
        </div>
    );
};

export default UserMiniMenu;
