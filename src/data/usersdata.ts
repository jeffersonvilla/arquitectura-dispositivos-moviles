type User = {
    id: string;
    username: string;
    password: string;
    email: string;
    role: string;
    token: string;
}

export const usersDataSource: User[] = [{id: "1", username: "admin", email: "admin@correo", 
    password: "$2a$10$FzHHR9aVCQk6lpI9ibA5POYmexzSvmDShPeEVJZsPDNlHFm0HjczK", 
    role: 'admin', token: ''}];