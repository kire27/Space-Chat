import { 
    React, 
    useState, 
    useRef 
} from "../config/React-config";
import {
    auth,
    GoogleAuthProvider,
    firestore,
    doc,
    setDoc,
} from "../config/Firebase-config";


const Authentication = () => {
    const [userHasAccount, setUserHasAccount] = useState(true);

    // component to login or register with google
    const loginGoogle = async (e) => {
        e.preventDefault();
  
        await auth
            .signInWithPopup(new GoogleAuthProvider())
            .then((user) => console.log("Google user: ", user))
            .catch((err) => console.log(err));
    };

    // component for user registration
    const Register = () => {
        const [usernameValue, setUsernameRef] = useState(null);
        const photoUrl = "https://firebasestorage.googleapis.com/v0/b/superchat-406c5.appspot.com/o/Default%2Fdefault_profile.jpg?alt=media&token=75a230e2-308d-4bf0-ad43-dd3bac372fde";
        const emailRef = useRef(null);
        const passwordRef = useRef(null);
        const passwordCheckRef = useRef(null);

        const signUp = async (e) => {
            e.preventDefault();

            if (VerifyCredentials(
                usernameValue, 
                passwordRef.current.value, 
                passwordCheckRef.current.value
            )) {
                await auth.createUserWithEmailAndPassword(
                    emailRef.current.value, 
                    passwordRef.current.value
                )
                    .then(async user => {
                        auth.currentUser.updateProfile({
                            displayName: usernameValue,
                            photoURL: photoUrl
                        });
                        
                        const ref = firestore.collection("Users");
                
                        await setDoc(doc(ref, user.user.uid), {
                            displayName: usernameValue, 
                            email: user.user.email, 
                            emailVerified: false, 
                            creationTime: Date(),
                            phoneNumber: null, 
                            photoURL: photoUrl, 
                            uid: user.user.uid
                        })
                    })
                    .catch(err => {
                        switch (err.code) {
                            case "auth/internal-error":
                                console.log("Please try again"); break;
                            case "auth/invalid-email":
                                console.log("email badly formatted"); break;
                            case "auth/missing-email":
                                console.log("type your email"); break;
                            case "auth/email-already-in-use":
                                console.log("account already exists"); break;
                            case "auth/weak-password":
                                console.log("password too weak 6 characters min"); break;
                            default: console.log("SignIn/121 error", [err]); break;
                        }
                    });

                    CreateDatabase()
            }
        };    
        
        return (
            <RegistrationLayout
                setUsernameRef={setUsernameRef}
                emailRef={emailRef}
                passwordRef={passwordRef}
                passwordCheck={passwordCheckRef}
                signUp={signUp}
            />
        );
    };
     
    // component to login user
    const Login = () => {
        // https://www.youtube.com/watch?v=UDMXXwH7uiA
        const emailRef = useRef(null);
        const passwordRef = useRef(null);

        const signIn = async (e) => {
            e.preventDefault();

            await auth
                .signInWithEmailAndPassword(
                    emailRef.current.value,
                    passwordRef.current.value
                )
                .then((user) => console.log(user))
                .catch((err) => console.log(err));
        };

        return (
            <LoginLayout
                emailRef={emailRef}
                passwordRef={passwordRef}
                signIn={signIn}
            />
        );
    };


    return (
        <div className="menuLayoutDiv">
            <h1>Welcome To SpaceChat</h1>

            <form className="loginForm">
                <div className="loginDiv">
                    {userHasAccount ? <Login /> : <Register />}

                    <button className="loginWithGoogle" onClick={loginGoogle}>
                        Login with google
                    </button>

                    {userHasAccount ? (
                        <h6 className="signUpHeading">
                            Don't have an account?
                            <span
                                className="signUpSpan"
                                onClick={() => setUserHasAccount(false)}
                            >
                                Sign up.
                            </span>
                        </h6>
                    ) : (
                        <h6 className="signUpHeading">
                            Already have an account?
                            <span
                                className="signUpSpan"
                                onClick={() => setUserHasAccount(true)}
                            >
                                Log in.
                            </span>
                        </h6>
                    )}
                </div>

                <div className="loginMenuImgDiv">
                    <img
                        src={require("../res/icons/logo.png")}
                        alt="menu"
                        className="loginLogoImg"
                    />
                </div>

            </form>
        </div>
    );

};





const VerifyCredentials = (username, password, passwordCheck) => {
    if (!(username && password && passwordCheck)) {
        console.log("fill inputs");
        return false;
    }

    if (!(4 <= username.length && username.length <= 24)) {
        console.log("wrong username");
        return false;
    }

    if (!(password === passwordCheck)) {
        console.log("password does not match");
        return false;  
    } 

    return true;
}


const LoginLayout = (props) => {
    const { emailRef, passwordRef, signIn } = props;

    return (
        <React.Fragment>
            <input
                type="text"
                id="email"
                ref={emailRef}
                placeholder="Your email"
            />
            <input
                type="password"
                id="password"
                ref={passwordRef}
                placeholder="Your password"
            />
            <button className="loginWithEmail" onClick={signIn}>
                login
            </button>
        </React.Fragment>
    );
}


const RegistrationLayout = (props) => {
    const { setUsernameRef, emailRef, passwordRef, passwordCheck, signUp } = props;

    return (
        <React.Fragment>
            <input
                type="text"
                id="username"
                onChange={(e) => setUsernameRef(e.target.value)}
                placeholder="Your username"
            />
            <input
                type="text"
                id="email"
                ref={emailRef}
                placeholder="Your email"
            />
            <input
                type="password"
                id="password"
                // onBlur={() => alert("dfsdf")}
                ref={passwordRef}
                placeholder="Your password"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                required
            />
            <input
                type="password"
                id="passwordAgain"
                ref={passwordCheck}
                placeholder="Repeat your password"
            />
            <button className="loginWithEmail" onClick={signUp}>
                sign up
            </button>
        </React.Fragment>
    );
}


const CreateDatabase = async () => {
    const latestMsgRef = firestore.collection("Messages").doc(auth.currentUser.uid)
    await latestMsgRef.set({userId: auth.currentUser.uid});
}


export default Authentication;
