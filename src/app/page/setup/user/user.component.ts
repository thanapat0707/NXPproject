import { Component, OnInit } from '@angular/core';
import { CompleteComponent } from '../../../modal/complete/complete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { UserModalComponent } from './user-modal.component';
import { AppComponent } from '../../../app.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../../modal/error/error.component';

@Component( {
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: [ './user.component.scss' ]
} )
export class UserComponent implements OnInit {

    private subscribe: Subscription[];

    public listOfData: any;

    constructor( private userService: UserService,
                 private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        this.userService.selectUser().subscribe( data => {
            this.listOfData = data;
            // console.log( 'data: ', data );
        } );
    }

    CallModal( sql, user = {} ) {
        const modalRef = this.modalService.open( UserModalComponent );
        modalRef.componentInstance.SQL = sql;
        modalRef.componentInstance.User = user;
        modalRef.result.then( ( result ) => {
            if ( result ) {
                switch( sql ) {
                    case 'insert' :
                        this.userService.insertUser( result ).subscribe( () => {
                            this.ngOnInit();
                        } );
                        break;
                    case 'update' :
                        this.userService.updateUser( result ).subscribe( () => {
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
        this.userService.deleteUser( id ).subscribe(
            () => {
                this.modalService.open( CompleteComponent );
                this.ngOnInit();
            }, err => {
                const modalRef = this.modalService.open( ErrorComponent );
                modalRef.componentInstance.msg = err.error.message;
            } );
    }
}
