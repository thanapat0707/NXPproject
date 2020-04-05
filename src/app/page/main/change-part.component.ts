import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PartdataService } from '../../services/partdata.service';
import { KitConfirmComponent } from '../../modal/kit-confirm/kit-confirm.component';
import { CompleteComponent } from '../../modal/complete/complete.component';

@Component( {
    selector: 'app-change-part',
    templateUrl: './change-part.component.html',
    styleUrls: [ './main.component.scss' ]
} )
export class ChangePartComponent implements OnInit {

    @Input() public PartID;
    @Input() public PartdataID;

    private listOfPartdata: any;

    constructor( private modalService: NgbModal,
                 private activeModal: NgbActiveModal,
                 private partdataService: PartdataService,
    ) {
    }

    ngOnInit() {
        this.getPartDataFromPartID( this.PartID );
    }

    getPartDataFromPartID( partID ) {
        this.partdataService.selectPartdataFromPartID( partID ).subscribe( data => this.listOfPartdata = data );
    }

    Confirm( partdata ) {
        const modalRef = this.modalService.open( KitConfirmComponent, { backdrop: 'static' } );
        modalRef.result.then( ( user ) => {
            if ( user ) {
                this.sentBack( {
                    user_id: user,
                    partdata_id: partdata.partdata_id,
                    part_name: partdata.Part.part_name,
                    location_id: partdata.location_id,
                } );
            } else {
                // console.log( 'ERROR!!!' );
            }
        } );
    }

    sentBack( data ) {
        this.activeModal.close( data );
    }

    disabled( partdataID, status ) {
        return this.PartdataID === partdataID || status === 'packer';
    }

}
