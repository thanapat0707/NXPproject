import { JhiEventManager } from 'ng-jhipster';
import { Injectable } from '@angular/core';

@Injectable()

export class AppController {

    constructor( private eventManager: JhiEventManager ) {
    }

    // --------------------------------------------------------------------------------------------

    private menuButtons: any;

    get MenuButtons() {
        return this.menuButtons;
    }

    set MenuButtons( value: any ) {
        this.menuButtons = value;
        this.eventManager.broadcast( 'ChangeMenuFromPage' );
    }

    // --------------------------------------------------------------------------------------------

    private menuActive: any;

    get MenuActive() {
        return this.menuActive;
    }

    set MenuActive( value: any ) {
        this.menuActive = value;
        this.eventManager.broadcast( 'ChangeMenuActive' );
    }

    // --------------------------------------------------------------------------------------------
}
