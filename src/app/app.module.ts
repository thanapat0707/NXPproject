/* config angular i18n */
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FindAndStoreService } from './page/find-and-store/find-and-store.service';
registerLocaleData( en );

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    NzDividerModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzTableModule,
    NgZorroAntdModule
} from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'ng-sidebar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgPipesModule } from 'ngx-pipes';
import { MainComponent } from './page/main/main.component';
import { NgbModalModule, NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { KitConfirmComponent } from './modal/kit-confirm/kit-confirm.component';
import { CompleteComponent } from './modal/complete/complete.component';
import { AppService } from './app.service';
import { FindCompleteComponent } from './modal/find-complete/find-complete.component';
import { SERVICES } from './services/services.list';
import { ErrorComponent } from './modal/error/error.component';
import { PackerModalComponent } from './page/setup/packer/packer-modal.component';
import { PartlistModalComponent } from './page/part/partlist/partlist-modal.component';
import { ConvertModalComponent } from './page/main/convert-modal.component';
import { PartDataModalComponent } from './page/part/part-data/part-data-modal.component';
import { UserModalComponent } from './page/setup/user/user-modal.component';
import { PartModalComponent } from './page/part/part-type/part-modal.component';
import { SotModalComponent } from './page/setup/sot/sot-modal.component';
import { LocationModalComponent } from './page/location/location-modal.component';
import { ConfirmComponent } from './modal/confirm/confirm.component';
import { WarningComponent } from './modal/warning/warning.component';
import { AppController } from './app.controller';
import { FindAndStoreComponent } from './page/find-and-store/find-and-store.component';
import { ChangeCompleteComponent } from './modal/change-complete/change-complete.component';
import { ChangePartComponent } from './page/main/change-part.component';

@NgModule( {
    declarations: [
        AppComponent,
        routingComponent,
        KitConfirmComponent,
        CompleteComponent,
        PartlistModalComponent,
        PartModalComponent,
        PartDataModalComponent,
        SotModalComponent,
        FindCompleteComponent,
        UserModalComponent,
        ErrorComponent,
        ConvertModalComponent,
        LocationModalComponent,
        PackerModalComponent,
        ConfirmComponent,
        WarningComponent,
        ChangeCompleteComponent,
        ChangePartComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarModule,
        HttpClientModule,
        NzDividerModule,
        NzLayoutModule,
        NzIconModule,
        NzMenuModule,
        BrowserAnimationsModule,
        NzTableModule,
        FilterPipeModule,
        NgPipesModule,
        NgbModule,
        NgZorroAntdModule,
        AppRoutingModule,
    ],
    providers: [
        AppService,
        AppController,
        FindAndStoreService,
        SERVICES,
        { provide: NZ_I18N, useValue: en_US }
    ],
    bootstrap: [ AppComponent ],
    entryComponents: [
        KitConfirmComponent,
        CompleteComponent,
        PartlistModalComponent,
        FindCompleteComponent,
        UserModalComponent,
        ErrorComponent,
        PackerModalComponent,
        ConvertModalComponent,
        PartDataModalComponent,
        PartModalComponent,
        SotModalComponent,
        LocationModalComponent,
        ConfirmComponent,
        WarningComponent,
        ChangeCompleteComponent,
        ChangePartComponent,
    ]
} )

export class AppModule {
}
