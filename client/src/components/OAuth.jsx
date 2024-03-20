import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice";

const OAuth = () => {
    const dispatch = useDispatch();

    const handleButtonClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const response = await fetch("/api/v1/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await response.json();
            console.log(data);

            dispatch(signInSuccess(data));
        } catch (error) {
            console.log(`Could not login with google: ${error}`);
        }
    };

    return (
        <button
            type="button"
            onClick={handleButtonClick}
            className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
        >
            Continue with Google
        </button>
    );
};

export default OAuth;
