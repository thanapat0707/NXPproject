import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompleteComponent } from '../../../modal/complete/complete.component';
import { PartlistService } from '../../../services/partlist.service';
import { PartlistModalComponent } from './partlist-modal.component';
import { ConfirmComponent } from '../../../modal/confirm/confirm.component';
import { PackerService } from '../../../services/packer.service';

@Component( {
    selector: 'app-partlist',
    templateUrl: './partlist.component.html',
    styleUrls: [ './partlist.component.scss' ]
} )
export class PartlistComponent implements OnInit {

    private PartList: any;
    private partSize: any;
    private listOfPart: any;
    private listOfPacker = [];

    private searchValue = '';
    private sortName: string | null = null;
    private sortValue: string | null = null;
    private listOfSearchData: string[] = [];
    private listOfDisplayData: any;

    constructor( private partlistService: PartlistService,
                 private modalService: NgbModal,
                 private packerService: PackerService,
    ) {
        this.partSize = Array( 20 ).fill( 0 ).map( ( x, i ) => i );
    }

    ngOnInit() {
        this.getPartList();
        this.getPacker();
    }

    getPartList() {
        this.partlistService.selectPartlist().subscribe( data => {
            this.PartList = data;
            this.listOfDisplayData = data;
        } );
    }

    getPacker() {
        this.packerService.selectPackerID().subscribe( data => {
            // console.log('packer: ', data);
            for (const packer of data) {
                this.listOfPacker.push( { text: packer.packer_id, value: packer.packer_id } );
            }
            // console.log('Packer: ', this.listOfPacker);
        } );
    }

    CallModal( sql, partlist = {} ) {
        let modalRef: any;
        if ( sql === 'insert' ) {
            modalRef = this.modalService.open( PartlistModalComponent );
        } else {
            modalRef = this.modalService.open( PartlistModalComponent, { size: 'lg' } );
        }

        modalRef.componentInstance.SQL = sql;
        // console.log( 'partlist: ', partlist );
        modalRef.componentInstance.PartList = partlist;
        modalRef.result.then( ( result ) => {
            if ( result ) {
                switch ( sql ) {
                    case 'insert' :
                        this.partlistService.insertPartlist( result ).subscribe( () => {
                            this.ngOnInit();
                        } );
                        break;
                    case 'update' :
                        this.partlistService.insertPartlistDetail( result ).subscribe( () => {
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

    Delete( partlist: any ) {
        const modalRef = this.modalService.open( ConfirmComponent );
        modalRef.result.then( ( result ) => {
            if ( result ) {
                this.partlistService.deletePartlist( partlist.partlist_id ).subscribe( () => {
                    this.ngOnInit();
                    this.modalService.open( CompleteComponent );
                });
            } else {
                // console.log( 'ERROR!!!' );
            }
        } );
    }

    search() {
        const filterFunc = ( item: { packer_id: string; sot_id: string } ) => {
            return (
                (this.listOfSearchData.length ? this.listOfSearchData.some( article => item.packer_id === article ) : true)
                && item.packer_id.indexOf( this.searchValue ) !== -1
            );
        };
        const data = this.PartList.filter( ( item: { packer_id: string; sot_id: string } ) => filterFunc( item ) );
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


