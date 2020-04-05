import { Injectable, Inject } from '@nestjs/common';
import { PartdataEntity } from './entity/partdata.entity';
import { UserEntity } from '../user/entity/user.entity';
import { PartdataLifetimeEntity } from './entity/partdata-lifetime.entity';
import * as sequelize from 'sequelize';
import { ConvertDetailEntity } from '../conversion/entity/convert-detail.entity';
import { PackerEntity } from '../packer/entity/packer.entity';
import { ConvertEntity } from '../conversion/entity/convert.entity';
import { ConvertService } from '../conversion/convert.service';
import { worker } from 'cluster';

@Injectable()

export class PartdataLifetimeService {

    private counting = false;
    private Counter: any;

    constructor(
        @Inject( 'PartdataLifetimeRepository' ) private readonly partdataLifetimeRepository: typeof PartdataLifetimeEntity,
        private readonly convertService: ConvertService,
    ) {
    }

    async findAll(): Promise<PartdataLifetimeEntity[]> {
        return this.partdataLifetimeRepository.findAll<PartdataLifetimeEntity>( {
            include: [ PartdataEntity, UserEntity ],
        } );
    }

    async findAlertPart(): Promise<PartdataLifetimeEntity[]> {
        return this.partdataLifetimeRepository.findAll<PartdataLifetimeEntity>( {
            where: { status: 'alert' },
        } );
    }

    async findWithUserID( id: string ) {
        return this.partdataLifetimeRepository.findOne( {
            where: { user_id: id },
        } );
    }

    async create( data: any ) {
        const time = {
            partdata_id: data.partdata_id,
            time_base: data.time_base,
            counter_base: data.counter_base,
        };
        return this.partdataLifetimeRepository.build( time ).save();
    }

    updateLifeTime( data: any ): Promise<PartdataLifetimeEntity> {
        const status = this.CheckLifeTime( data.time_base, data.time_use, data.counter_base, data.counter_use );
        this.partdataLifetimeRepository.update(
            {
                time_base: data.time_base,
                counter_base: data.counter_base,
                status,
            },
            { where: { partdata_id: data.partdata_id } },
        );
        return;
    }

    async PM( data: any ) {
        await this.partdataLifetimeRepository.update(
            {
                time_use: 0,
                counter_use: 0,
                user_id: data.user_id,
                pm_date: Date.now(),
                status: 'alright',
            },
            { where: { partdata_id: data.partdata_id } },
        ).then();

        if ( data.convert_id ) {
            // tslint:disable-next-line:no-console
            // console.log( 'Have convert' );
            let status = 'alright';
            this.convertService.findOne( data.convert_id ).then( Convert => {
                for ( const part of Convert.ConvertDetail ) {
                    // tslint:disable-next-line:no-console
                    // console.log( 'ConvertDetail: ', JSON.stringify( part ) );
                    const partStatus = part.Partdata.LifeTime.status;

                    if ( status === 'alright' && partStatus === 'almost' ) {
                        status = 'almost';
                    } else if ( partStatus === 'alert' ) {
                        status = 'alert';
                    }
                }
                if ( status !== Convert.status ) {
                    this.convertService.updateStatus( { convert_id: data.convert_id, status } ).then();
                }
            } );
        }
        return ;
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
        if ( this.counting ) {  // ถ้า counting เป็น true อยู่แล้วจะไม่สร้าง interval อีก
            return;
        } else { // ถ้าเไม่ จะทำการ่สร้าง interval
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

                        const status = this.CheckLifeTime( part.time_base, timeUse, part.counter_base, counterUse );

                        if ( part.Partdata.ConvertDetail ) {
                            counterUse = part.counter_use + part.Partdata.ConvertDetail.Convert.Packer.packer_uph;
                            this.updateConversionStatus(
                                part.Partdata.ConvertDetail.Convert.convert_id,
                                part.Partdata.ConvertDetail.Convert.status,
                                status,
                            );
                        }
                        // tslint:disable-next-line:no-console
                        // console.log( 'statue: ', status );
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

                // tslint:disable-next-line:no-console
                console.log( 'Counting . . ' );

                return;
                // }, 3600000 ); // 1 hr = 3600000 ms
            }, 600000 ); // 1 hr = 3600000 ms
        }
    }

    CheckLifeTime( timeBase, timeUse, counterBase, counterUse ) {
        if ( timeUse >= timeBase || counterUse >= counterBase ) {
            return 'alert';
        } else if ( timeUse > (timeBase * 0.7) || counterUse > (counterBase * 0.7) ) {
            return 'almost';
        } else {
            return 'alright';
        }
    }

    updateConversionStatus( ConvertID, ConversionStatus, PartLifetimeStatus ) {
        // tslint:disable-next-line:no-console
        // console.log( 'Have convert: ', ConvertID, ' | convert: ', ConversionStatus, ' | part: ', PartLifetimeStatus );
        if ( PartLifetimeStatus === 'almost' && ConversionStatus === 'alright' ) {
            this.convertService.updateStatus( { convert_id: ConvertID, status: 'almost' } ).then();
        } else if ( PartLifetimeStatus === 'alert' && ConversionStatus !== 'alert' ) {
            this.convertService.updateStatus( { convert_id: ConvertID, status: 'alert' } ).then();
        }
    }
}
