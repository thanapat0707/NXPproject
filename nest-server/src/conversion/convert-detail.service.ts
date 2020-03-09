import { Injectable, Inject } from '@nestjs/common';
import { ConvertDetailEntity } from './entity/convert-detail.entity';
import { ConvertEntity } from './entity/convert.entity';
import { PartdataEntity } from '../partdata/entity/partdata.entity';
import { PartdataLifetimeEntity } from '../partdata/entity/partdata-lifetime.entity';
import * as sequelize from 'sequelize';
import { PackerEntity } from '../packer/entity/packer.entity';
import { PartEntity } from '../part/entity/part.entity';
import { LocationEntity } from '../location/entity/location.entity';

@Injectable()

export class ConvertDetailService {

    constructor(
        @Inject( 'ConvertDetailRepository' )
        private readonly convertDetailRepository: typeof ConvertDetailEntity,
    ) {
    }

    async findAll(): Promise<ConvertDetailEntity[]> {
        return this.convertDetailRepository.findAll<ConvertDetailEntity>( {
            include: [ ConvertEntity,
                {
                    model: PartdataEntity,
                    include: [
                        {
                            model: PartEntity,
                        },
                        {
                            model: PartdataLifetimeEntity,
                        },
                    ],
                } ],
        } );
    }

    async findByID( data: any ): Promise<ConvertDetailEntity[]> {
        return this.convertDetailRepository.findAll<ConvertDetailEntity>( {
            where: { convert_id: data.id },
            include: [ ConvertEntity,
                {
                    model: PartdataEntity,
                    include: [
                        {
                            model: PartEntity,
                        },
                        {
                            model: PartdataLifetimeEntity,
                        },
                    ],
                } ],
        } );
    }

    async createConvert( data: any ): Promise<ConvertDetailEntity[]> {
        return this.convertDetailRepository.bulkCreate( data );
    }

    async updatePartConvert( data: any ): Promise<ConvertDetailEntity[]> {
        // tslint:disable-next-line:no-console
        console.log( 'Change part Convert: ', data );
        this.convertDetailRepository.destroy( {
            where: {convert_id: data.convert_id, partdata_id: data.oldPart},
        }).then();
        return this.convertDetailRepository.build( {convert_id: data.convert_id, partdata_id: data.newPart} ).save().then();
        // return ;
    }

    async delete(data: any): Promise<LocationEntity> {
        return this.convertDetailRepository.destroy( {where: {convert_id: data.id}}).then();
    }

    async deleteDetail( convert: any, part: any ): Promise<LocationEntity> {
        for ( const data of part.split(',') ) {
            this.convertDetailRepository.destroy( { where: { convert_id: convert, partdata_id: data } } ).then();
        }
        return;
    }
}
