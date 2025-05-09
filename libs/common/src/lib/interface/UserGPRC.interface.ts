import { Observable } from "rxjs"

export interface UserGRPC {
    checkEmailexists(payload: object): Observable<any>;
    createUser(payload: any): Observable<any>;
    getProfile(ID: object): Observable<any>;
}