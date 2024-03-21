import { useSelector } from "react-redux";

const Profile = () => {
    const { currentUser } = useSelector((store) => store.user);
    console.log(currentUser);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                <img
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                    src={currentUser.profilePicture}
                    alt="Profile Photo"
                />
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
