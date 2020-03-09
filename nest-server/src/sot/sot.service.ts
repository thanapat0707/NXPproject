import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SOTEntity } from './entity/sot.entity';
import { PartlistService } from '../partlist/partlist.service';
import { ConvertService } from '../conversion/convert.service';

@Injectable()

export class SOTService {

    constructor(
        @Inject( 'SOTRepository' ) private readonly sotRepository: typeof SOTEntity,
        private readonly partlistService: PartlistService,
        private readonly convertService: ConvertService,
    ) {
    }

    async findAll(): Promise<SOTEntity[]> {
        return this.sotRepository.findAll<SOTEntity>({
            order: ['sot_id'],
        });
    }

    async findAllID(): Promise<SOTEntity[]> {
        return this.sotRepository.findAll<SOTEntity>({
            attributes: ['sot_id'],
            order: ['sot_id'],
        });
    }

    async findOne(data: any): Promise<SOTEntity> {
        return this.sotRepository.findOne<SOTEntity>( {where: {sot_id: data.id}});
    }

    async create(data: any): Promise<SOTEntity> {
        return this.sotRepository.build(data).save();
    }

    async update(data: any): Promise<SOTEntity> {

        return this.sotRepository.update( data, {where: {sot_id: data.sot_id}}).then();
    }

    // async delete(data: any): Promise<SOTEntity> {
    //     return this.sotRepository.destroy( {where: {sot_id: data.id}}).then();
    // }

    async delete( data: any ) {
        return this.partlistService.findWithSOT( data.id ).then( inPartlist => {
            if ( inPartlist ) {
                throw new HttpException( { message: 'CANNOT delete SOT in Partlist'}, HttpStatus.BAD_REQUEST );
            } else {
                return this.convertService.findWithSOT( data.id ).then( inConvert => {
                    if ( inConvert ) {
                        throw new HttpException( { message: 'CANNOT delete SOT in Convert' }, HttpStatus.BAD_REQUEST );
                    } else {
                        this.sotRepository.destroy( {where: {sot_id: data.id}}).then();
                    }
                } );
            }
        } );
    }
}
