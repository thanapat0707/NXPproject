import { Component, OnInit } from '@angular/core';

import { CompleteComponent } from '../../modal/complete/complete.component';
import { LocationService } from '../../services/location.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationModalComponent } from './location-modal.component';
import { AppComponent } from '../../app.component';
import { AppController } from '../../app.controller';
import { ErrorComponent } from '../../modal/error/error.component';
import { PartlistModalComponent } from '../part/partlist/partlist-modal.component';

@Component( {
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: [ './location.component.scss' ]
} )
export class LocationComponent implements OnInit {

    private listOfLocation: any;

    private searchValue = '';
    private sortName: string | null = null;
    private sortValue: string | null = null;
    private listOfDisplayData: any;

    constructor( private locationService: LocationService,
                 private modalService: NgbModal,
                 private appComponent: AppComponent,
                 private appController: AppController ) {
    }

    ngOnInit() {
        this.getLocation();

        // this.appComponent.menuContent = [];
        this.appController.MenuButtons = null;
    }

    getLocation() {
        this.locationService.selectCellLocation().subscribe( data => {
            this.listOfLocation = data;
            this.listOfDisplayData = data;
            // console.log( 'location: ', data );
        } );
    }

    CallModal( sql, location = {} ) {
        let modalRef;
        // if ( sql === 'update' ) {
        //     modalRef = this.modalService.open( LocationModalComponent, { size: 'lg' } );
        // } else {
        modalRef = this.modalService.open( LocationModalComponent );
        // }
        modalRef.componentInstance.SQL = sql;
        modalRef.componentInstance.Location = location;
        modalRef.result.then( ( result ) => {
            if ( result ) {
                switch( sql ) {
                    case 'insert' :
                        this.locationService.insertLocation( result ).subscribe( () => {
                            this.ngOnInit();
                        } );
                        break;
                    case 'rack' :
                        this.locationService.insertRack( result ).subscribe( () => {
                            this.ngOnInit();
                        } );
                        break;
                    case 'update' :
                        this.locationService.updateLocation( result ).subscribe( () => {
                            this.ngOnInit();
                        } );
                        break;
                }
                this.modalService.open( CompleteComponent );
            } else {
                // console.log( 'ERROR!!!' );
            }
        } );
    }

    Update( id ) {
        // this.locationService.updateCell( [ id ] ).subscribe( () => {
        //     this.modalService.open( CompleteComponent );
        //     this.ngOnInit();
        // } );
    }

    Delete( id: string ) {
        this.locationService.deleteLocation( id ).subscribe( () => {
            this.modalService.open( CompleteComponent );
            this.ngOnInit();
        }, err => {
            const modalRef = this.modalService.open( ErrorComponent );
            modalRef.componentInstance.msg = err.error.message;
        } );
    }

    // --------------------------------------------------------------------------------

    search() {
        const filterFunc = ( item: { location_id: string; location_description: string; } ) => {
            return (
                item.location_id.indexOf( this.searchValue ) !== -1 &&
                item.location_description.indexOf( this.searchValue ) !== -1
            );
        };
        const data = this.listOfLocation.filter( ( item: { location_id: string; location_description: string; } ) => filterFunc( item ) );
        this.listOfDisplayData = data.sort( ( a, b ) =>
            this.sortValue === 'ascend'
                // tslint:disable-next-line:no-non-null-assertion
                ? a[ this.sortName! ] > b[ this.sortName! ]
                ? 1
                : -1
                // tslint:disable-next-line:no-non-null-assertion
                : b[ this.sortName! ] > a[ this.sortName! ]
                ? 1
                : -1
        );
    }

    reset(): void {
        this.searchValue = '';
        this.search();
    }
}
