import { Injectable } from '@angular/core';
import { PORT } from '../app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPart, IUser } from '../app.interface';

@Injectable( {
    providedIn: 'root'
} )
export class PartService {

    private PartURL = PORT + 'api/part';

    constructor( private http: HttpClient ) {
    }

    selectPart(): Observable<IPart[]> {
        return this.http.get<IPart[]>( this.PartURL );
    }

    selectPartName(): Observable<IPart[]> {
        const url = `${this.PartURL}/id`;
        return this.http.get<IPart[]>( url );
    }

    insertPart( part: any ): Observable<IPart[]> {
        return this.http.post<IPart[]>( this.PartURL, part );
    }

    updatePart( part: any ): Observable<IPart[]> {
        return this.http.put<IPart[]>( this.PartURL, part );
    }

    deletePart( id: string ): Observable<IPart[]> {
        const url = `${this.PartURL}/${id}`;
        return this.http.delete<IPart[]>( url );
    }
}
