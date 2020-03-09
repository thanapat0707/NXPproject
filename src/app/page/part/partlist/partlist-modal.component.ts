import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartService } from '../../../services/part.service';
import { PackerService } from '../../../services/packer.service';
import { SotService } from '../../../services/sot.service';
import { PartlistService } from '../../../services/partlist.service';
import { CompleteComponent } from '../../../modal/complete/complete.component';

@Component( {
    selector: 'app-partlist-modal',
    templateUrl: './partlist-modal.component.html',
    styleUrls: [ './partlist.component.scss' ]
} )
export class PartlistModalComponent implements OnInit {

    @Input() public SQL;
    @Input() public PartList;

    private newPart: string;
    private listOfPart: any;
    private listOfPacker: any;
    private listOfSOT: any;
    private listOfSOTChoose: any;

    private packerGroup: any;
    private packerID: any;

    private packerChoose: string;
    private packerGroupChoose: string;
    private packerIDChoose: string;
    private sotChoose: string;

    constructor( private activeModal: NgbActiveModal,
                 private partService: PartService,
                 private partlistService: PartlistService,
                 private packerService: PackerService,
                 private sotService: SotService,
                 private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        if ( this.SQL === 'insert' ) {
            this.getPacker();
            // this.getPartlistSOT();
            this.getSOT();
        } else {
            this.getPart();
        }
        // console.log('partlistModal: ', this.PartList.PartlistDetail);
    }

    // Initial --------------------------------------------------------------------------------
    getPart() {
        this.partService.selectPart().subscribe( data => {
            for ( const part of this.PartList.PartlistDetail ) {
                data = data.filter( article => article.part_id !== part.part_id );
            }
            this.listOfPart = data;
        } );
    }

    getPacker() {
        this.packerService.selectPacker().subscribe( data => this.listOfPacker = data );
    }

    getSOT() {
        this.sotService.selectSOT().subscribe( data => {
            this.listOfSOT = data;
            this.listOfSOTChoose = data;
        } );
    }

    getPartlistSOT() {
        this.partlistService.selectPartlistWithPacker( this.packerIDChoose ).subscribe( data => {
            this.listOfSOTChoose = this.listOfSOT;
            for ( const sot of data) {
                this.listOfSOTChoose = this.listOfSOTChoose.filter( article => article.sot_id !== sot.sot_id);
            }
        } );
    }

    // ----------------------------------------------------------------------------------------

    // DropDown -------------------------------------------------------------------------------
    // Get list of packer group filter with packerChoose
    getPackerGroup() {
        this.packerGroup = this.listOfPacker.filter( article => article.packer_type === this.packerChoose );
    }

    // Get list of packerID filter with packergroupChoose
    getPackerID() {
        this.packerID = this.listOfPacker.filter( article => article.packer_group === this.packerGroupChoose );
    }

    // ----------------------------------------------------------------------------------------

    sentBack( data ) {
        this.activeModal.close( data );
    }

    InsertPartlist() {
        const data = {
            packer_id: this.packerIDChoose,
            sot_id: this.sotChoose
        };
        // this.partlistService.insertPartlist(data).subscribe();
        this.sentBack( data );
    }

    InsertPartlistDetail() {
        const data = {
            partlist_id: this.PartList.partlist_id,
            part_id: this.newPart,
        };
        // this.partlistService.insertPartlistDetail( data ).subscribe();
        this.sentBack( data );
    }

    DeletePartlistDetail( partlistID, partID ) {
        this.partlistService.deletePartlistDetail( partlistID, partID ).subscribe( () => {
            this.PartList.PartlistDetail = this.PartList.PartlistDetail.filter( data => data.part_id !== partID );
        } );
        this.modalService.open( CompleteComponent );
    }
}
