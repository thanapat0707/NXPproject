import { Injectable } from '@angular/core';

@Injectable()

export class FindAndStoreService {

    constructor() {
    }

    // ----------------------------------------------------

    private find: any;

    get Find() {
        // console.log('get Find');
        return this.find;
    }

    set Find( value: any ) {
        // console.log('set Find');
        this.find = value;
    }

    // ----------------------------------------------------

    private store: any;

    get Store() {
        return this.find;
    }

    set Store( value: any ) {
        this.store = value;
    }

}
