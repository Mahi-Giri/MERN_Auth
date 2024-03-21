import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
    const { currentUser } = useSelector((store) => store.user);

    const fileRef = useRef(null);

    const [image, setImage] = useState(undefined);

    const [imagePercentage, setImagePercentage] = useState(0);

    const [imageError, setImageError] = useState(false);

    const [formData, setFormData] = useState({});

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
                // console.log("Upload is " + progress + "% done");
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

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <img
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                    src={currentUser.profilePicture}
                    alt="Profile Photo"
                    onClick={() => fileRef.current.click()}
                />
                <p className="text-sm self-center">
                    {imageError ? (
                        <span className="text-red-600">Error uploading Image (file must be less than 2 MB)</span>
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
                />
                <input
                    className="bg-slate-100 rounded-lg p-3"
                    defaultValue={currentUser.email}
                    type="email"
                    id="email"
                    placeholder="Email"
                />
                <input className="bg-slate-100 rounded-lg p-3" type="password" id="password" placeholder="Password" />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-500 cursor-pointer">Delete Account</span>
                <span className="text-red-500 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
};

export default Profile;
