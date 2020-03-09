import { Injectable } from '@angular/core';
import { PORT } from '../app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../app.interface';

@Injectable( {
    providedIn: 'root'
} )
export class UserService {

    private UserURL = PORT + 'api/user';

    constructor( private http: HttpClient ) {
    }

    selectUser(): Observable<IUser[]> {
        return this.http.get<IUser[]>( this.UserURL );
    }

    selectUserID(): Observable<IUser[]> {
        const url = `${this.UserURL}/id`;
        return this.http.get<IUser[]>( url );
    }

    insertUser( user: any ): Observable<IUser[]> {
        // console.log( 'insert user: ', user );
        return this.http.post<IUser[]>( this.UserURL, user );
    }

    updateUser( user: any ): Observable<IUser[]> {
        // console.log( 'update user: ', user );
        return this.http.put<IUser[]>( this.UserURL, user );
    }

    deleteUser( id: string ): Observable<IUser[]> {
        // console.log( 'delete userID: ', id );
        const url = `${this.UserURL}/${id}`;
        return this.http.delete<IUser[]>( url );
    }
}
