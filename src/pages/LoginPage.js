import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
import axios from "axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        setErrors((prev) => ({...prev, [name]: ""}));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) {
            newErrors.username = "Username is required.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setErrors({});

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            console.log(process.env.REACT_APP_BACKEND_URL)
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/login`,
                new URLSearchParams({
                    username: formData.username,
                    password: formData.password,
                    grant_type: "password",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const {access_token} = response.data;
            localStorage.setItem("token", access_token);
            localStorage.setItem("username", formData.username);
            navigate("/");
        } catch (error) {
            if (error.response?.status === 401) {
                setErrorMessage("Incorrect username or password.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        error={errors.username}
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        error={errors.password}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default LoginPage;
