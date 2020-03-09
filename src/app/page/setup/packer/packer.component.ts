import { Component, OnInit } from '@angular/core';
import { PackerService } from '../../../services/packer.service';
import { CompleteComponent } from '../../../modal/complete/complete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackerModalComponent } from './packer-modal.component';
import { ConversionService } from '../../../services/conversion.service';
import { AppComponent } from '../../../app.component';
import { ErrorComponent } from '../../../modal/error/error.component';

@Component( {
    selector: 'app-packer',
    templateUrl: './packer.component.html',
    styleUrls: [ './packer.component.scss' ]
} )
export class PackerComponent implements OnInit {

    private listOfPacker: any;

    constructor( private packerService: PackerService,
                 private modalService: NgbModal, ) {
    }

    ngOnInit() {
        this.getPacker();
    }

    getPacker() {
        this.packerService.selectPacker().subscribe( data => this.listOfPacker = data );
    }

    CallModal( sql, packer = {} ) {
        const modalRef = this.modalService.open( PackerModalComponent );
        modalRef.componentInstance.SQL = sql;
        modalRef.componentInstance.Packer = packer;
        modalRef.result.then( ( result ) => {
            if ( result ) {
                switch ( sql ) {
                    case 'insert' :
                        this.packerService.insertPacker( result ).subscribe( () => {
                            this.ngOnInit();
                        } );
                        break;
                    case 'update' :
                        this.packerService.updatePacker( result ).subscribe( () => {
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
        this.packerService.deletePacker( id ).subscribe(
            () => {
                this.modalService.open( CompleteComponent );
                this.ngOnInit();
            }, err => {
                const modalRef = this.modalService.open( ErrorComponent );
                modalRef.componentInstance.msg = err.error.message;
            }
        );
    }

}
