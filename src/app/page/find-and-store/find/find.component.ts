import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KitConfirmComponent } from '../../../modal/kit-confirm/kit-confirm.component';
import { FindCompleteComponent } from '../../../modal/find-complete/find-complete.component';
import { PackerService } from '../../../services/packer.service';
import { SotService } from '../../../services/sot.service';
import { PartlistService } from '../../../services/partlist.service';
import { PartService } from '../../../services/part.service';
import { PartdataService } from '../../../services/partdata.service';
import { ConversionService } from '../../../services/conversion.service';
import { LocationService } from '../../../services/location.service';
import { ErrorComponent } from '../../../modal/error/error.component';
import { AppComponent } from '../../../app.component';
import { WarningComponent } from '../../../modal/warning/warning.component';
import { AppController } from '../../../app.controller';
import { FindAndStoreService } from '../find-and-store.service';
import { ChangeCompleteComponent } from '../../../modal/change-complete/change-complete.component';

@Component( {
    selector: 'app-find',
    templateUrl: './find.component.html',
    styleUrls: [ './find.component.scss' ]
} )
export class FindComponent implements OnInit {


    private Test: any;

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

    private partlistBefore = [];
    private partlistAfter = [];
    private partlist = [];

    private partChoose = [];

    private dataChoose = [];

    private show: boolean;
    private btnCheckOutDisabled = false;

    constructor( private packerService: PackerService,
                 private sotService: SotService,
                 private partlistService: PartlistService,
                 private partService: PartService,
                 private partdataService: PartdataService,
                 private locationService: LocationService,
                 private convertService: ConversionService,
                 private modalService: NgbModal,
                 private appComponent: AppComponent,
                 private appController: AppController,
                 private findAndStoreService: FindAndStoreService,
    ) {
    }

    ngOnInit() {
        this.getPacker();
        this.getPartListAll();
        this.getPartDataAll();
        this.getSOTAll();
        this.getPartNameAll();

        // this.appController.MenuButtons = null;
        this.appController.MenuActive = 'FIND';
        // console.log('Find');

        this.Test = this.findAndStoreService.Find;
    }

    // Initial Data
    getSOTAll() {
        this.sotService.selectSOT().subscribe( data => this.listOfSOT = data );
    }

    // Get PartList [ kitID, Part1, Part2, ...] from part_of_kit table -----------------------------------
    getPartListAll() {
        this.partlistService.selectPartlist().subscribe( data => {
            this.listOfPartlist = data;
            // console.log( 'partlist: ', data );
        } );
    }

    // Get PartData [ Partnumber, Status, Lifetime, ...] from partdata table
    getPartDataAll() {
        this.partdataService.selectPartdata().subscribe( data => this.listOfPartData = data );
    }

    getPartNameAll() {
        this.partService.selectPart().subscribe( data => this.listOfPartName = data );
    }

    // ---------------------------------------------------------------------------------------------------

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
    getSOT() {
        this.convertService.selectConvertByPackerID( this.packeridChoose, 'true' ).subscribe( data => {
            if ( data ) {
                this.ConvertData = data;
                this.sotBeforeChoose = this.ConvertData.sot_id;
                // console.log( 'convertBefore: ', data, ' | sot: ', this.sotBeforeChoose );
            }
        } );
        // ดึงข้อมูล SOT มาจาก partlist table ที่จับคู่กับ Packer อยู่แล้ว
        this.sot = this.listOfPartlist.filter( article => article.packer_id === this.packeridChoose );
    }

    // // ---------------------------------------------------------------------------------------------------

    // Find Part of kit From kit choose
    getpartofkit() {
        let partlistBefore = [];
        // let partlistAfter = [];
        this.partlist = [];
        this.partChoose = [];
        this.part = [];
        this.ConvertPart = [];

        if ( this.packeridChoose && this.sotAfterChoose ) {
            this.kitChooseData();

            const kitAfter = this.listOfPartlist.find( article =>
                article.packer_id === this.packeridChoose &&
                article.sot_id === this.sotAfterChoose );

            this.partlist = kitAfter.PartlistDetail;
            // console.log( 'sotAfter: ', this.sotAfterChoose );
            // console.log( 'kitAfter: ', kitAfter );
            // console.log( 'partlistAfter: ', this.partlistAfter );
            if ( !this.partlist.length ) {
                const modalRef = this.modalService.open( ErrorComponent );
                modalRef.componentInstance.msg = 'This kit doesn\'t map with any part.';
            } else {
                if ( !this.sotBeforeChoose ) {
                    this.chooseDefault( this.partlist );
                    if ( this.ConvertData ) {
                        this.btnCheckOutDisabled = true;
                    }
                    // else {
                    //     this.btnCheckOutDisabled = true;
                    // }
                } else {
                    if ( this.sotBeforeChoose === this.sotAfterChoose ) {
                        this.show = false;
                        const modalRef = this.modalService.open( ErrorComponent );
                        modalRef.componentInstance.msg = 'Duplicate SOT';
                    } else {
                        if ( !this.ConvertData || this.sotBeforeChoose !== this.ConvertData.sot_id ) {
                            const kitBefore = this.listOfPartlist.find( article =>
                                article.packer_id === this.packeridChoose &&
                                article.sot_id === this.sotBeforeChoose );
                            partlistBefore = kitBefore.PartlistDetail;
                            // console.log( 'sotBeforeChoose: ', this.sotBeforeChoose );
                            // console.log( 'kitBefore: ', kitBefore );
                            // console.log( 'partlistBefore: ', partlistBefore );
                            for ( const data of partlistBefore ) {
                                this.partlist = this.partlist.filter( part => part.part_id !== data.part_id );
                                // console.log( 'partlistAfter: ', this.partlistAfter );
                            }

                            this.chooseDefault( this.partlist );
                            this.btnCheckOutDisabled = true;
                        } else {
                            for ( const data of this.ConvertData.ConvertDetail ) {
                                const inUse = this.partlist.find( part => part.part_id === data.Partdata.part_id );
                                if ( inUse ) {
                                    // console.log( 'in Convert' );
                                    this.ConvertPart.push( data.partdata_id );
                                    this.part.push( data.Partdata.part_id );
                                    console.log( 'part: ', this.ConvertPart );

                                    this.partChoose.push( data.Partdata );
                                    // console.log( 'partChoose: ', this.partChoose );
                                    this.partlist = this.partlist.filter( part => part.part_id !== data.Partdata.part_id );
                                }
                            }
                            // console.log( 'Convert!!!' );
                            this.chooseDefault( this.partlist );
                        }
                    }
                }
            }
        } else {
            const modalRef = this.modalService.open( ErrorComponent );
            modalRef.componentInstance.msg = 'Please select packerID and After SOT.';
        }
    }

    kitChooseData() {
        this.dataChoose = [];
        const packer = this.listOfPacker.filter( article => article.packer_id === this.packeridChoose )[ 0 ];
        const sot = this.listOfSOT.filter( article => article.sot_id === this.sotAfterChoose )[ 0 ];
        // ทำทำไม ? => เอาไว้แสดงผลลัพธ์ของการเลือก packer กับ SOT
        this.dataChoose.push( Object.assign( packer, sot ) );
    }

    FindInLocation( location, partlist, final ) {
        const choose = [];
        let find;
        for ( const part of partlist ) {
            if ( !part.Part.PartData.length) {
                return [];
            } else {
                this.part.push( part.Part.part_id );
                find = part.Part.PartData.find( data => data.location_id === location );
                if ( find ) {
                    // console.log('Found!');
                    choose.push( find );
                    this.PartNumberChoose( find, part.Part.part_id );
                } else if ( final ) {
                    // console.log('Not Found!');
                    find = part.Part.PartData[ 0 ];
                    if ( find ) {
                        this.PartNumberChoose( find, part.Part.part_id );
                    }
                } else {
                    // break;
                }
            }
        }
        return choose;
    }

    // หา partNumber ที่ usetime กับ lifetime ห่างกันมาก ๆ เก็บไว้เป็น Default
    chooseDefault( partlist ) {
        if ( !partlist.length ) {
            const modalRef = this.modalService.open( WarningComponent );
            modalRef.componentInstance.msg = 'There is no need to take part to convert.';
        } else {
            // console.log( 'part: ', partlist );
            let count = 0;
            let choose;
            let final = false;
            let maxLocation;
            let max = [];

            if ( !partlist[ 0 ].Part.PartData.length ) {
                const modalRef = this.modalService.open( ErrorComponent );
                modalRef.componentInstance.msg = 'Part is not available (No parts to use).';
                this.btnCheckOutDisabled = true;
            } else {
                for ( const data of partlist[ 0 ].Part.PartData ) {
                    this.partChoose = [];
                    this.part = [];

                    const location = data.location_id;

                    choose = this.FindInLocation( location, partlist, final );

                    if ( choose.length === partlist.length ) {
                        break;
                    } else if ( choose.length > max.length ) {
                        // console.log('choose: ', choose, ' > ', 'max: ', max);
                        max = choose;
                        maxLocation = location;
                    } else if (!choose.length) {
                        break;
                    }
                    // console.log('max: ', max);
                    // console.log('maxLocation: ', maxLocation);
                    count++;
                }

                // console.log('[out loop] part: ', this.part);
                if ( count === partlist[ 0 ].Part.PartData.length ) {
                    // console.log( 'Final!' );
                    this.part = [];
                    final = true;
                    this.FindInLocation( maxLocation, partlist, final );
                }
                // console.log('partChoose: ', this.partChoose, ' = partlist: ', partlist, );
                if ( this.partChoose.length !== partlist.length ) {
                    const modalRef = this.modalService.open( ErrorComponent );
                    modalRef.componentInstance.msg = 'Part is not available (No parts to use).';
                    this.btnCheckOutDisabled = true;
                }
            }
            // for ( const part of partlist ) {
            //     // console.log( 'part: ', part );
            //     // จัดตำแหน่งของ part ที่จะเลือก
            //     // console.log( 'part: ', this.part );
            //     this.part.push( part.Part.part_id );
            //     // console.log( 'part: ', this.part );
            //     let max = 0; // เก็บค่าสูงสุด
            //     let choose: any; // เก็บ part ที่จะเลือก
            //     for ( const partdata of part.Part.PartData ) {
            //         // console.log('partData: ', partdata);
            //         if ( partdata.status !== 'packer' && partdata.status !== 'lost' ) {
            //             const diff = partdata.LifeTime.counter_base - partdata.LifeTime.counter_use;
            //             if ( max < diff ) {
            //                 max = diff;
            //                 choose = partdata;
            //             }
            //         }
            //     }
            //     // console.log('chooseDefault: ', choose);
            //     if ( choose ) {
            //         this.PartNumberChoose( choose, part.Part.part_id );
            //         this.btnCheckOutDisabled = false;
            //     } else {
            //         // console.log( 'Part Not Ready !!!' );
            //         const modalRef = this.modalService.open( ErrorComponent );
            //         modalRef.componentInstance.msg = 'Part is not available (No parts to use).';
            //         this.btnCheckOutDisabled = true;
            //         break;
            //     }
            // }
            // console.log( 'partChoose: ', this.partChoose, ' | length: ', this.partChoose.length );
            // console.log( 'part: ', this.part, ' | length: ', this.part.length );
            this.show = true;
        }
    }

    // เก็บข้อมูล partnumber ที่เลือกไว้ใน partlist<Object>
    PartNumberChoose( partdata, partID ) {
        // console.log( 'partChoose: ', partdata, ' | partID: ', partID );
        // console.log( 'index: ', this.part.indexOf( partID ) );
        this.partChoose[ this.part.indexOf( partID ) ] = partdata;
        // console.log( 'partChoose: ', this.partChoose, ' | length: ', this.partChoose.length );
        // console.log( 'empty: ', this.partChoose.includes( empty ) );
    }

    // Modal ยืนยัน ต้องกราก user_id ด้วย
    openSubmitModal() {
        const modalRef = this.modalService.open( KitConfirmComponent, { backdrop: 'static' } );
        modalRef.result.then( ( result ) => {
            if ( result ) {
                this.createOrder( result );
            } else {
                // console.log( 'ERROR!!!' );
            }
        } );
    }

    // สร้างรายการ order ใหม่
    createOrder( user ) {
        if ( this.ConvertData ) {
            if ( this.ConvertPart.length ) {
                // console.log('Have convert part');
                const OldConvertDetail = {
                    convert_id: this.ConvertData.convert_id,
                    partdata: this.ConvertPart
                };
                // console.log( 'OldConvertDetail: ', OldConvertDetail );
                this.convertService.deleteConvertDetail( OldConvertDetail ).subscribe();
            }
            this.convertService.updateConvert( this.ConvertData.convert_id ).subscribe();
        }
        const part = [];
        const location = [];
        for ( const data of this.partChoose ) {
            part.push( data.partdata_id );
            location.push( data.location_id );
        }
        const convert = {
            packer_id: this.packeridChoose,
            sot_id: this.sotAfterChoose,
            user_id: user,
            Part: part,
        };
        this.convertService.insertConvert( convert ).subscribe();

        const modalRef = this.modalService.open( FindCompleteComponent, { backdrop: 'static' } );
        // console.log( 'part: ', part );
        modalRef.componentInstance.Part = this.partChoose;
        this.partdataService.updatePartdataToPacker( part ).subscribe();

        // console.log('location: ', location);
        // this.locationService.updateCell( location ).subscribe();
    }

    // จัดการเรื่อง Class scss ของปุ่มเลือก partnumber
    chooseClass( partdataID, status, lifetimeStatus ) {
        // console.log('status: ', lifetimeStatus);
        if ( lifetimeStatus === 'alert' ) {
            return 'button-part-alert';
        } else if ( status === 'lost' ) {
            return 'button-part-lost';
        } else {
            for ( const choose of this.partChoose ) {
                // console.log( 'choose: ', choose );
                if ( partdataID === choose.partdata_id ) {
                    return 'button-part back-choose'; // background: yellow
                }
            }
            return 'button-part'; // default button
        }
    }

    disable( partStatus, partLifeTimeStatus ) {
        return partStatus === 'packer' || partLifeTimeStatus === 'alert' || partLifeTimeStatus === 'lost';
    }

    open() {
        this.opened = !this.opened;
    }
}
