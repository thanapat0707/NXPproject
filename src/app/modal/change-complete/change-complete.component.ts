import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component( {
    selector: 'app-change-complete',
    templateUrl: './change-complete.component.html',
    styleUrls: [ './change-complete.component.scss' ]
} )
export class ChangeCompleteComponent implements OnInit {

    @Input() public Store;

    constructor( private activeModal: NgbActiveModal, ) {
    }

    ngOnInit() {
    }

}
