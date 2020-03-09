import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AppController } from '../../app.controller';

@Component( {
    selector: 'app-part',
    templateUrl: './part.component.html',
    styleUrls: [ './part.component.scss' ]
} )
export class PartComponent implements OnInit {

    constructor( private appController: AppController,
                 ) {
    }

    ngOnInit() {
        this.appController.MenuButtons = [
            { name: 'Part-list', routerLink: [ 'part/partlist' ] },
            { name: 'Part-data', routerLink: [ 'part/part-data' ] },
            { name: 'Part-Type', routerLink: [ 'part/part-type' ] },

        ];
    }

}

