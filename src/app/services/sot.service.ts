import { Injectable } from '@angular/core';
import { PORT } from '../app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPacker, ISOT, IUser } from '../app.interface';

@Injectable( {
    providedIn: 'root'
} )
export class SotService {

    private SOTURL = PORT + 'api/sot';

    constructor( private http: HttpClient ) {
    }

    selectSOT(): Observable<ISOT[]> {
        return this.http.get<ISOT[]>( this.SOTURL );
    }

    selectSOTID(): Observable<ISOT[]> {
        const url = `${this.SOTURL}/id`;
        return this.http.get<ISOT[]>( url );
    }

    insertSOT( sot: any ): Observable<ISOT[]> {
        return this.http.post<ISOT[]>( this.SOTURL, sot );
    }

    updateSOT( sot: any ): Observable<ISOT[]> {
        return this.http.put<ISOT[]>( this.SOTURL, sot );
    }

    deleteSOT( id: string ): Observable<ISOT[]> {
        const url = `${this.SOTURL}/${id}`;
        return this.http.delete<ISOT[]>( url );
    }
}
