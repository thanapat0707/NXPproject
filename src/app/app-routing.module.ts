import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { FindComponent } from './page/find-and-store/find/find.component';
import { LocationComponent } from './page/location/location.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { PartComponent } from './page/part/part.component';
import { StoreComponent } from './page/find-and-store/store/store.component';
import { SetupComponent } from './page/setup/setup.component';
import { UserComponent } from './page/setup/user/user.component';
import { PackerComponent } from './page/setup/packer/packer.component';
import { SotComponent } from './page/setup/sot/sot.component';
import { PartlistComponent } from './page/part/partlist/partlist.component';
import { PartDataComponent } from './page/part/part-data/part-data.component';
import { PartTypeComponent } from './page/part/part-type/part-type.component';
import { FindAndStoreComponent } from './page/find-and-store/find-and-store.component';

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    {
        path: 'part', component: PartComponent,
        children: [
            { path: 'partlist', component: PartlistComponent },
            { path: 'part-data', component: PartDataComponent },
            { path: 'part-type', component: PartTypeComponent },
            { path: '', redirectTo: 'partlist', pathMatch: 'full' },
        ]
    },
    { path: 'find-and-store', component: FindAndStoreComponent,
        children: [
            { path: 'find', component: FindComponent },
            { path: 'store', component: StoreComponent },
            { path: '', redirectTo: 'find', pathMatch: 'full' },
        ]},
    { path: 'location', component: LocationComponent },
    { path: 'store', component: StoreComponent },
    {
        path: 'setup', component: SetupComponent,
        children: [
            { path: 'user', component: UserComponent },
            { path: 'packer', component: PackerComponent },
            { path: 'sot', component: SotComponent },
            { path: '', redirectTo: 'user', pathMatch: 'full' },
        ]
    },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule( {
    imports: [ RouterModule.forRoot( routes, { enableTracing: false, onSameUrlNavigation: 'reload' } ) ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule {
}

export const routingComponent = [
    // ----------------------
    MainComponent,
    // ----------------------
    FindAndStoreComponent,
    FindComponent,
    StoreComponent,
    // ----------------------
    LocationComponent,
    // ----------------------
    PartComponent,
    PartlistComponent,
    PartDataComponent,
    PartTypeComponent,
    // ----------------------
    SetupComponent,
    UserComponent,
    PackerComponent,
    SotComponent,
    // ----------------------
    PageNotFoundComponent,
];
