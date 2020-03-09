import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-find-complete',
  templateUrl: './find-complete.component.html',
  styleUrls: ['./find-complete.component.scss']
})
export class FindCompleteComponent implements OnInit {

  @Input() public Part;

  constructor(private router: Router,
              private activeModal: NgbActiveModal) { }

  ngOnInit() {
    // console.log('complete: ', this.Part);
  }
}
