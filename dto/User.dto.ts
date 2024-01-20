export interface CreateUserInput{
    email: string;
    name: string;
    password: string;
    address:  string;
}

export interface UserLoginInput{
    email: string;
    password:  string;
}
export interface UserPayload{
    _id: string;
    email: string;
    name: string;
}

export interface UserSignupInput{
    name: string;
    email: string;
    password : string;
    phone: string;
    address: string;
}

export interface UserProfileEdit{
    name: string;
    password:  string;
    phone:  string;
    address: string;
}