import { Component, OnInit } from '@angular/core';
import { SotService } from '../../../services/sot.service';
import { CompleteComponent } from '../../../modal/complete/complete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SotModalComponent } from './sot-modal.component';
import { ErrorComponent } from '../../../modal/error/error.component';

@Component( {
    selector: 'app-sot',
    templateUrl: './sot.component.html',
    styleUrls: [ './sot.component.scss' ]
} )
export class SotComponent implements OnInit {

    private listOfSOT: any;

    private searchValue = '';
    private sortName: string | null = null;
    private sortValue: string | null = null;
    private listOfDisplayData: any;

    constructor( private sotService: SotService,
                 private modalService: NgbModal, ) {
    }

    ngOnInit() {
        this.getSOT();
    }

    getSOT() {
        this.sotService.selectSOT().subscribe( data => {
            this.listOfSOT = data;
            this.listOfDisplayData = data;
        } );
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
        }, (error) => {}  );
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

    search() {
        // console.log('search: ', this.searchValue);
        // console.log('search: ', this.searchValue.toLowerCase());
        const filterFunc = ( item: { sot_id: string; package_name: string; } ) => {
            return (
                item.sot_id.indexOf( this.searchValue ) !== -1
                || item.package_name.toLowerCase().indexOf( this.searchValue.toLowerCase() ) !== -1
            );
        };
        const data = this.listOfSOT.filter( ( item: { sot_id: string; package_name: string; } ) => filterFunc( item ) );
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

    reset(): void {
        this.searchValue = '';
        this.search();
    }
}
