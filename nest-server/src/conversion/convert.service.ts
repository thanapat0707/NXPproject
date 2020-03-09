import { Injectable, Inject } from '@nestjs/common';
import { ConvertEntity } from './entity/convert.entity';
import { UserEntity } from '../user/entity/user.entity';
import { PackerEntity } from '../packer/entity/packer.entity';
import { SOTEntity } from '../sot/entity/sot.entity';
import { ConvertDetailEntity } from './entity/convert-detail.entity';
import { ConvertDetailService } from './convert-detail.service';
import { PartdataEntity } from '../partdata/entity/partdata.entity';
import { LocationEntity } from '../location/entity/location.entity';
import * as sequelize from 'sequelize';
import { PartEntity } from '../part/entity/part.entity';
import { PartdataLifetimeEntity } from '../partdata/entity/partdata-lifetime.entity';

@Injectable()

export class ConvertService {

    private date = require( 'date-and-time' );

    constructor(
        @Inject( 'ConvertRepository' ) private readonly convertRepository: typeof ConvertEntity,
        private convertDetailService: ConvertDetailService,
    ) {
    }

    async findAll( working: string ): Promise<ConvertEntity[]> {
        // tslint:disable-next-line:no-console
        // console.log('working: ', working);
        const status = working === 'true';
        return this.convertRepository.findAll<ConvertEntity>( {
            where: { working },
            include: [
                PackerEntity,
                SOTEntity,
                UserEntity,
                {
                    model: ConvertDetailEntity,
                    include: [ {
                        model: PartdataEntity,
                        include: [ {
                            model: PartdataLifetimeEntity,
                        } ],
                    } ],
                },
            ],
        } );
    }

    async findConvert( packer: string, status: string ): Promise<ConvertEntity> {
        // console.log('data: ', packer);
        return this.convertRepository.findOne<ConvertEntity>( {
            where: { packer_id: packer, working: status },
            // where: { packer_id: data.packer, working: true },
            include: [
                {
                    model: ConvertDetailEntity,
                    include: [ {
                        model: PartdataEntity,
                        include: [ PartEntity ],
                    } ],
                } ],
        } );
    }

    async findWithUserID( id: string ) {
        return this.convertRepository.findOne( {
            where: { user_id: id },
        } );
    }

    async findWithSOT( id: string ) {
        return this.convertRepository.findOne( {
            where: { sot_id: id },
        } );
    }

    async findWithPacker( id: string ) {
        return this.convertRepository.findOne( {
            where: { packer_id: id },
        } );
    }

    async findAllID(): Promise<ConvertEntity[]> {
        return this.convertRepository.findAll<ConvertEntity>( { attributes: [ 'convert_id' ] } );
    }

    async create( data: any ): Promise<ConvertEntity> {
        const now = new Date();
        const datetime = this.date.format( now, 'YYYYMMDD-HHmmss' ).toString();

        const convert = {
            convert_id: datetime,
            packer_id: data.packer_id,
            sot_id: data.sot_id,
            user_id: data.user_id,
        };
        // tslint:disable-next-line:no-console
        // console.log( 'convert: ', convert );

        const part = [];
        for ( const list of data.Part ) {
            part.push( { convert_id: datetime, partdata_id: list } );
        }

        this.convertRepository.build( convert ).save().then( () => {
            this.convertDetailService.createConvert( part );
        } );

        // tslint:disable-next-line:no-console
        // console.log( 'part: ', part );

        // await this.convertDetailService.createConvert( part );
        return;
    }

    async update( data: any ): Promise<ConvertEntity[]> {
        // tslint:disable-next-line:no-console
        // console.log( 'update Convert Work!' );
        return this.convertRepository.update(
            {
                working: false,
            },
            { where: { convert_id: data.id } } ).then();
    }

    async updateUserConvert( data: any ): Promise<ConvertEntity[]> {
        // tslint:disable-next-line:no-console
        console.log( 'update Convert user: ', data );
        return this.convertRepository.update(
            {
                user_id: data.user_id,
            },
            { where: { convert_id: data.convert_id } } ).then();
        // return ;
    }

    async delete( data: any ): Promise<LocationEntity> {
        this.convertDetailService.delete( data ).then( () => {
            this.convertRepository.destroy( { where: { convert_id: data.id } } ).then();
        } );
        return;
    }
}
