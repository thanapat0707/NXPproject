import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartdataService } from '../../../services/partdata.service';
import { PartService } from '../../../services/part.service';
import { LocationService } from '../../../services/location.service';
import { KitConfirmComponent } from '../../../modal/kit-confirm/kit-confirm.component';
import { CompleteComponent } from '../../../modal/complete/complete.component';

@Component( {
    selector: 'app-part-data-modal',
    templateUrl: './part-data-modal.component.html',
    styleUrls: [ './part-data.component.scss' ]
} )
export class PartDataModalComponent implements OnInit {

    @Input() public SQL;
    @Input() public PartData;

    private alert = false;

    private listOfPart: any;
    private listOfPartdata: any;
    private listOfLocation: any;

    private ibPartdataID: string;
    private ibPartdataName: string;
    private ibPartname: string;
    private ibTimebase: number;
    private ibTimeuse: number;
    private ibCounterbase: number;
    private ibCounteruse: number;
    private ibStatus: string;
    private ibLocation: string;

    constructor( private activeModal: NgbActiveModal,
                 private partdataService: PartdataService,
                 private partService: PartService,
                 private locationService: LocationService,
                 private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.createInit();
        this.getPart();
        this.getPartdataID();
        this.getEmptyLocation();
        // this.getLocation();
        // console.log( 'partdata: ', this.PartData );
    }

    getEmptyLocation() {
        this.locationService.selectEmptyLocation().subscribe( data => this.listOfLocation = data );
    }

    // getLocation() {
    //     this.locationService.selectLocationID().subscribe( data => {
    //         this.listOfLocation = data;
    //         // console.log( 'location: ', this.listOfLocation );
    //     } );
    // }

    getPart() {
        this.partService.selectPart().subscribe( data => this.listOfPart = data );
    }


    // ไม่จำเป้นต้องใช้ เพราะเราสร้าง id ให้เอง
    getPartdataID() {
        this.partdataService.selectPartdataID().subscribe( data => {
            this.listOfPartdata = data;
            // console.log( 'partdata: ', data );
        } );
    }

    createInit() {
        if ( this.SQL === 'update' ) {
            this.ibTimebase = this.PartData.LifeTime.time_base;
            this.ibTimeuse = this.PartData.LifeTime.time_use;
            this.ibCounterbase = this.PartData.LifeTime.counter_base;
            this.ibCounteruse = this.PartData.LifeTime.counter_use;
        }
        this.ibPartdataID = this.PartData.partdata_id;
        this.ibPartdataName = this.PartData.partdata_name;
        // console.log( 'name: ', this.ibPartdataName );
        this.ibPartname = this.PartData.part_id;
        this.ibStatus = this.PartData.status;
        // console.log( 'location_id: ', this.PartData.location_id );
        this.ibLocation = this.PartData.location_id;
        // console.log( 'ibLocation: ', this.ibLocation );
    }

    sentBack( data ) {
        this.activeModal.close( data );
    }

    insert() {
        // ไม่จำเป้นต้องใช้ เพราะเราสร้าง id ให้เอง
        const duplicate = this.listOfPartdata.find( data => data.partdata_id === this.ibPartdataID );
        if ( duplicate ) {
            this.alert = true;
            return;
        } else {
            const data = {
                // partdata_id: this.ibPartdataID,
                partdata_name: this.ibPartdataName,
                part_id: this.ibPartname,
                time_base: this.ibTimebase,
                counter_base: this.ibCounterbase,
                location_id: this.ibLocation,
            };
            // console.log( 'modal data: ', data );
            // this.partdataService.insertPartdata( data ).subscribe();
            // this.locationService.updateCell( [ this.ibLocation ] ).subscribe();
            this.sentBack( data );
        }
    }

    update() {
        const data = {
            partdata_id: this.ibPartdataID || null,
            partdata_name: this.ibPartdataName || null,
            part_id: this.ibPartname || null,
            time_base: this.ibTimebase,
            counter_base: this.ibCounterbase,
            location_id: this.ibLocation,
        };
        // console.log( 'data update: ', data );
        // this.partdataService.updatePartdata( data ).subscribe();
        this.sentBack( data );
    }

    OpenSubmitModal( partdataID ) {
        const modalRef = this.modalService.open( KitConfirmComponent, { backdrop: 'static' } );
        modalRef.result.then( ( user ) => {
            if ( user ) {
                this.PM( user, partdataID );
            } else {
                // console.log( 'ERROR!!!' );
            }
        } );
        // console.log( 'PM: ', partdataID );
    }

    PM( user, part ) {
        const data = {
            user_id: user,
            partdata_id: part
        };
        this.partdataService.PM( data ).subscribe();
        // console.log( 'PM: ', data );
        this.modalService.open( CompleteComponent );
    }

    closeAlert() {
        this.alert = false;
    }
}
