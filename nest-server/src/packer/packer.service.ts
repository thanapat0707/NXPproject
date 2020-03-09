import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { PackerEntity } from './entity/packer.entity';
import { SOTEntity } from '../sot/entity/sot.entity';
import { PartlistService } from '../partlist/partlist.service';
import { ConvertService } from '../conversion/convert.service';

@Injectable()

export class PackerService {

    constructor(
        @Inject( 'PackerRepository' ) private readonly packerRepository: typeof PackerEntity,
        private readonly partlistService: PartlistService,
        private readonly convertService: ConvertService,
    ) {
    }

    async findAll(): Promise<PackerEntity[]> {
        return this.packerRepository.findAll<PackerEntity>(
            {
                order: [ 'packer_id' ],
            },
        );
    }

    async findAllID(): Promise<PackerEntity[]> {
        return this.packerRepository.findAll<PackerEntity>(
            {
                attributes: ['packer_id'],
                order: [ 'packer_id' ],
            },
        );
    }

    async findOne(data: any): Promise<PackerEntity> {
        return this.packerRepository.findOne<PackerEntity>( {where: {packer_id: data.id}});
    }

    async create(data: any): Promise<PackerEntity> {
        return this.packerRepository.build(data).save();
    }

    async update( data: any ): Promise<PackerEntity[]> {
        return this.packerRepository.update( data, { where: { packer_id: data.packer_id } } ).then();
    }

    // async delete(data: any): Promise<PackerEntity> {
    //     return this.packerRepository.destroy( {where: {packer_id: data.id}}).then();
    // }

    async delete( data: any ) {
        return this.partlistService.findWithPacker( data.id ).then( inPartlist => {
            if ( inPartlist ) {
                throw new HttpException( { message: 'CANNOT delete Packer in Partlist'}, HttpStatus.BAD_REQUEST );
            } else {
                return this.convertService.findWithPacker( data.id ).then( inConvert => {
                    if ( inConvert ) {
                        throw new HttpException( { message: 'CANNOT Packer SOT in Convert' }, HttpStatus.BAD_REQUEST );
                    } else {
                        this.packerRepository.destroy( {where: {packer_id: data.id}}).then();
                    }
                } );
            }
        } );
    }
}
