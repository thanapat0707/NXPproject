import { Injectable, Inject } from '@nestjs/common';
import { PartlistEntity } from './entity/partlist.entity';
import { SOTEntity } from '../sot/entity/sot.entity';
import { PartlistDetailEntity } from './entity/partlist-detail.entity';
import { ConvertEntity } from '../conversion/entity/convert.entity';
import { PackerEntity } from '../packer/entity/packer.entity';
import { PartdataEntity } from '../partdata/entity/partdata.entity';
import { PartEntity } from '../part/entity/part.entity';
import { PartdataLifetimeEntity } from '../partdata/entity/partdata-lifetime.entity';
import { PartlistDetailService } from './partlist-detail.service';

@Injectable()

export class PartlistService {

    constructor(
        @Inject( 'PartlistRepository' ) private readonly partlistRepository: typeof PartlistEntity,
        private readonly partlistDetailService: PartlistDetailService,
    ) {
    }

    async findAll(): Promise<PartlistEntity[]> {
        return this.partlistRepository.findAll<PartlistEntity>(
            {
                include: [
                    SOTEntity,
                    {
                        model: PartlistDetailEntity,
                        include: [
                            {
                                model: PartEntity,
                                include: [
                                    {
                                        model: PartdataEntity,
                                        include: [
                                            {
                                                model: PartdataLifetimeEntity,
                                            } ],
                                    } ],
                            } ],
                    } ],
            } );
    }

    async findOne( data: any ): Promise<PartlistEntity> {
        return this.partlistRepository.findOne<PartlistEntity>( { where: { partlist_id: data.id } } );
    }

    async findPartlistWithPacker( packer: string ): Promise<PartlistEntity[]> {
        return this.partlistRepository.findAll<PartlistEntity>( {
            where: { packer_id: packer },
        } );
    }

    async findWithSOT( id: string ) {
        return this.partlistRepository.findOne( {
            where: { sot_id: id },
        } );
    }

    async findWithPacker( id: string ) {
        return this.partlistRepository.findOne( {
            where: { packer_id: id },
        } );
    }

    async create( data: any ): Promise<PartlistEntity> {
        return this.partlistRepository.build( data ).save();
    }

    async delete( data: any ): Promise<PartlistEntity> {
        this.partlistDetailService.deleteAll( data ).then( () => {
            this.partlistRepository.destroy( { where: { partlist_id: data.id } } ).then();
        } );
        return;
    }
}
