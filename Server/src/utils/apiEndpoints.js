const authAPI = {
    LOGIN: '/login',
    LOGOUT: '/logout',
};

const userAPI = {
    CREATE: '/create',
    ALL: '/get-all',
    USER_BY_ID: '/user/:id',
    DETAIL: '/dashboard-data',
    GET_LATEST: '/get-latest',
}

module.exports = {
    authAPI,
    userAPI,
};