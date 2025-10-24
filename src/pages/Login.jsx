import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // ✅ Check if already logged in
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (email.trim() == "" || password.trim() == "") {
            setError("Please fill in all fields.");
            return;
        }

        // Fake user validation — you can replace this later with an API call
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            setError("No user found, Please Sign Up");
        } else if (storedUser.email === email && storedUser.password === password) {
            navigate("/dashboard");
        } else {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50">
            

            {/* Main Content */}
            <div className="flex flex-col justify-center w-full max-w-md px-6 py-10 mt-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                    Welcome back
                </h2>
                <p className="text-gray-500 mb-6">login and start your work today.</p>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <InputField
                        label="Username / e-mail"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />


                    <div className="text-right">
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot password
                        </a>
                    </div>

                    <Button text="Sign in" type="submit" />
                    {error && <p className="text-sm text-red-600 text-center mt-2">{error}</p>}
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-medium">
                        Sign-up
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;
