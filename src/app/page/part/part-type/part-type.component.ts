import { Component, OnInit } from '@angular/core';
import { CompleteComponent } from '../../../modal/complete/complete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartService } from '../../../services/part.service';
import { PartModalComponent } from './part-modal.component';
import { ErrorComponent } from '../../../modal/error/error.component';

@Component( {
    selector: 'app-part-type',
    templateUrl: './part-type.component.html',
    styleUrls: [ './part-type.component.scss' ]
} )
export class PartTypeComponent implements OnInit {

    private listOfPart: any;

    private searchValue = '';
    private sortName: string | null = null;
    private sortValue: string | null = null;
    private listOfDisplayData: any;

    constructor( private partService: PartService,
                 private modalService: NgbModal,
                 ) {
    }

    ngOnInit() {
        this.getPart();
    }

    getPart() {
        this.partService.selectPart().subscribe( data => {
            this.listOfPart = data;
            // console.log('listOfPart: ', this.listOfPart );
            this.listOfDisplayData = data;
        } );
    }

    CallModal( sql, part = {} ) {
        const modalRef = this.modalService.open( PartModalComponent );
        modalRef.componentInstance.SQL = sql;
        modalRef.componentInstance.Part = part;
        modalRef.result.then( ( result ) => {
            if ( result ) {
                switch ( sql ) {
                    case 'insert' :
                        this.partService.insertPart( result ).subscribe( () => {
                            this.ngOnInit();
                        } );
                        break;
                    case 'update' :
                        this.partService.updatePart( result ).subscribe( () => {
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
        this.partService.deletePart( id ).subscribe(
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
        const filterFunc = ( item: { part_id: number; part_name: string } ) => {
            return (
                item.part_name.toLowerCase().indexOf( this.searchValue.toLowerCase() ) !== -1
            );
        };
        const data = this.listOfPart.filter( ( item: { part_id: number; part_name: string } ) => filterFunc( item ) );
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

    sort( sort: { key: string; value: string } ): void {
        // console.log('sort: ', sort);
        this.sortName = sort.key;
        this.sortValue = sort.value;
        this.search();
        // const data = [...this.listOfPart];
        // this.listOfPart = data.sort( ( a, b ) =>
        //         this.sortValue === 'ascend'
        //             // tslint:disable-next-line:no-non-null-assertion
        //             ? a[ this.sortName! ] > b[ this.sortName! ]
        //             ? 1
        //             : -1
        //             // tslint:disable-next-line:no-non-null-assertion
        //             : b[ this.sortName! ] > a[ this.sortName! ]
        //             ? 1
        //             : -1
        //     );
    }
}
