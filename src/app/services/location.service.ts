import { Injectable } from '@angular/core';
import { PORT } from '../app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILocation, IPacker, IPartList } from '../app.interface';

@Injectable( {
    providedIn: 'root'
} )
export class LocationService {

    private LocationURL = PORT + 'api/location';
    private LocationMappingURL = PORT + 'api/location-mapping';

    constructor( private http: HttpClient ) {
    }

    selectAllLocationID(): Observable<ILocation[]> {
        const url = `${this.LocationURL}/locationAll`;
        return this.http.get<ILocation[]>( url );
    }

    selectEmptyLocation(): Observable<ILocation[]> {
        const url = `${this.LocationURL}/empty`;
        return this.http.get<ILocation[]>( url );
    }

    selectRackLocation(): Observable<ILocation[]> {
        const url = `${this.LocationURL}/rack`;
        return this.http.get<ILocation[]>( url );
    }

    selectCellLocation(): Observable<ILocation[]> {
        const url = `${this.LocationURL}/cell`;
        return this.http.get<ILocation[]>( url );
    }

    selectLocationID(): Observable<ILocation[]> {
        const url = `${this.LocationURL}/locationID`;
        return this.http.get<ILocation[]>( url );
    }

    selectRackID(): Observable<ILocation[]> {
        const url = `${this.LocationURL}/rackID`;
        return this.http.get<ILocation[]>( url );
    }

    insertLocation(data: any): Observable<ILocation[]> {
        return this.http.post<ILocation[]>( this.LocationURL, data );
    }

    insertRack(data: any): Observable<ILocation[]> {
        const url = `${this.LocationURL}/rack`;
        return this.http.post<ILocation[]>( url, data );
    }

    createRack(data: any): Observable<ILocation[]> {
        const url = `${this.LocationURL}/rack`;
        return this.http.post<ILocation[]>( url, data );
    }

    updateLocation( data: any ) {
        return this.http.put( this.LocationURL, data );
    }

    updateCell( data: any ) {
        const url = `${this.LocationURL}/cell`;
        // console.log('update: ', data);
        return this.http.put( url, data );
    }

    deleteLocation( id: string ): Observable<ILocation[]> {
        // console.log( 'delete Location: ', id );
        const url = `${this.LocationURL}/${id}`;
        return this.http.delete<ILocation[]>( url );
    }

    insertLocationMapping( locationMapping: any ): Observable<IPartList[]> {
        // console.log( 'insert partlistDetail: ', partlistDetail );
        return this.http.post<IPartList[]>( this.LocationMappingURL, locationMapping );
    }

    deleteLocationMapping( locationID: string, partID: string ): Observable<IPartList[]> {
        // console.log( 'delete PartlistID: ', partlistID, ' | PartID: ', partID );
        const url = `${this.LocationMappingURL}/${locationID}/${partID}`;
        return this.http.delete<IPartList[]>( url );
    }
}
