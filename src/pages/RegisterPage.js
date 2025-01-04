import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
import axios from "axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        full_name: "",
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required.";
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, formData);
            setSuccessMessage("Registration successful! Redirecting to home...");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            if (error.response?.status === 409) {
                setErrors({ username: "Username is already taken." });
            } else if (error.response?.status === 422) {
                setErrors({ form: "Validation error. Please check your inputs." });
            } else {
                setErrors({ form: "An unexpected error occurred. Please try again." });
            }
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
                <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                        placeholder="Enter your username"
                        required
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Enter your password"
                        required
                    />
                    <InputField
                        label="Full Name (Optional)"
                        name="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                    />
                    {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default RegisterPage;
