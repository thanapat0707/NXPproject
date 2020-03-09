import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AppController } from '../../app.controller';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  constructor( private appController: AppController) { }

  ngOnInit() {
    this.appController.MenuButtons = [
      { name: 'User', routerLink: [ 'setup/user' ] },
      { name: 'Packer', routerLink: [ 'setup/packer' ] },
      { name: 'SOT', routerLink: [ 'setup/sot' ] },
    ];
  }

}
