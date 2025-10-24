import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";


const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/dashboard");
        }
    }, []);

    const handleSignup = (e) => {
        e.preventDefault();

        // Basic validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Save user to localStorage (overwrite if already exists)
        const userData = {
            firstName,
            lastName,
            email,
            password,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        setError("");
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50">
            

            {/* Main Content */}
            <div className="flex flex-col justify-center w-full max-w-md px-6 py-10 mt-20">
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                    Sign-up to Start
                </h2>
                <p className="text-gray-500 mb-6">
                    Hey there, your chance to ease your work tracking is here. Signup and
                    start a new journey in the field.
                </p>

                <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                    <div className="flex gap-4">
                        <InputField
                            label="First Name"
                            required
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <InputField
                            label="Last Name"
                            required
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <InputField
                        label="Username / e-mail"
                        placeholder="Enter email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputField
                        label="Confirm Password"
                        type="password"
                        placeholder="Re-enter Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button text="Sign in" type="submit" />
                    {error && <p className="text-sm text-red-600 text-center mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
