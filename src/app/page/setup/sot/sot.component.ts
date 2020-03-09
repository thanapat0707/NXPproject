import { Component, OnInit } from '@angular/core';
import { SotService } from '../../../services/sot.service';
import { CompleteComponent } from '../../../modal/complete/complete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SotModalComponent } from './sot-modal.component';
import { ConversionService } from '../../../services/conversion.service';
import { AppComponent } from '../../../app.component';
import { ErrorComponent } from '../../../modal/error/error.component';

@Component( {
    selector: 'app-sot',
    templateUrl: './sot.component.html',
    styleUrls: [ './sot.component.scss' ]
} )
export class SotComponent implements OnInit {

    private listOfSOT: any;

    constructor( private sotService: SotService,
                 private modalService: NgbModal, ) {
    }

    ngOnInit() {
        this.getSOT();
    }

    getSOT() {
        this.sotService.selectSOT().subscribe( data => this.listOfSOT = data );
    }

    CallModal( sql, sot = {} ) {
        const modalRef = this.modalService.open( SotModalComponent );
        modalRef.componentInstance.SQL = sql;
        modalRef.componentInstance.SOT = sot;
        modalRef.result.then( ( result ) => {
            if ( result ) {
                switch ( sql ) {
                    case 'insert' :
                        this.sotService.insertSOT( result ).subscribe( () => {
                            this.ngOnInit();
                        } );
                        break;
                    case 'update' :
                        this.sotService.updateSOT( result ).subscribe( () => {
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

    Delete( id: string ) {
        this.sotService.deleteSOT( id ).subscribe( () => {
            this.modalService.open( CompleteComponent );
            this.ngOnInit();
        }, err => {
            const modalRef = this.modalService.open( ErrorComponent );
            modalRef.componentInstance.msg = err.error.message;
        } );
    }
}
