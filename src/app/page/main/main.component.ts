import { Component, OnInit, ViewEncapsulation, Injectable, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConversionService } from '../../services/conversion.service';
import { AppController } from '../../app.controller';
import { ChangePartComponent } from './change-part.component';
import { ChangeCompleteComponent } from '../../modal/change-complete/change-complete.component';
import { PartdataService } from '../../services/partdata.service';
import { PartDataModalComponent } from '../part/part-data/part-data-modal.component';
import { CompleteComponent } from '../../modal/complete/complete.component';

@Component( {
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [ './main.component.scss' ],
} )
export class MainComponent implements OnInit, OnDestroy {

    private listOfConvert: any;
    private PartData = [];
    private check: any;

    private searchValue = '';
    private sortName: string | null = null;
    private sortValue: string | null = null;
    private listOfDisplayData: any;

    constructor(
        private modalService: NgbModal,
        private conversionService: ConversionService,
        private appController: AppController,
        private partdataService: PartdataService
    ) {
    }

    listOfParentData: any[] = [];
    listOfChildrenData: any[] = [];

    ngOnInit() {
        this.getConvert();
        this.CheckData();

        this.appController.MenuButtons = null;
    }

    // Initial data
    // Get Order [id, Packer, PackerGroup, ... ] from order table
    getConvert() {
        this.conversionService.selectConvert( true ).subscribe( data => {
            this.listOfConvert = data;
            this.listOfDisplayData = data;
            console.log( 'convert: ', data );
        } );
    }

    // ---------------------------------------------------------------------------------------------------\
    CheckData() {
        this.check = setInterval( () => {
            // this.getPartDataInPacker();
            console.log( 'check' );
        }, 10000 );
    }

    CheckLifeTime( status ) {
        if ( status === 'alright' ) {
            return 'status-alright';
        } else if ( status === 'almost' ) {
            return 'status-almost';
        } else {
            return 'status-alert';
        }
    }

    // For Convert table
    checkCounter( id ) {
        let color: string;
        const partlist = this.PartData.filter( data => data.convert_id === id );
        for ( const part of partlist ) {
            if ( part.counter_use >= part.counter_base ) {
                color = 'yellow';
            }
        }
        return color;
    }

    ngOnDestroy() {
        clearInterval( this.check );
    }

    CallPartDataModal( convertID, partdata ) {
        const modalRef = this.modalService.open( PartDataModalComponent );
        modalRef.componentInstance.SQL = 'update';
        modalRef.componentInstance.PartData = partdata;
        modalRef.componentInstance.ConvertID = convertID;

        modalRef.result.then( ( result ) => {
            if ( result ) {
                this.partdataService.updatePartdata( result ).subscribe( () => {
                    this.ngOnInit();
                    this.modalService.open( CompleteComponent );
                } );
            } else {
                this.ngOnInit();
            }
        }, ( error ) => {
        } );
        // console.log('convert: ', convertID, ' | partdata: ', partdata);
    }

    ChangePart( ConvertID, Partdata ) {
        const modalRef = this.modalService.open( ChangePartComponent, { size: 'lg' } );
        modalRef.componentInstance.PartID = Partdata.part_id;
        modalRef.componentInstance.PartdataID = Partdata.partdata_id;
        modalRef.result.then( ( data ) => {
            // console.log('data: ', data);
            if ( data ) {
                const OldPart = Partdata.partdata_id;
                const OldPartLocation = Partdata.location_id;
                const NewPart = data.partdata_id;
                const NewPartLocation = data.location_id;

                // Change at Convert Detail
                const changePartData = {
                    convert_id: ConvertID,
                    oldPart: OldPart,
                    newPart: NewPart,
                };
                // Change at Conversion
                const changeUser = {
                    convert_id: ConvertID,
                    user_id: data.user_id
                };
                let store;
                // Update at Partdata and display in ChangeComplete
                if ( !data.part_name.toLowerCase().indexOf( 'rubbertrip' ) ) {
                    console.log( 'RubberTrip!!!' );
                    store = { // Old part
                        partdata_id: OldPart,
                        // partdata_name: Partdata.partdata_name,
                        location_id: NewPartLocation,
                        status: 'store',
                    };
                    // this.locationService.updateCell( [ data.location_id, Partdata.location_id ] ).subscribe();
                } else {
                    store = { // Old part
                        partdata_id: OldPart,
                        // partdata_name: Partdata.partdata_name,
                        location_id: OldPartLocation,
                        status: 'store',
                    };
                }
                const packer = { // New part
                    partdata_id: NewPart,
                    part_name: data.part_name,
                    // location_id: data.location_id,
                };
                const switchLocation = {
                    oldPart: OldPart,
                    oldPartLocation: OldPartLocation,
                    newPart: NewPart,
                    newPartLocation: NewPartLocation,
                };
                // console.log( 'ChangeData: ', changePartData );
                // console.log( 'Data: ', data );
                this.conversionService.changePartConvert( changePartData ).subscribe(); // create & delete part in ConvertDetail
                this.partdataService.updatePartdataToStore( [ store ] ).subscribe(); // Update part to store
                this.partdataService.updatePartdataToPacker( [ packer ] ).subscribe(); // Update part to packer
                this.partdataService.switchPartLocation( switchLocation ).subscribe(); // Switch location of part
                this.conversionService.updateUserConvert( changeUser ).subscribe( () => { // Update user_id in Convert
                    const complete = this.modalService.open( ChangeCompleteComponent );
                    complete.componentInstance.Store = {
                        partdata_name: Partdata.partdata_name,
                        location_id: NewPartLocation,
                    };
                    this.ngOnInit();
                } );
            } else {
                // console.log( 'Cancel!!!' );
            }
        }, ( error ) => {
        } );
    }

    search() {
        // console.log('search: ', this.searchValue);
        // console.log('search: ', this.searchValue.toLowerCase());
        const filterFunc = ( item: { packer_id: string; sot_id: string; convert_id: string; } ) => {
            return (
                item.packer_id.toLowerCase().indexOf( this.searchValue.toLowerCase() ) !== -1 ||
                item.sot_id.toLowerCase().indexOf( this.searchValue.toLowerCase() ) !== -1 ||
                item.convert_id.toLowerCase().indexOf( this.searchValue.toLowerCase() ) !== -1
            );
        };

        const data = this.listOfConvert.filter( (
            item: { packer_id: string; sot_id: string; convert_id: string; } ) => filterFunc( item ) );
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

    ActivateAndStatus( click, status ) {
        if ( click ) {
            return 'click';
        } else {
            return this.CheckLifeTime( status );
        }
    }

}
