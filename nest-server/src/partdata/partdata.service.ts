import { Injectable, Inject } from '@nestjs/common';
import { PartdataEntity } from './entity/partdata.entity';
import { PartdataLifetimeEntity } from './entity/partdata-lifetime.entity';
import { UserEntity } from '../user/entity/user.entity';
import { PartdataLifetimeService } from './partdata-lifetime.service';
import { PartEntity } from '../part/entity/part.entity';
import { LocationEntity } from '../location/entity/location.entity';

@Injectable()

export class PartdataService {

    private date = require( 'date-and-time' );

    constructor(
        @Inject( 'PartdataRepository' ) private readonly partdataRepository: typeof PartdataEntity,
        private partdataLifetimeService: PartdataLifetimeService,
    ) {
    }

    async findAll(): Promise<PartdataEntity[]> {
        return this.partdataRepository.findAll<PartdataEntity>(
            {
                include: [
                    {
                        model: PartEntity,
                    },
                    {
                        model: LocationEntity,
                    },
                    {
                        model: PartdataLifetimeEntity,
                        include: [
                            {
                                model: UserEntity,
                            } ],
                    },
                ],
                order: [ 'partdata_id' ],
            } );
    }

    async findOne( data: any ): Promise<PartdataEntity> {
        return this.partdataRepository.findOne<PartdataEntity>(
            {
                include: [
                    {
                        model: PartEntity,
                    },
                    {
                        model: LocationEntity,
                    },
                    {
                        model: PartdataLifetimeEntity,
                        include: [
                            {
                                model: UserEntity,
                            } ],
                    },
                ],
                where: { partdata_id: data.id },
            } );
    }

    async findAllID(): Promise<PartdataEntity[]> {
        return this.partdataRepository.findAll<PartdataEntity>( {
            attributes: [ 'partdata_id' ],
            order: [ 'partdata_id' ],
        } );
    }

    async findWithPartID( id: string ) {
        // console.log('partID: ', id);
        return this.partdataRepository.findAll( {
            where: { part_id: id },
            include: [
                {
                    model: PartEntity,
                },
                {
                    model: PartdataLifetimeEntity,
                },
            ],
        } );
    }

    async findWithPart( id: string ) {
        return this.partdataRepository.findOne( {
            where: { part_id: id },
        } );
    }

    async findWithLocation( id: string ) {
        return this.partdataRepository.findOne( {
            where: { location_id: id },
        } );
    }

    // async date() {
    //     const date = new Date().toLocaleDateString();
    //     // tslint:disable-next-line:no-console
    //     console.log('date: ', date );
    // }

    async updateToPacker( data: any ) {
        // tslint:disable-next-line:no-console
        console.log( 'to packer partdata: ', data );
        for ( const part of data ) {
            if ( !part.part_name.toLowerCase().indexOf( 'rubbertrip' ) ) {
                // tslint:disable-next-line:no-console
                console.log( 'Packer: RubberTrip' );
                this.partdataRepository.update(
                    {
                        status: 'packer',
                        location_id: null,
                        update_date: Date.now(),
                    },
                    { where: { partdata_id: part.partdata_id } } ).then();
            } else {
                this.partdataRepository.update(
                    {
                        status: 'packer',
                        // location_id: null,
                        update_date: Date.now(),
                    },
                    { where: { partdata_id: part.partdata_id } } ).then();
            }
        }
        // return this.partdataRepository.update(
        //     {
        //         status: 'packer',
        //         // location_id: null,
        //         update_date: Date.now(),
        //     },
        //     { where: { partdata_id: data } } ).then();
    }

    async updateToStore( data: any ): Promise<PartdataEntity[]> {
        // tslint:disable-next-line:no-console
        console.log( 'to store partdata: ', data );

        for ( const partdata of data ) {
            // if (!partdata.part_name.toLowerCase().indexOf('rubbertrip')) {
            //     this.partdataRepository.update(
            //         {
            //             status: partdata.status,
            //             location_id: partdata.location_id,
            //             update_date: Date.now(),
            //         },
            //         { where: { partdata_id: partdata.partdata_id } } ).then();
            // } else {
            //     this.partdataRepository.update(
            //         {
            //             status: partdata.status,
            //             location_id: partdata.location_id,
            //             update_date: Date.now(),
            //         },
            //         { where: { partdata_id: partdata.partdata_id } } ).then();
            // }

            this.partdataRepository.update(
                {
                    // status: 'store',
                    status: partdata.status,
                    location_id: partdata.location_id,
                    update_date: Date.now(),
                },
                { where: { partdata_id: partdata.partdata_id } } ).then();
        }
        return;
    }

    async update( data: any ) {
        await this.partdataRepository.update(
            {
                // partdata_id: data.partdata_id,
                partdata_name: data.partdata_name,
                part_id: data.part_id,
                // status: data.status,
                location_id: data.location_id,
                update_date: Date.now(),
            },
            // { where: { partdata_id: data.partdata_id } } ).then( () => {
            //     return this.partdataLifetimeService.updateLifeTime( data );
            // },
            { where: { partdata_id: data.partdata_id } } );
        await this.partdataLifetimeService.updateLifeTime( data );
    }

    switchPartLocation( data: any ): Promise<PartdataEntity> {
        // tslint:disable-next-line:no-console
        console.log( 'data: ', data );

        this.partdataRepository.update(
            {
                location_id: data.newPartLocation,
            },
            { where: { partdata_id: data.oldPart } } );
        return this.partdataRepository.update(
            {
                location_id: data.oldPartLocation,
            },
            { where: { partdata_id: data.newPart } } ).then();
        // return ;
    }

    async create( data: any ): Promise<PartdataEntity> {
        // tslint:disable-next-line:no-console
        // console.log( 'data: ', data );
        const now = new Date();
        const datetime = this.date.format( now, 'YYYYMMDD-HHmmss' ).toString();
        const partdata = {
            partdata_id: datetime,
            partdata_name: data.partdata_name,
            part_id: data.part_id,
            // status: 'store',
            location_id: data.location_id,
            create_date: now,
        };
        const time = {
            partdata_id: datetime,
            time_base: data.time_base,
            counter_base: data.counter_base,
        };
        // this.partdataRepository.build( partdata ).save().then( () => {
        //         this.partdataLifetimeService.create( time ).then();
        //     },
        // );
        await this.partdataRepository.build( partdata ).save();
        await this.partdataLifetimeService.create( time );
        return;
    }

    async delete( data: any ): Promise<PartdataEntity> {
        return this.partdataLifetimeService.delete( data ).then( () => {
                return this.partdataRepository.destroy( { where: { partdata_id: data.id } } ).then();
            },
        );
    }
}
