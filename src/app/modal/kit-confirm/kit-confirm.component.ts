import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component( {
    selector: 'app-kit-confirm',
    templateUrl: './kit-confirm.component.html',
    styleUrls: [ './kit-confirm.component.scss' ],
    encapsulation: ViewEncapsulation.None
} )
export class KitConfirmComponent implements OnInit {

    // @Input() public user; // รับค่าท่ส่งมาพร้อมกับการเปิด Modal
    private data: string;
    private alert = false;
    private listOfUser: any;

    constructor( private activeModal: NgbActiveModal,
                 private userService: UserService ) {
    }

    ngOnInit() {
        // console.log(this.user);
        this.getUser();
    }

    getUser() {
        this.userService.selectUser().subscribe( data => this.listOfUser = data );
    }

    sentBack() {
        for ( const list of this.listOfUser ) {
            if ( this.data === list.user_id ) {
                this.activeModal.close( this.data );
            } else {
                this.alert = true;
            }
        }
    }

    closeAlert() {
        this.alert = false;
    }
}
