import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,) { }

  ngOnInit() {
  }

  sentBack( ) {
    this.activeModal.close( 'yes' );
  }

}
