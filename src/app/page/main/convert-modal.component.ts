import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompleteComponent } from '../../modal/complete/complete.component';
import { ConversionService } from '../../services/conversion.service';
import { KitConfirmComponent } from '../../modal/kit-confirm/kit-confirm.component';
import { PartdataService } from '../../services/partdata.service';
import { ChangePartComponent } from './change-part.component';
import { ChangeCompleteComponent } from '../../modal/change-complete/change-complete.component';

@Component( {
    selector: 'app-convert-modal',
    templateUrl: './convert-modal.component.html',
    styleUrls: [ './main.component.scss' ]
} )
export class ConvertModalComponent implements OnInit {

    @Input() public ConvertID;

    private listOfPartConvert: any;

    constructor( private modalService: NgbModal,
                 private activeModal: NgbActiveModal,
                 private conversionService: ConversionService,
                 private partdataService: PartdataService) {
    }

    ngOnInit() {
        this.getPartConvert();
    }

    getPartConvert() {
        this.conversionService.selectConvertDetailByID( this.ConvertID ).subscribe( data => {
            this.listOfPartConvert = data;
            // console.log('data: ', data);
        } );
    }

    // For Part Modal
    LifeTimeCheck( counterbase, counteruse ) {
        if ( counteruse >= counterbase ) {
            return 'yellow';
        }
    }

    OpenSubmitModal( partnumber ) {
        const modalRef = this.modalService.open( KitConfirmComponent, { backdrop: 'static' } );
        modalRef.result.then( ( user ) => {
            if ( user ) {
                this.PM( user, partnumber );
            } else {
                // console.log( 'ERROR!!!' );
            }
        } );
        // console.log( 'PM: ', partnumber );
    }

    PM( user, part ) {
        const data = {
            user_id: user,
            partdata_id: part
        };
        this.partdataService.PM( data ).subscribe();
        // console.log( 'PM: ', data );
        this.modalService.open( CompleteComponent );
    }

    CheckLifeTime( status ) {
        if ( status === 'alright' ) {
            return 'status-alright';
        } else if ( status === 'almost' ) {
            return 'status-almost';
        } else {
            return 'status-alert';
        }
    }

    ChangePart(Partdata) {
        const modalRef = this.modalService.open( ChangePartComponent, { size: 'lg', backdrop: 'static' } );
        modalRef.componentInstance.PartID = Partdata.part_id;
        modalRef.componentInstance.PartdataID = Partdata.partdata_id;
        modalRef.result.then( ( data ) => {
            if ( data ) {
                const changePartData = {
                    convert_id: this.ConvertID,
                    oldPart: Partdata.partdata_id,
                    newPart: data.partdata_id
                };
                const changeUser = {
                    convert_id: this.ConvertID,
                    user_id: data.user_id
                };
                const store = {
                    partdata_id: Partdata.partdata_id,
                    partdata_name: Partdata.partdata_name,
                    location_id: Partdata.location_id,
                    status: 'store',
                };
                // console.log( 'ChangeData: ', changePartData );
                // console.log( 'Data: ', data );
                this.conversionService.changePartConvert(changePartData).subscribe();
                this.partdataService.updatePartdataToStore([store]).subscribe();
                this.partdataService.updatePartdataToPacker([data.partdata_id]).subscribe();
                this.conversionService.updateUserConvert(changeUser).subscribe( () => {
                    const complete = this.modalService.open( ChangeCompleteComponent );
                    complete.componentInstance.Store = [store];
                    this.ngOnInit();
                });
            } else {
                // console.log( 'Cancel!!!' );
            }
        } );
    }
}
