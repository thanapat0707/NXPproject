import { Injectable } from '@angular/core';
import { PORT } from '../app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConvert, IConvertDetail, IPacker } from '../app.interface';

@Injectable( {
    providedIn: 'root'
} )
export class ConversionService {

    private ConvertURL = PORT + 'api/convert';
    private ConvertDetailURL = PORT + 'api/convert-detail';

    constructor( private http: HttpClient ) {
    }

    selectConvert( working: boolean ): Observable<IConvert[]> {
        const url = `${this.ConvertURL}/convert/${working}`;
        return this.http.get<IConvert[]>( url );
    }

    // selectConvertFromPacker( packer: string ): Observable<IConvert[]> {
    //     const url = `${this.ConvertURL}/${packer}`;
    //     return this.http.get<IConvert[]>( url );
    // }

    selectConvertID(): Observable<IConvert[]> {
        const url = `${this.ConvertURL}/id`;
        return this.http.get<IConvert[]>( url );
    }

    selectConvertByPackerID( id: string, status: string ): Observable<IConvert[]> {
        const url = `${this.ConvertURL}/packer/${id}/status/${status}`;
        return this.http.get<IConvert[]>( url );
    }

    selectConvertDetail(): Observable<IConvertDetail[]> {
        return this.http.get<IConvertDetail[]>( this.ConvertDetailURL );
    }

    selectConvertDetailByID( id: string ): Observable<IConvertDetail[]> {
        const url = `${this.ConvertDetailURL}/${id}`;
        return this.http.get<IConvertDetail[]>( url );
    }

    insertConvert( convert: any ): Observable<IConvert[]> {
        // console.log( 'convert in service: ', convert );
        return this.http.post<IConvert[]>( this.ConvertURL, convert );
    }

    updateConvert( id: string ): Observable<IConvert[]> {
        const url = `${this.ConvertURL}/working/${id}`;
        return this.http.put<IConvert[]>( url, {} );
    }

    updateUserConvert( data: any ): Observable<IConvert[]> {
        // console.log( 'userID: ', data );
        const url = `${this.ConvertURL}/user`;
        return this.http.put<IConvert[]>( url, data );
    }

    deleteConvert( id: string ): Observable<IConvert[]> {
        // console.log( 'delete ConvertID: ', id );
        const url = `${this.ConvertURL}/${id}`;
        return this.http.delete<IConvert[]>( url );
    }

    deleteConvertDetail( data: any ): Observable<IConvert[]> {
        const url = `${this.ConvertDetailURL}/convert/${data.convert_id}/partdata/${data.partdata}`;
        return this.http.delete<IConvert[]>( url );
    }

    changePartConvert( data: any ): Observable<IConvert[]> {
        const url = `${this.ConvertDetailURL}/change`;
        return this.http.put<IConvert[]>( url, data );
    }
}
