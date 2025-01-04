const userService = {
    saveUserInfo: (token, username, fullName = "") => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        if (fullName) {
            localStorage.setItem("full_name", fullName);
        }
    },

    getUserInfo: () => {
        return {
            token: localStorage.getItem("token"),
            username: localStorage.getItem("username"),
            full_name: localStorage.getItem("full_name") || null,
        };
    },

    clearUserInfo: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("full_name");
    },
};

export default userService;
