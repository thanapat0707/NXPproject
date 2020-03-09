import { Injectable, Inject } from '@nestjs/common';
import { LocationMappingEntity } from './entity/location-mapping.entity';

@Injectable()

export class LocationMappingService {

    constructor(
        @Inject( 'LocationMappingRepository' )
        private readonly locationMappingRepository: typeof LocationMappingEntity,
    ) {
    }

    async findAll(): Promise<LocationMappingEntity[]> {
        return this.locationMappingRepository.findAll<LocationMappingEntity>( {
            include: [ ],
        } );
    }

    // async findWithPart( id: string ): Promise<LocationMappingEntity> {
    //     return this.locationMappingRepository.findOne( {
    //         where: { part_id: id },
    //     } );
    // }

    async createMapping( data: any ): Promise<LocationMappingEntity> {
        return this.locationMappingRepository.build( data ).save();
    }

    async deleteMapping( location: any, packer: any ): Promise<LocationMappingEntity> {
        // console.log('location: ', location, ' | packer:', packer);
        return this.locationMappingRepository.destroy( { where: { location_id: location, packer_id: packer } } ).then();
    }

    async deleteAll( location: any ): Promise<LocationMappingEntity> {
        return this.locationMappingRepository.destroy( { where: { location_id: location.id } } ).then();
    }
}
