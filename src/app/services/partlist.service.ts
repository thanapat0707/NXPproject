import { Injectable } from '@angular/core';
import { PORT } from '../app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPartList, IUser } from '../app.interface';

@Injectable( {
    providedIn: 'root'
} )
export class PartlistService {

    private PartlistURL = PORT + 'api/partlist';
    private PartlistDetailURL = PORT + 'api/partlist-detail';

    constructor( private http: HttpClient ) {
    }

    selectPartlist(): Observable<IPartList[]> {
        return this.http.get<IPartList[]>( this.PartlistURL );
    }

    selectPartlistWithPacker(id: string): Observable<IPartList[]> {
        const url = `${this.PartlistURL}/packer/${id}`;
        return this.http.get<IPartList[]>( url );
    }


    insertPartlist( user: any ): Observable<IPartList[]> {
        return this.http.post<IPartList[]>( this.PartlistURL, user );
    }

    deletePartlist( id: string ): Observable<IPartList[]> {
        const url = `${this.PartlistURL}/${id}`;
        return this.http.delete<IPartList[]>( url );
    }

    insertPartlistDetail( partlistDetail: any ): Observable<IPartList[]> {
        return this.http.post<IPartList[]>( this.PartlistDetailURL, partlistDetail );
    }

    deletePartlistDetail( partlistID: string, partID: string ): Observable<IPartList[]> {
        const url = `${this.PartlistDetailURL}/${partlistID}/${partID}`;
        return this.http.delete<IPartList[]>( url );
    }
}
