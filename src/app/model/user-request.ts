import { UserRole } from "./enums/user_role";

export class UserRequest{
    private login: string;
    private password: string;
    private fullName: string;
    private email: string;
    private role: UserRole;

    constructor(login: string, password: string, fullName: string, email: string, role: UserRole){
            this.login = login;
            this.password = password
            this.fullName = fullName;
            this.email = email;
            this.role = role;
    }
    getLogin():string{
        return this.login;
    }
    setLogin(login: string){
        this.login = login;
    }
    getLPassword():string{
        return this.password;
    }
    setLPassword(password: string){
        this.password = password;
    }
    getFullName(): string {
        return this.fullName;
    }
    setFullName(fullName: string): void {
        this.fullName = fullName;
    }
    getEmail(): string {
        return this.email;
    }
    setEmail(email: string): void {
        this.email = email;
    }
    getRole(): UserRole {
        return this.role;
    }
    setRole(role: UserRole): void {
        this.role = role;
    }

    toJSON() {
        return {
            login: this.login,
            password: this.password,
            full_name: this.fullName, 
            email: this.email,
            role: this.role
        };
    }
}