import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';
import { PartdataService } from './services/partdata.service';
import { JhiEventManager } from 'ng-jhipster';
import { AppController } from './app.controller';

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
} )
export class AppComponent implements OnInit {
    private opened = true;

    private MenuButtonsSubscribe;
    public menuButtons: any;

    constructor( private modalService: NgbModal,
                 private appService: AppService,
                 private partdataService: PartdataService,
                 private eventManager: JhiEventManager,
                 private appController: AppController,
                 ) {
    }

    ngOnInit() {
        // this.startCounter();

        this.MenuButtonsSubscribe = this.eventManager.subscribe(
            'ChangeMenuFromPage',
            () => {
                setTimeout( () => (this.menuButtons = this.appController.MenuButtons) );
            }
        );
    }

    open() {
        this.opened = !this.opened;
    }

    startCounter() {
        this.partdataService.startCounter().subscribe( value => console.log( 'Start!!' ) );
    }

    stopCounter() {
        this.partdataService.stopCounter().subscribe( value => console.log( 'Stop!!' ) );
    }

    // ไม่ทำงาน
    // ngOnDestroy() {
    //     console.log( 'Close Program' );
    //     this.stopCounter();
    // }
}
