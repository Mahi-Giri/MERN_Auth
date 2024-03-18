import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({});

    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const response = await fetch("/api/v1/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setLoading(false);
            if (data.success === false) {
                setError(true);
                return;
            }
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                <input
                    className="bg-slate-100 p-3 rounded-lg"
                    type="text"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                <input
                    className="bg-slate-100 p-3 rounded-lg"
                    type="email"
                    name=""
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    className="bg-slate-100 p-3 rounded-lg"
                    type="password"
                    name=""
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? "Loading..." : "Sign Up"}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account? </p>
                <Link to="/sign-in">
                    <span className="text-blue-500">Sign in</span>
                </Link>
            </div>
            <p className="text-red-600 mt-5">{error && "Something went wrong!"}</p>
        </div>
    );
};

export default Signup;
