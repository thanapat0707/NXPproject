import { Injectable } from '@angular/core';
import { PORT } from '../app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPartData } from '../app.interface';

@Injectable( {
    providedIn: 'root'
} )
export class PartdataService {

    private PartdataURL = PORT + 'api/partdata';
    private PartdataLifeTimeURL = PORT + 'api/partdata-lifetime';
    private startCounting = PORT + 'api/partdata-lifetime/start-counter';
    private stopCounting = PORT + 'api/partdata-lifetime/stop-counter';

    constructor( private http: HttpClient ) {
    }

    selectPartdata(): Observable<IPartData[]> {
        return this.http.get<IPartData[]>( this.PartdataURL );
    }

    selectPartdataID(): Observable<IPartData[]> {
        const url = `${this.PartdataURL}/id`;
        return this.http.get<IPartData[]>( url );
    }

    selectPartdataFromPartID(partID): Observable<IPartData[]> {
        const url = `${this.PartdataURL}/partID/${partID}`;
        return this.http.get<IPartData[]>( url );
    }

    selectAlertPM(): Observable<IPartData[]> {
        const url = `${this.PartdataLifeTimeURL}/PM`;
        return this.http.get<IPartData[]>( url );
    }

    updatePartdata( data: any ) {
        return this.http.put( this.PartdataURL, data );
    }

    updatePartdataToPacker( data: any ) {
        const url = `${this.PartdataURL}/packer`;
        return this.http.put( url, data );
    }

    updatePartdataToStore( data: any ) {
        const url = `${this.PartdataURL}/store`;
        return this.http.put( url, data );
    }

    switchPartLocation( data: any ) {
        const url = `${this.PartdataURL}/switch`;
        return this.http.put( url, data );
    }

    insertPartdata( data: any ) {
        return this.http.post( this.PartdataURL, data );
    }

    PM( data: any ) {
        const url = `${this.PartdataLifeTimeURL}/PM`;
        return this.http.put( url, data );
    }

    deletePartdata( id: string ) {
        const url = `${this.PartdataURL}/${id}`;
        return this.http.delete( url );
    }

    startCounter() {
        return this.http.get( this.startCounting );
    }

    stopCounter() {
        return this.http.get( this.stopCounting );
    }
}
