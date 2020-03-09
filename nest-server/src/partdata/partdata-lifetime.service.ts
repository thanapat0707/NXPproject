import { Injectable, Inject } from '@nestjs/common';
import { PartdataEntity } from './entity/partdata.entity';
import { UserEntity } from '../user/entity/user.entity';
import { PartdataLifetimeEntity } from './entity/partdata-lifetime.entity';
import * as sequelize from 'sequelize';
import { ConvertDetailEntity } from '../conversion/entity/convert-detail.entity';
import { PackerEntity } from '../packer/entity/packer.entity';
import { ConvertEntity } from '../conversion/entity/convert.entity';

@Injectable()

export class PartdataLifetimeService {

    private counting = false;
    private Counter: any;

    constructor(
        @Inject( 'PartdataLifetimeRepository' )
        private readonly partdataLifetimeRepository: typeof PartdataLifetimeEntity,
    ) {
    }

    async findAll(): Promise<PartdataLifetimeEntity[]> {
        return this.partdataLifetimeRepository.findAll<PartdataLifetimeEntity>( {
            include: [ PartdataEntity, UserEntity ],
        } );
    }

    async findWithUserID( id: string ) {
        return this.partdataLifetimeRepository.findOne( {
            where: { user_id: id },
        } );
    }

    async create( data: any ): Promise<PartdataLifetimeEntity> {
        const time = {
            partdata_id: data.partdata_id,
            time_base: data.time_base,
            counter_base: data.counter_base,
        };
        return this.partdataLifetimeRepository.build( time ).save();
    }

    async updateLifeTime( data: any ): Promise<PartdataLifetimeEntity> {
        this.partdataLifetimeRepository.update(
            {
                time_base: data.time_base,
                counter_base: data.counter_base,
            },
            { where: { partdata_id: data.partdata_id } },
        );
        return;
    }

    async PM( partdata: any ): Promise<PartdataLifetimeEntity> {
        return this.partdataLifetimeRepository.update(
            {
                time_use: 0,
                counter_use: 0,
                user_id: partdata.user_id,
                pm_date: Date.now(),
                status: 'alright',
            },
            { where: { partdata_id: partdata.partdata_id } },
        ).then();
    }

    async delete( data: any ): Promise<PartdataLifetimeEntity> {
        return this.partdataLifetimeRepository.destroy( { where: { partdata_id: data.id } } ).then();
    }

    async stop_counter(): Promise<PartdataLifetimeEntity> {
        clearInterval( this.Counter );
        this.counting = false;
        return;
    }

    async start_counter(): Promise<PartdataLifetimeEntity[]> {
        if ( this.counting ) {
            return;
        } else {
            this.counting = true;
            this.Counter = setInterval( () => {
                this.partdataLifetimeRepository.findAll<PartdataLifetimeEntity>( {
                    include: [
                        {
                            model: PartdataEntity,
                            include: [
                                {
                                    model: ConvertDetailEntity,
                                    include: [
                                        {
                                            model: ConvertEntity,
                                            include: [ PackerEntity ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                } ).then( convert => {
                    for ( const part of convert ) {
                        const timeUse = part.time_use + 1;
                        let counterUse = part.counter_use;
                        if ( part.Partdata.ConvertDetail ) {
                            counterUse = part.counter_use + part.Partdata.ConvertDetail.Convert.Packer.packer_uph;
                        }
                        const status = this.CheckLifeTime( part.time_base, timeUse, part.counter_base, counterUse );
                        // tslint:disable-next-line:no-console
                        console.log( 'statue: ', status );
                        this.partdataLifetimeRepository.update(
                            {
                                time_use: sequelize.literal( 'time_use + 1' ),
                                counter_use: counterUse,
                                status,
                            },
                            { where: { partdata_id: part.partdata_id } },
                        ).then();
                    }
                } );
                return;
            }, 5000 );
        }
    }

    CheckLifeTime( timeBase, timeUse, counterBase, counterUse ) {
        if ( timeUse > timeBase || counterUse > counterBase ) {
            return 'alert';
        } else if ( timeUse > (timeBase * 0.7) || counterUse > (counterBase * 0.7) ) {
            return 'almost';
        } else {
            return 'alright';
        }
    }
}
