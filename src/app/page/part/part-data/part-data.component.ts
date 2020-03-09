import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompleteComponent } from '../../../modal/complete/complete.component';
import { PartdataService } from '../../../services/partdata.service';
import { PartDataModalComponent } from './part-data-modal.component';
import { ErrorComponent } from '../../../modal/error/error.component';
import { LocationService } from '../../../services/location.service';
import { ConfirmComponent } from '../../../modal/confirm/confirm.component';
import { PartService } from '../../../services/part.service';

@Component( {
    selector: 'app-part-data',
    templateUrl: './part-data.component.html',
    styleUrls: [ './part-data.component.scss' ]
} )
export class PartDataComponent implements OnInit, OnDestroy {

    private listOfPartData: any;
    private listOfPart = [];
    // private search: string;

    private searchValue = '';
    private sortName: string | null = null;
    private sortValue: string | null = null;
    private listOfSearchData: string[] = [];
    private listOfDisplayData: any;

    constructor( private partdataService: PartdataService,
                 private partService: PartService,
                 private locationService: LocationService,
                 private modalService: NgbModal, ) {
    }

    ngOnInit() {
        this.getPartdata();
        this.getPart();
        // console.log( 'WORK');
    }

    getPart() {
        this.partService.selectPart().subscribe( data => {
            // console.log( 'part: ', data );
            for ( const part of data ) {
                this.listOfPart.push( { text: part.part_name, value: part.part_id } );
            }
            // console.log( 'part: ', this.listOfPart );
        } );
    }

    getPartdata() {
        this.partdataService.selectPartdata().subscribe( data => {
            this.listOfPartData = data;
            this.listOfDisplayData = data;
            // console.log( 'partdata: ', this.listOfPartData );
        } );
    }

    CallModal( sql, partdata = {} ) {
        const modalRef = this.modalService.open( PartDataModalComponent );
        modalRef.componentInstance.SQL = sql;
        modalRef.componentInstance.PartData = partdata;

        modalRef.result.then( ( result ) => {
            if ( result ) {
                // const Partdata = {
                //     partdata_id: result.partdata_id,
                //     part_id: result.part_id,
                //     location_id: result.location_id,
                //     create_date: result,
                // };
                // const PartdataLifeTime = {
                //     partdata_id: result.partdata_id,
                //     time_base: result.time_base,
                //     counter_base: result.counter_base,
                // };
                switch ( sql ) {
                    case 'insert' :
                        // this.partdataService.insertPartdata( Partdata ).subscribe();
                        // this.partdataService.insertPartdataLifeTime( PartdataLifeTime ).subscribe( () => {
                        //     this.ngOnInit();
                        // } );
                        // this.locationService.updateCell( [ result.location_id, ] ).subscribe();
                        this.partdataService.insertPartdata( result ).subscribe( () => {
                            this.ngOnInit();
                        } );
                        break;
                    case 'update' :
                        this.partdataService.updatePartdata( result ).subscribe( () => {
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

    Delete( partdata ) {
        if ( partdata.status === 'packer' ) {
            const modalRef = this.modalService.open( ErrorComponent );
            modalRef.componentInstance.msg = 'CANNOT delete Part in Packer.';
        } else {
            const modalRef = this.modalService.open( ConfirmComponent );
            modalRef.result.then( ( result ) => {
                if ( result ) {
                    // this.locationService.updateCell( [ partdata.location_id ] ).subscribe();
                    this.partdataService.deletePartdata( partdata.partdata_id ).subscribe( () => {
                        this.ngOnInit();
                        this.modalService.open( CompleteComponent );
                    } );
                }
            } );
        }
    }

    // Search() {
    //     const result = this.PartData.filter( data => data.partdata_id.toLowerCase().includes( this.search.toLowerCase() ) );
    //     // console.log( 'search: ', this.search, ' => ', result );
    //     this.PartData = result;
    // }

    CheckLifeTime( status ) {
        if ( status === 'alright' ) {
            return 'status-alright';
        } else if ( status === 'almost' ) {
            return 'status-almost';
        } else {
            return 'status-alert';
        }
    }


    // reset(): void {
    //     this.searchValue = '';
    //     this.search();
    // }

    search() {
        const filterFunc = ( item: { partdata_name: string; part_id: number; Part: any } ) => {
            return (
                (this.listOfSearchData.length ? this.listOfSearchData.some( part => item.part_id === Number(part) ) : true)
                && item.Part.part_name.toLowerCase().indexOf( this.searchValue.toLowerCase() ) !== -1
            );
        };
        const data = this.listOfPartData.filter( ( item: { partdata_name: string; part_id: number; Part: any } ) => filterFunc( item ) );
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

    // filter( listOfSearchData: string[] ) {
    //     this.listOfSearchData = listOfSearchData;
    //     this.search();
    // }

    sort( sort: { key: string; value: string } ): void {
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.search();
    }

    reset(): void {
        this.searchValue = '';
        this.search();
    }


    ngOnDestroy() {
    }


}
