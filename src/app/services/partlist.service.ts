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
        // console.log( 'insert partlist: ', user );
        return this.http.post<IPartList[]>( this.PartlistURL, user );
    }

    deletePartlist( id: string ): Observable<IPartList[]> {
        // console.log( 'delete PartlistID: ', id );
        const url = `${this.PartlistURL}/${id}`;
        return this.http.delete<IPartList[]>( url );
    }

    insertPartlistDetail( partlistDetail: any ): Observable<IPartList[]> {
        // console.log( 'insert partlistDetail: ', partlistDetail );
        return this.http.post<IPartList[]>( this.PartlistDetailURL, partlistDetail );
    }

    deletePartlistDetail( partlistID: string, partID: string ): Observable<IPartList[]> {
        // console.log( 'delete PartlistID: ', partlistID, ' | PartID: ', partID );
        const url = `${this.PartlistDetailURL}/${partlistID}/${partID}`;
        return this.http.delete<IPartList[]>( url );
    }
}
