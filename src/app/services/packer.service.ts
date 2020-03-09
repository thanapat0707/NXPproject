import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPacker, ISOT } from '../app.interface';
import { HttpClient } from '@angular/common/http';
import { PORT } from '../app.constant';

@Injectable( {
    providedIn: 'root'
} )
export class PackerService {

    private PackerURL = PORT + 'api/packer';

    constructor( private http: HttpClient ) {
    }

    selectPacker(): Observable<IPacker[]> {
        return this.http.get<IPacker[]>( this.PackerURL );
    }

    selectPackerID(): Observable<IPacker[]> {
        // console.log( 'ID Work');
        const url = `${this.PackerURL}/id`;
        return this.http.get<IPacker[]>( url );
    }

    insertPacker( packer: any ): Observable<IPacker[]> {
        // console.log( 'insert packer: ', packer );
        return this.http.post<IPacker[]>( this.PackerURL, packer );
    }

    updatePacker( packer: any ): Observable<IPacker[]> {
        return this.http.put<IPacker[]>( this.PackerURL, packer );
    }

    deletePacker( id: string ): Observable<IPacker[]> {
        // console.log( 'delete sotID: ', id );
        const url = `${this.PackerURL}/${id}`;
        return this.http.delete<IPacker[]>( url );
    }
}
