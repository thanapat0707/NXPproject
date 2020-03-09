import { Component, OnInit, ViewEncapsulation, Injectable, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConversionService } from '../../services/conversion.service';
import { ConvertModalComponent } from './convert-modal.component';
import { AppComponent } from '../../app.component';
import { AppController } from '../../app.controller';

@Component( {
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [ './main.component.scss' ],
} )
export class MainComponent implements OnInit, OnDestroy {

    private listOfConvert: any;
    private PartData = [];
    private PartConvert: any;
    private check: any;

    constructor(
        private modalService: NgbModal,
        private conversionService: ConversionService,
        private appController: AppController
    ) {
    }

    ngOnInit() {
        this.getConvert();
        this.CheckData();

        this.appController.MenuButtons = null;
    }

    // Initial data
    // Get Order [id, Packer, PackerGroup, ... ] from order table
    getConvert() {
        this.conversionService.selectConvert( true ).subscribe( data => {
            this.listOfConvert = data;
            // console.log( 'convert: ', data );
        } );
    }

    // ---------------------------------------------------------------------------------------------------\
    CheckData() {
        this.check = setInterval( () => {
            // this.getPartDataInPacker();
            console.log( 'check' );
        }, 10000 );
    }

    // For Convert table
    checkCounter( id ) {
        let color: string;
        const partlist = this.PartData.filter( data => data.convert_id === id );
        for ( const part of partlist ) {
            if ( part.counter_use >= part.counter_base ) {
                color = 'yellow';
            }
        }
        return color;
    }

    // Open Part Modal
    convertDetail( id ) {
        const modalRef = this.modalService.open( ConvertModalComponent, { size: 'lg' } );
        modalRef.componentInstance.ConvertID = id;
    }

    StorePart( id ) {
        console.log( 'store: ', id );
    }

    ngOnDestroy() {
        clearInterval( this.check );
    }

    test() {
        const a = [ 'zero', 'one', 'two', 'three' ];
        const sliced = a.slice( 1, 3 );
        console.log( 'before a: ', a );
        console.log( 'slice: ', sliced );
        console.log( 'after a: ', a );
    }

    CheckLifeTime( status ) {
        if ( status === 'alright' ) {
            return 'status-alright';
        } else if ( status === 'almost' ) {
            return 'status-almost';
        } else {
            return 'status-alert';
        }
    }

}
