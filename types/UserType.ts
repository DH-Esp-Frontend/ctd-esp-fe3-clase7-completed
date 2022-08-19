type UserType = {
    email: string;
    picture: {
        medium: string;
    };
    name: {
        first: string;
        last: string;
    };
    login: {
        username: string;
    };
};

export default UserType;