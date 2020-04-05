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

    private searchValue = '';
    private sortName: string | null = null;
    private sortValue: string | null = null;
    private listOfDisplayData: any;

    constructor( private packerService: PackerService,
                 private modalService: NgbModal, ) {
    }

    ngOnInit() {
        this.getPacker();
    }

    getPacker() {
        this.packerService.selectPacker().subscribe( data => {
            this.listOfPacker = data;
            this.listOfDisplayData = data;
        } );
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
        }, (error) => {}  );
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

    search() {
        // console.log('search: ', this.searchValue);
        // console.log('search: ', this.searchValue.toLowerCase());
        const filterFunc = ( item: { packer_type: string; packer_group: string; packer_id: string; } ) => {
            return (
                item.packer_type.toLowerCase().indexOf( this.searchValue.toLowerCase() ) !== -1 ||
                item.packer_group.toLowerCase().indexOf( this.searchValue.toLowerCase() ) !== -1 ||
                item.packer_id.toLowerCase().indexOf( this.searchValue.toLowerCase() ) !== -1
            );
        };
        const data = this.listOfPacker.filter( ( item: { packer_type: string; packer_group: string; packer_id: string; } ) => filterFunc( item ) );
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

}
