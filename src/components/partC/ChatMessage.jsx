import {
    React,
    useState
} from '../../config/React-config';
import { 
    auth,
} from "../../config/Firebase-config";


const ChatMessage = (props) => {
    const { displayName, text, uid, photoURL, createdAt } = props.message;
    const messagesArray = props.array;
    const messagesIndex = parseInt(props.index);

    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    const [hoverMouse, setHoverMouse] = useState('none')

    const multiMsgsBottom = () => {
        try {
            if (messagesArray.length > 0) {
                if (messagesArray[messagesIndex].uid === 
                    messagesArray[messagesIndex+1].uid
                ) return "none";
                else return true;
            } else return true;
        } catch (e) {}
    }

    const multiMsgsTop = () => {
        const messageArrayReverse = messagesArray.reverse();
        try {
            if (messageArrayReverse.length > 0) {
                if (messageArrayReverse[messagesIndex].uid === 
                    messageArrayReverse[messagesIndex-1].uid
                ) return "none";
                else return true;
            } else return false;
        } catch (e) {}
    }

    const msgTop = multiMsgsTop();


    return (
        <div>
            <hr className='separatorHr' style={{ display: msgTop }} />
            <div className={messageClass}>
                <p style={{ display: msgTop }}>{displayName}</p>

                <div className='message'>
                    <div className={messageClass}>
                        <img src={photoURL} alt="profile pic" 
                            style={{display: multiMsgsBottom() }} />
                    </div>

                    <span
                        onMouseOver={() => setHoverMouse('inline')}
                        onMouseOut={() => setHoverMouse('none')}
                    >
                        {text}
                    </span>
                    <h6 style={{ display: hoverMouse}}> {timeEdit(createdAt)} </h6>

                </div>
            </div>
        </div>
    );
};


const timeEdit = (date) => {
    const dateArr = 
    date ? date
    .split(' ')
    .splice(1, 4)
    .reverse()
    :
    null;
    
    if (dateArr) dateArr.push(dateArr.splice(1,1)[0]);
    
    return (dateArr.join(' '));
}


export default ChatMessage;