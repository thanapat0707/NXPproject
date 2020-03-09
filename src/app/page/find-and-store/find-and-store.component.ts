import { Component, OnInit } from '@angular/core';
import { PartdataService } from '../../services/partdata.service';
import { JhiEventManager } from 'ng-jhipster';
import { AppController } from '../../app.controller';
import { FindAndStoreService } from './find-and-store.service';
import { PackerService } from '../../services/packer.service';
import { ConversionService } from '../../services/conversion.service';
import { PartlistService } from '../../services/partlist.service';
import { Router } from '@angular/router';

@Component( {
    selector: 'app-find-and-store',
    templateUrl: './find-and-store.component.html',
    styleUrls: [ './find-and-store.component.scss' ]
} )
export class FindAndStoreComponent implements OnInit {

    private parentTest: string;

    private openSearch = false;
    private opened = true;

    public packergroup: any;
    private packerid: any;
    public sot: any;

    private packerChoose = '';
    private packergroupChoose = '';
    private packeridChoose = '';
    private sotBeforeChoose = '';
    private sotAfterChoose = '';

    private ConvertPart = [];
    private part = [];
    private ConvertData: any;
    public listOfPacker: any;
    public listOfSOT: any;
    public listOfPartlist: any;
    public listOfPartName: any;
    public listOfPartData: any;

    private MenuActiveSubscribe;
    public MenuActive = 'FIND';

    constructor( private eventManager: JhiEventManager,
                 private appController: AppController,
                 private findAndStoreService: FindAndStoreService,
                 private packerService: PackerService,
                 private convertService: ConversionService,
                 private partlistService: PartlistService,
                 private router: Router,
    ) {
    }

    ngOnInit() {

        this.getPacker();
        this.getPartListAll();

        // console.log( 'find and store work' );
        this.appController.MenuButtons = [
            { name: 'Find', routerLink: [ 'find-and-store/find' ] },
            { name: 'Store', routerLink: [ 'find-and-store/store' ] },

        ];

        this.MenuActiveSubscribe = this.eventManager.subscribe(
            'ChangeMenuActive',
            () => {
                setTimeout( () => (this.MenuActive = this.appController.MenuActive) );
            }
        );
    }

    // Get PartList [ kitID, Part1, Part2, ...] from part_of_kit table -----------------------------------
    getPartListAll() {
        this.partlistService.selectPartlist().subscribe( data => {
            this.listOfPartlist = data;
            // console.log( 'partlist: ', data );
        } );
    }

    // Start List DropDown
    // Get All data from kit table ----------------------------------------------------------------------
    getPacker() {
        this.packerService.selectPacker().subscribe( data => {
            this.listOfPacker = data;
            this.packergroup = data;
            this.packerid = data;
        } );
    }

    // Get list of packer group filter with packerChoose
    getPackerGroup() {
        // console.log( 'packerChoose: ', this.packerChoose );
        if ( !this.packerChoose ) {
            this.packergroup = this.listOfPacker;
            this.packerid = this.listOfPacker;
        } else {
            this.packergroup = this.listOfPacker.filter( article => article.packer_type === this.packerChoose );
            this.packerid = this.listOfPacker.filter( article => article.packer_type === this.packerChoose );
        }
    }

    // Get list of packerID filter with packergroupChoose
    getPackerID() {
        // console.log( 'packergroupChoose: ', this.packergroupChoose );
        if ( !this.packergroupChoose ) {
            this.packerid = this.listOfPacker;
        } else {
            this.packerid = this.listOfPacker.filter( article => article.packer_group === this.packergroupChoose );
        }
    }

    // Get list of sot filter with packeridChoose
    // getSOT() {
    //     this.convertService.selectConvertByPackerID( this.packeridChoose ).subscribe( data => {
    //         if ( data ) {
    //             this.ConvertData = data;
    //             this.sotBeforeChoose = this.ConvertData.sot_id;
    //             // console.log( 'convertBefore: ', data, ' | sot: ', this.sotBeforeChoose );
    //         }
    //     } );
    //     // ดึงข้อมูล SOT มาจาก partlist table ที่จับคู่กับ Packer อยู่แล้ว
    //     this.sot = this.listOfPartlist.filter( article => article.packer_id === this.packeridChoose );
    // }

    // ---------------------------------------------------------------------------------------------------


    open() {
        this.opened = !this.opened;
    }

    sentData() {
        // console.log( 'send' );
        // this.findAndStoreService.Find = {
        //     packerid: this.packeridChoose,
        //     sotBefore: this.sotBeforeChoose,
        //     sotAfter: this.sotAfterChoose,
        // };
        console.log('click');
        this.router.navigate(['find-and-store/find']);
        // this.openSearch = true;
        // this.parentTest = this.packeridChoose;
    }
}
