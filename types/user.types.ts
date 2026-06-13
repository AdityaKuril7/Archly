export interface RegisterUserSchema {
    username: string;
    email: string;
    password: string;
}

export interface UserTypes {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    gender: string;
    role: string;
    slug: string;
}

export interface LoginUserSchema {
    email: string;
    password: string;
}
