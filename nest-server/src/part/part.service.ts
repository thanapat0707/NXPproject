import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PartEntity } from './entity/part.entity';
import { PartdataService } from '../partdata/partdata.service';
import { PartlistDetailService } from '../partlist/partlist-detail.service';
// import { LocationMappingService } from '../location/location-mapping.service';

@Injectable()

export class PartService {

    constructor(
        @Inject( 'PartRepository' ) private readonly partRepository: typeof PartEntity,
        private readonly partdataService: PartdataService,
        private readonly partlistDetailService: PartlistDetailService,
        // private readonly locationMappingService: LocationMappingService,
    ) {
    }

    async findAll(): Promise<PartEntity[]> {
        return this.partRepository.findAll<PartEntity>( {
                order: [ 'part_name' ],
            },
        );
    }

    async findAllName(): Promise<PartEntity[]> {
        return this.partRepository.findAll<PartEntity>( {
                attributes: [ 'part_name' ],
                order: [ 'part_name' ],
            },
        );
    }

    async findOne( data: any ): Promise<PartEntity> {
        return this.partRepository.findOne<PartEntity>( { where: { part_id: data.id } } ); // return await
    }

    async create( data: any ): Promise<PartEntity> {
        return this.partRepository.build( data ).save();
    }

    async update( data: any ): Promise<PartEntity> {

        return this.partRepository.update( data, { where: { part_id: data.part_id } } ).then();
    }

    // async delete( data: any ): Promise<PartEntity> {
    //     return this.partRepository.destroy( { where: { part_id: data.id } } ).then();
    // }

    async delete( data: any ) {
        return this.partlistDetailService.findWithPart( data.id ).then( inPartlist => {
            if ( inPartlist ) {
                throw new HttpException( { message: 'CANNOT delete Part in Partlist'}, HttpStatus.BAD_REQUEST );
            } else {
                return this.partdataService.findWithPart( data.id ).then( inConvert => {
                    if ( inConvert ) {
                        throw new HttpException( { message: 'CANNOT delete Part in Partdata' }, HttpStatus.BAD_REQUEST );
                    } else {
                        // return this.locationMappingService.findWithPart( data.id ).then( inMapping => {
                        //     if ( inMapping ) {
                        //         throw new HttpException( { message: 'CANNOT delete Part in Location mapping' }, HttpStatus.BAD_REQUEST );
                        //     } else {
                        //         this.partRepository.destroy( {where: {part_id: data.id}}).then();
                        //     }
                        // } );
                        this.partRepository.destroy( {where: {part_id: data.id}}).then();
                    }
                } );
            }
        } );
    }
}
