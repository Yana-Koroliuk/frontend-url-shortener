const Paths = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    URLS: "/urls",
    URL_DETAILS: (id = ":id") => `/urls/${id}`,
    CREATE: "/create",
    UNAUTHORIZED: "/unauthorized",
};

export default Paths;
