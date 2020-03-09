import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { Subscription, Observable, Observer } from 'rxjs';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';

@Component( {
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: [ './user.component.scss' ]
} )
export class UserModalComponent implements OnInit, OnDestroy {

    @Input() public SQL;
    @Input() public User;

    private subscribe: Subscription;

    private listOfUserID: any;
    private alert = false;

    private ibUserID: string;
    private ibUserName: string;
    private ibUserImage: string;

    // ------------------------------
    private loading = false;
    private image: string;

    // ------------------------------

    constructor( private activeModal: NgbActiveModal,
                 private userService: UserService,
                 // -------------------
                 private msg: NzMessageService
                 // -------------------
    ) {
    }

    ngOnInit() {
        this.getUserID();
        this.createInit();
        this.image = this.ibUserImage;
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }

    getUserID() {
        this.subscribe = this.userService.selectUserID().subscribe( data => this.listOfUserID = data );
    }

    createInit() {
        this.ibUserID = this.User.user_id;
        this.ibUserName = this.User.user_name;
        this.ibUserImage = this.User.user_image;
    }

    sentBack( data ) {
        this.activeModal.close( data );
    }

    Insert() {
        const data = this.getUser();
        // console.log( 'data: ', data );
        if ( data ) {
            // this.userService.insertUser( data ).subscribe();
            this.sentBack( data );
        } else {
            this.alert = true;
        }
    }

    Update() {
        const data = {
            user_id: this.ibUserID,
            user_name: this.ibUserName,
            user_image: this.ibUserImage
        };
        // console.log( 'data: ', data );
        // this.userService.updateUser( data ).subscribe();
        this.sentBack( data );
    }

    getUser() {
        const duplicate = this.listOfUserID.find( data => data.user_id === this.ibUserID );
        if ( duplicate ) {
            return;
        } else {
            return {
                user_id: this.ibUserID,
                user_name: this.ibUserName,
                user_image: this.ibUserImage
            };
        }
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
                    this.ibUserImage = info.file.response.url;
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
