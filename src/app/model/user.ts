import { UserRole } from "./enums/user_role";

export class User{
    private id: number
    private login: string;
    private fullName: string;
    private email: string;
    private role: UserRole;

    // constructor(    login: string, fullName: string, email: string, role: UserRole){
    //         this.login = login;
    //         this.fullName = fullName;
    //         this.email = email;
    //         this.role = role;
    // }

    constructor( id: number,login: string, fullName: string, email: string, role: UserRole){
        this.id = id
        this.login = login;
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
}
