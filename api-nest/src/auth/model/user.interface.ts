export interface User {
    id: number;
    email: string;
    password: string; // Senha com hash
    name: string;
}