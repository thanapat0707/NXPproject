import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SotService } from '../../../services/sot.service';

@Component( {
    selector: 'app-sot-modal',
    templateUrl: './sot-modal.component.html',
    styleUrls: [ './sot.component.scss' ]
} )
export class SotModalComponent implements OnInit {

    @Input() public SQL;
    @Input() public SOT;

    private alert = false;

    private listOfSOT: any;

    private ibSOT: any;
    private ibPackageName: any;
    private ibPackageWidth: any;
    private ibPackageLength: any;
    private ibPackageThickness: any;
    private ibPackageCWidth: any;

    constructor( private activeModal: NgbActiveModal,
                 private sotService: SotService ) {
    }

    ngOnInit() {
        this.createInit();
        this.getSOTID();
    }

    getSOTID() {
        this.sotService.selectSOTID().subscribe( data => this.listOfSOT = data );
    }

    createInit() {
        this.ibSOT = this.SOT.sot_id;
        this.ibPackageName = this.SOT.package_name;
        this.ibPackageWidth = this.SOT.package_width;
        this.ibPackageLength = this.SOT.package_length;
        this.ibPackageThickness = this.SOT.package_thickness;
        this.ibPackageCWidth = this.SOT.package_cwidth;
    }

    sentBack( data ) {
        this.activeModal.close( data );
    }

    Insert() {
        const data = this.getSOT();
        if ( data ) {
            // this.sotService.insertSOT( data ).subscribe();
            this.sentBack( data );
        } else {
            this.alert = true;
        }
    }

    Update() {
        const data = {
            sot_id: this.ibSOT,
            package_name: this.ibPackageName,
            package_width: this.ibPackageLength,
            package_length: this.ibPackageWidth,
            package_thickness: this.ibPackageThickness,
            package_cwidth: this.ibPackageCWidth
        };
        // this.sotService.updateSOT( data ).subscribe();
        this.sentBack( data );
    }

    getSOT() {
        const duplicate = this.listOfSOT.find( data => data.sot_id === this.ibSOT );
        if ( duplicate ) {
            return;
        } else {
            return {
                sot_id: this.ibSOT,
                package_name: this.ibPackageName,
                package_width: this.ibPackageLength,
                package_length: this.ibPackageWidth,
                package_thickness: this.ibPackageThickness,
                package_cwidth: this.ibPackageCWidth
            };
        }
    }

    closeAlert() {
        this.alert = false;
    }

}
