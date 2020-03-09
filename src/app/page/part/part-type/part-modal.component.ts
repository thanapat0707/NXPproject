import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PartService } from '../../../services/part.service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';

@Component( {
    selector: 'app-part-modal',
    templateUrl: './part-modal.component.html',
    styleUrls: [ './part-type.component.scss' ]
} )
export class PartModalComponent implements OnInit {

    @Input() public SQL;
    @Input() public Part;

    private alert = false;

    private listOfPartName: any;

    private ibPartID: string;
    private ibPartName: string;
    private ibPartImage: string;

    // ------------------------------
    private loading = false;
    private image: string;

    // ------------------------------

    constructor( private activeModal: NgbActiveModal,
                 private partService: PartService,
                 // -------------------
                 private msg: NzMessageService
                 // -------------------
    ) {
    }

    ngOnInit() {
        this.createInit();
        this.getPartName();

        this.image = this.ibPartImage;
    }

    getPartName() {
        this.partService.selectPartName().subscribe( data => this.listOfPartName = data );
    }

    createInit() {
        this.ibPartID = this.Part.part_id;
        this.ibPartName = this.Part.part_name;
        this.ibPartImage = this.Part.part_image;
    }

    sentBack( data ) {
        this.activeModal.close( data );
    }

    Insert() {
        const duplicate = this.listOfPartName.find( data => data.part_name === this.ibPartName );
        if ( duplicate ) {
            this.alert = true;
            return;
        } else {
            const data = {
                part_name: this.ibPartName,
                part_image: this.ibPartImage,
            };
            // this.partService.insertPart( data ).subscribe();
            this.sentBack( data );
        }
    }

    Update() {
        const data = {
            part_id: this.ibPartID,
            part_name: this.ibPartName,
            part_image: this.ibPartImage,
        };
        // this.partService.updatePart( data ).subscribe();
        this.sentBack( data );
    }

    closeAlert() {
        this.alert = false;
    }

    //    ----------------------------------------------------------------------------

    beforeUpload = ( file: File ) => {
        // console.log('file: ', file);
        return new Observable( ( observer: Observer<boolean> ) => {
            const imgType = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/gif' ];
            const isJPG = imgType.find( type => type === file.type );
            if ( !isJPG ) {
                // this.msg.error( 'You can only upload JPG file!' );
                console.log( 'Error: This file type doesn\'t allow here!' );
                observer.complete();
                return;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if ( !isLt2M ) {
                // this.msg.error( 'Image must smaller than 2MB!' );
                console.log( 'Error: Image must smaller than 2MB!' );
                observer.complete();
                return;
            }

            observer.next( isJPG && isLt2M );
            observer.complete();
        } );
    };

    private getBase64( img: File, callback: ( img: {} ) => void ): void {
        const reader = new FileReader();
        reader.addEventListener( 'load', () => callback( reader.result ) );
        reader.readAsDataURL( img );
    }

    handleChange( info: { file: UploadFile } ): void {
        switch( info.file.status ) {
            case 'uploading':
                this.loading = true;
                break;
            case 'done':
                // Get this url from response in real world.
                this.getBase64( info.file.originFileObj, ( img: string ) => {
                    this.loading = false;
                    this.image = img;
                    this.ibPartImage = info.file.response.url;
                    console.log( 'image: ', info.file );
                    // console.log( 'image: ', info.file.response );
                    // console.log( 'image: ', info.file.response.url );
                } );
                break;
            case 'error':
                this.msg.error( 'Network error' );
                this.loading = false;
                break;
        }
    }

    //    -----------------------------------------------------------------------------
}
