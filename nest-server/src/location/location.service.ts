import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { LocationEntity } from './entity/location.entity';
import { PartdataEntity } from '../partdata/entity/partdata.entity';
import * as sequelize from 'sequelize';
import { PartdataLifetimeService } from '../partdata/partdata-lifetime.service';
import { PartdataService } from '../partdata/partdata.service';
import { PartEntity } from '../part/entity/part.entity';
import { LocationMappingService } from './location-mapping.service';
import { LocationMappingEntity } from './entity/location-mapping.entity';

@Injectable()

export class LocationService {

    constructor(
        @Inject( 'LocationRepository' ) private readonly locationRepository: typeof LocationEntity,
        private readonly partdataService: PartdataService,
        private readonly locationMappingService: LocationMappingService,
    ) {
    }

    async findAll(): Promise<LocationEntity[]> {
        return this.locationRepository.findAll<LocationEntity>(
            {
                include: [
                    {
                        model: PartdataEntity,
                        include: [ { model: PartEntity } ],
                    },
                ],
                order: [ 'location_id' ],
            } );
    }

    async findLocationID(): Promise<LocationEntity[]> {
        return this.locationRepository.findAll<LocationEntity>(
            {
                attributes: [ 'location_id' ],
                where: { location_type: 'cell' },
                order: [ 'location_id' ],
            } );
    }

    async findAllLocationID(): Promise<LocationEntity[]> {
        return this.locationRepository.findAll<LocationEntity>(
            {
                attributes: [ 'location_id' ],
                order: [ 'location_id' ],
            } );
    }

    async findAllRackID(): Promise<LocationEntity[]> {
        return this.locationRepository.findAll<LocationEntity>(
            {
                where: { location_type: 'rack' },
                attributes: [ 'location_id' ],
                order: [ 'location_id' ],
            } );
    }

    async findEmpty(): Promise<LocationEntity[]> {
        return this.locationRepository.findAll<LocationEntity>(
            {
                attributes: [ 'location_id', 'location_description' ],
                where: { empty: true },
                order: [ 'location_id' ],
            } );
    }

    async findCell(): Promise<LocationEntity[]> {
        return this.locationRepository.findAll<LocationEntity>(
            {
                include: [ LocationMappingEntity,
                    {
                        model: PartdataEntity,
                        include: [ { model: PartEntity } ],
                    },
                ],
                where: { location_type: 'cell' },
                order: [ 'location_id' ],
            } );
    }

    async findRack(): Promise<LocationEntity[]> {
        return this.locationRepository.findAll<LocationEntity>( {
            where: { location_type: 'rack' },
            include: [ {
                model: LocationEntity,
                order: [ 'location_id' ],
            },
            ],
        } );
    }

    async createLocation( data: any ): Promise<LocationEntity> {
        return this.locationRepository.build( data ).save();
    }

    async createRack( data: any ): Promise<LocationEntity[]> {
        const location = [];
        location.push( {
            location_id: data.rack_id,
            location_type: 'rack',
            row: data.row,
            column: data.column,
            empty: false,
        } );
        for ( let row = 1; row <= data.row; row++ ) {
            for ( let col = 1; col <= data.column; col++ ) {
                location.push( {
                    location_id: `${data.rack_id}-${row}-${col}`,
                    rack_id: data.rack_id,
                } );
            }
        }

        return this.locationRepository.bulkCreate( location );
    }

    async update( data: any ): Promise<LocationEntity[]> {
        return this.locationRepository.update(
            {
                location_description: data.location_description,
            },
            { where: { location_id: data.location_id } } ).then();
    }

    async updateCell( data: any ): Promise<LocationEntity[]> {
        return this.locationRepository.update(
            {
                empty: sequelize.literal( 'not(empty)' ),
            },
            { where: { location_id: data } } ).then();
    }

    // async delete( data: any ): Promise<LocationEntity> {
    //     return this.locationRepository.destroy( { where: { location_id: data.id } } ).then();
    // }

    async delete( data: any ) {
        return this.partdataService.findWithLocation( data.id ).then( inPartdataLifetime => {
            if ( inPartdataLifetime ) {
                throw new HttpException( { message: 'CANNOT delete Location in Partdata' }, HttpStatus.BAD_REQUEST );
            } else {
                this.locationMappingService.deleteAll( data ).then( () => {
                    this.locationRepository.destroy( { where: { location_id: data.id } } ).then();
                } );
            }
        } );
    }

}
