import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOut,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from "../redux/userSlice";

const Profile = () => {
    const { currentUser, loading, error } = useSelector((store) => store.user);

    const fileRef = useRef(null);

    const [image, setImage] = useState(undefined);

    const [imagePercentage, setImagePercentage] = useState(0);

    const [imageError, setImageError] = useState(false);

    const [formData, setFormData] = useState({});

    const dispatch = useDispatch();

    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (image) {
            handleImageUpload(image);
        }
    }, [image]);

    const handleImageUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setImagePercentage(progress);
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, profilePicture: downloadURL })
                );
            }
        );
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(updateUserStart());
            const response = await fetch(`/api/v1/user/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error));
            console.error("Server error: " + error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart());
            const response = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error));
            console.error("Server error: " + error);
        }
    };

    const handleSignOut = async () => {
        try {
            await fetch(`/api/v1/auth/signout`);
            dispatch(signOut());
        } catch (error) {
            console.error("Server error: " + error);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="Profile Photo"
                    onClick={() => fileRef.current.click()}
                />
                <p className="text-sm self-center">
                    {imageError ? (
                        <span className="text-red-600">
                            Error uploading Image (file must be less than 2 MB)
                        </span>
                    ) : imagePercentage > 0 && imagePercentage < 100 ? (
                        <span className="text-blue-700">{`Uploading: ${imagePercentage}%`}</span>
                    ) : imagePercentage === 100 ? (
                        <span className="text-green-500">Image Upload Successfully</span>
                    ) : (
                        ""
                    )}
                </p>
                <input
                    className="bg-slate-100 rounded-lg p-3"
                    defaultValue={currentUser.username}
                    type="text"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                <input
                    className="bg-slate-100 rounded-lg p-3"
                    defaultValue={currentUser.email}
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    className="bg-slate-100 rounded-lg p-3"
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? "Loading..." : "Update"}
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-500 cursor-pointer" onClick={handleDeleteAccount}>
                    Delete Account
                </span>
                <span className="text-red-500 cursor-pointer" onClick={handleSignOut}>
                    Sign Out
                </span>
            </div>
            <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
            <p className="text-green-500 mt-5">{updateSuccess && "User updated successful!"}</p>
        </div>
    );
};

export default Profile;
