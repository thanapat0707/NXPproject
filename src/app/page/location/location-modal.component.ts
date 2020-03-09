import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../../services/location.service';
import { CompleteComponent } from '../../modal/complete/complete.component';
import { PartService } from '../../services/part.service';

@Component( {
    selector: 'app-location-modal',
    templateUrl: './location-modal.component.html',
    styleUrls: [ './location.component.scss' ]
} )
export class LocationModalComponent implements OnInit {

    @Input() public SQL;
    @Input() public Location;

    private listOfLocation: any;
    private listOfRack: any;

    private alert = false;

    private newPart: string;
    private listOfPart: any;

    private ibRackID: string;
    private ibRow: number;
    private ibColumn: number;
    private ibLocationID: string;
    private ibEmpty: string;
    private ibDescription: string;

    constructor( private activeModal: NgbActiveModal,
                 private locationService: LocationService,
                 private modalService: NgbModal,
                 private partService: PartService,
    ) {
    }

    ngOnInit() {
        this.createInit();
        this.getLocation();
        this.getRack();

        // console.log('location data: ', this.Location);
    }

    getPart() {
        this.partService.selectPart().subscribe( data => {
            for ( const part of this.Location.LocationMapping ) {
                data = data.filter( article => article.part_id !== part.part_id );
            }
            this.listOfPart = data;
        } );
    }

    getLocation() {
        this.locationService.selectAllLocationID().subscribe( data => this.listOfLocation = data );
    }

    getRack() {
        this.locationService.selectRackID().subscribe( data => this.listOfRack = data );
    }

    createInit() {
        this.ibLocationID = this.Location.location_id || null;
        this.ibEmpty = this.Location.empty || null;
        this.ibDescription = this.Location.location_description || null;
    }

    sentBack( data ) {
        this.activeModal.close( data );
    }

    InsertRack() {
        const duplicate = this.listOfRack.find( data => data.location_id === this.ibRackID );
        if ( duplicate ) {
            this.alert = true;
            return;
        } else {
            const data = {
                rack_id: this.ibRackID,
                row: this.ibRow,
                column: this.ibColumn
            };
            // this.locationService.insertRack( data ).subscribe();
            this.sentBack( data );
        }
    }

    InsertLocation() {
        const duplicate = this.listOfLocation.find( data => data.location_id === this.ibLocationID );
        if ( duplicate ) {
            this.alert = true;
            return;
        } else {
            const data = {
                rack_id: this.ibRackID,
                location_id: this.ibLocationID,
            };
            // this.locationService.insertLocation( data ).subscribe();
            this.sentBack( data );
        }
    }

    InsertLocationMapping() {
        const data = {
            location_id: this.ibLocationID,
            part_id: this.newPart,
        };
        this.sentBack( data );
    }

    Update() {
        const data = {
            location_id: this.ibLocationID,
            location_description: this.ibDescription,
        };
        // this.partService.updatePart( data ).subscribe();
        this.sentBack( data );
    }

    DeleteLocationMapping( locationID, partID ) {
        this.locationService.deleteLocationMapping( locationID, partID ).subscribe( () => {
            this.Location.LocatonMapping = this.Location.LocatonMapping.filter( data => data.part_id !== partID );
        } );
        this.modalService.open( CompleteComponent );
    }

    closeAlert() {
        this.alert = false;
    }
}
