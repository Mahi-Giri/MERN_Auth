import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4 ">
                <input className="bg-slate-100 p-3 rounded-lg" type="text" id="username" placeholder="Username" />
                <input className="bg-slate-100 p-3 rounded-lg" type="email" name="" id="email" placeholder="Email" />
                <input className="bg-slate-100 p-3 rounded-lg" type="password" name="" id="password" placeholder="Password" />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    Sign Up
                </button>
            </form>
            <div className="flex gap-2 mt-2">
                <p>Have an account? </p>
                <Link to="/sign-in">
                    <span className="text-blue-500">Sign in</span>
                </Link>
            </div>
        </div>
    );
};

export default Signup;
