import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PackerService } from '../../../services/packer.service';


@Component( {
    selector: 'app-packer-modal',
    templateUrl: './packer-modal.component.html',
    styleUrls: [ './packer.component.scss' ]
} )
export class PackerModalComponent implements OnInit {

    @Input() public SQL;
    @Input() public Packer;

    private alert = false;

    private listOfPackerID: any;

    private ibPackerID: string;
    private ibPackerType: string;
    private ibPackerGroup: number;
    private ibPackerUPH: number;

    constructor( private activeModal: NgbActiveModal,
                 private packerService: PackerService, ) {
    }

    ngOnInit() {
        this.createInit();
        this.getPackerID();
    }

    getPackerID() {
        this.packerService.selectPackerID().subscribe( data => {
            // console.log('packer: ,', data);
            this.listOfPackerID = data;
        } );
    }

    createInit() {
        this.ibPackerID = this.Packer.packer_id;
        this.ibPackerType = this.Packer.packer_type;
        this.ibPackerGroup = this.Packer.packer_group;
        this.ibPackerUPH = this.Packer.packer_uph;
    }

    sentBack( data ) {
        this.activeModal.close( data );
    }

    Insert() {
        const data = this.getPacker();
        if ( data ) {
            // this.packerService.insertPacker( data ).subscribe();
            this.sentBack( data );
        } else {
            this.alert = true;
        }
    }

    Update() {
        const packer = {
            packer_id: this.ibPackerID,
            packer_type: this.ibPackerType,
            packer_group: this.ibPackerGroup,
            packer_uph: this.ibPackerUPH,
        };
        // console.log( 'data: ', packer );
        // this.packerService.updatePacker( packer ).subscribe();
        this.sentBack( packer );
    }

    getPacker() {
        const duplicate = this.listOfPackerID.find( data => data.packer_id === this.ibPackerID );
        if ( duplicate ) {
            return;
        } else {
            return {
                packer_id: this.ibPackerID,
                packer_type: this.ibPackerType,
                packer_group: this.ibPackerGroup,
                packer_uph: this.ibPackerUPH,
            };
        }
    }

    closeAlert() {
        this.alert = false;
    }

}
