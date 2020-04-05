import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { PartdataService } from '../../../services/partdata.service';
import { ConversionService } from '../../../services/conversion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompleteComponent } from '../../../modal/complete/complete.component';
import { AppController } from '../../../app.controller';
import { PackerService } from '../../../services/packer.service';
import { IPartData } from '../../../app.interface';
import { ErrorComponent } from '../../../modal/error/error.component';
import { KitConfirmComponent } from '../../../modal/kit-confirm/kit-confirm.component';

@Component( {
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: [ './store.component.scss' ]
} )
export class StoreComponent implements OnInit {

    private opened = true;

    public ConvertPackergroup: any;
    private ConvertPackerid: any;

    private packerChoose = '';
    private packergroupChoose = '';
    private packeridChoose = '';

    private Location = [];

    private ConvertChoose: any;
    private locationChoose: any;
    private listOfLocation: any;
    // private listOfConvertID: any;
    private listOfConvert = [];

    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    listOfDisplayData: IPartData[] = [];
    listOfAllData: IPartData[] = [];
    // mapOfCheckedId: { [key: string]: boolean } = {};
    // mapOfCheckedId: any;

    mapOfCheckedId: { [ key: string ]: boolean } = {};


    constructor(
        private partdataService: PartdataService,
        private locationService: LocationService,
        private convertService: ConversionService,
        private modalService: NgbModal,
        private appController: AppController,
        private packerService: PackerService,
    ) {
    }

    ngOnInit() {

        this.ConvertChoose = null;
        this.getLocation();
        this.getConvert();

        // this.appController.MenuButtons = null;
        this.appController.MenuActive = 'STORE';

        // console.log( 'Store' );
    }

    currentPageDataChange( $event: IPartData[] ) {
        this.listOfDisplayData = $event;
        this.refreshStatus();
    }

    refreshStatus() {
        this.isAllDisplayDataChecked = this.listOfDisplayData.every( data => this.mapOfCheckedId[ data.partdata_id ] );
        this.isIndeterminate = this.listOfDisplayData.some( data => this.mapOfCheckedId[ data.partdata_id ] )
            && !this.isAllDisplayDataChecked;

        // console.log( 'data: ', this.mapOfCheckedId );
    }

    checkAll( value: boolean ) {
        this.listOfDisplayData.forEach( data => (this.mapOfCheckedId[ data.partdata_id ] = value) );
        // console.log( 'listOfDisplayData: ', this.listOfDisplayData );
        // console.log( 'CheckAll' );
        this.refreshStatus();
    }

    // Start List DropDown
    // Get All data from kit table ----------------------------------------------------------------------
    // Develop use
    getConvert() {
        this.convertService.selectConvert( false ).subscribe( data => {
            // this.listOfConvert = this.listOfConvert.concat( data );
            this.listOfConvert = data;
            // console.log( 'data1: ', data );

            this.ConvertPackergroup = this.listOfConvert;
            this.ConvertPackerid = this.listOfConvert;
        } );
        // this.convertService.selectConvert( true ).subscribe( data => {
        //     this.listOfConvert = this.listOfConvert.concat( data );
        //     // console.log( 'data2: ', data );
        //     this.ConvertPackergroup = this.listOfConvert;
        //     this.ConvertPackerid = this.listOfConvert;
        //     // console.log( 'list: ', this.listOfConvert );
        // } );
    }

    // getPacker() {
    //     this.packerService.selectPacker().subscribe( data => {
    //         this.listOfPacker = dataConvertChoose;
    //         this.packergroup = data;
    //         this.packerid = data;
    //     } );
    // }

    // Get list of packer group filter with packerChoose
    getPackerGroup() {
        // console.log( 'packerChoose: ', this.packerChoose );
        if ( !this.packerChoose ) {
            this.ConvertPackergroup = this.listOfConvert;
            this.ConvertPackerid = this.listOfConvert;
        } else {
            this.ConvertPackergroup = this.listOfConvert.filter( article => article.Packer.packer_type === this.packerChoose );
            this.ConvertPackerid = this.listOfConvert.filter( article => article.Packer.packer_type === this.packerChoose );
        }
    }

    // Get list of packerID filter with packergroupChoose
    getPackerID() {
        // console.log( 'packergroupChoose: ', this.packergroupChoose );
        if ( !this.packergroupChoose ) {
            this.ConvertPackerid = this.listOfConvert;
        } else {
            this.ConvertPackerid = this.listOfConvert.filter( article => article.Packer.packer_group === this.packergroupChoose );
        }
    }

    // // ---------------------------------------------------------------------------------------------------


    getLocation() {
        // this.locationService.selectLocationID().subscribe( data => this.listOfLocation = data );
        this.locationService.selectEmptyLocation().subscribe( data => this.listOfLocation = data );
    }

    // getConvertID() {
    //     this.convertService.selectConvert( false ).subscribe( data => this.listOfConvertID = data );
    // }

    getConvertDetail() {
        if ( this.packeridChoose ) {
            this.Location = [];
            // console.log('packerIDChoose: ', this.packeridChoose);
            this.convertService.selectConvertByPackerID( this.packeridChoose, 'false' ).subscribe( data => {
                this.ConvertChoose = data;
                // console.log( 'convert detail: ', data );
                // this.location = this.listOfLocation.slice( 0, data.length );
                // for ( let index = 0; index < this.ConvertChoose.ConvertDetail.length; index++ ) {
                // console.log('data: ', this.ConvertChoose.ConvertDetail );
                for ( const part of this.ConvertChoose.ConvertDetail ) {
                    // console.log( 'part location: ', part );
                    if ( !part.Partdata.Part.part_name.toLowerCase().indexOf( 'rubbertrip' ) ) {
                        console.log( 'RubberTrip!!!' );
                        for ( const location of this.listOfLocation ) {
                            if ( location.location_description ) {
                                if ( !location.location_description.toLowerCase().indexOf( 'rubbertrip' ) ) {
                                    this.Location.push( {
                                        part_name: part.Partdata.Part.part_name,
                                        location: location.location_id,
                                    } );
                                    break;
                                }
                            }
                        }
                    } else {
                        this.Location.push( {
                            part_name: part.Partdata.Part.part_name,
                            location: part.Partdata.location_id
                        } );
                    }

                    this.mapOfCheckedId[ part.Partdata.partdata_id ] = true;
                }
                // console.log( 'All location: ', this.Location );
            } );
        } else {
            const modalRef = this.modalService.open( ErrorComponent );
            modalRef.componentInstance.msg = 'Please select packerID.';
        }
    }

    openSubmitModal() {
        const modalRef = this.modalService.open( KitConfirmComponent, { backdrop: 'static' } );
        modalRef.result.then( ( result ) => {
            if ( result ) {
                this.StorePart( result );
            } else {
                // console.log( 'ERROR!!!' );
            }
        } );
    }

    StorePart( user ) { // เผื่อว่าจะบันทึกว่าใครเป็นคน store
        // console.log( 'location: ', this.Location );
        // console.log( 'mapOfCheckedId: ', this.mapOfCheckedId );
        const keys = Object.keys( this.mapOfCheckedId );
        const data = [];
        const location = [];
        // for ( let index = 0; index < this.ConvertChoose.ConvertDetail.length; index++ ) {
        // for ( const part of  this.ConvertChoose.ConvertDetail) {
        for ( let index = 0; index < keys.length; index++ ) {
            // console.log( 'mapOfCheckedId', index, ': ', this.mapOfCheckedId[ index ] );
            // console.log( 'index: ', keys[index] );
            if ( this.mapOfCheckedId[ keys[ index ] ] ) {
                // console.log('Have data');
                data.push( {
                    // partdata_id: this.ConvertChoose.ConvertDetail[ index ].Partdata.partdata_id,
                    partdata_id: keys[ index ],
                    location_id: this.Location[ index ].location,
                    status: 'store',
                    // user_id: user,
                } );
            } else {
                data.push( {
                    partdata_id: keys[ index ],
                    location_id: this.Location[ index ].location,
                    status: 'lost',
                    // user_id: user,
                } );
            }

            if ( !this.Location[ index ].part_name.toLowerCase().indexOf( 'rubbertrip' ) ) {
                // console.log( 'RubberTrip!!!');
                location.push( this.Location[ index ].location );
            }
        }
        this.locationService.updateCell( location ).subscribe();
        // console.log( 'rubber: ', location );
        this.partdataService.updatePartdataToStore( data ).subscribe();
        this.convertService.deleteConvert( this.ConvertChoose.convert_id ).subscribe( () => {
            this.ngOnInit();
        } );
        this.modalService.open( CompleteComponent );
    }

    open() {
        this.opened = !this.opened;
    }
}
