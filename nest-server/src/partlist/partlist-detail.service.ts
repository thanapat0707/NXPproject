import { Injectable, Inject } from '@nestjs/common';
import { PartlistDetailEntity } from './entity/partlist-detail.entity';
import { PartlistEntity } from './entity/partlist.entity';

@Injectable()

export class PartlistDetailService {

    constructor(
        @Inject( 'PartlistDetailRepository' ) private readonly partlistDetailRepository: typeof PartlistDetailEntity,
    ) {
    }

    async findAll(): Promise<PartlistDetailEntity[]> {
        return this.partlistDetailRepository.findAll<PartlistDetailEntity>(); // return await
    }

    async findWithPart( id: string ) {
        return this.partlistDetailRepository.findOne( {
            where: { part_id: id },
        } );
    }

    async create( data: any ): Promise<PartlistDetailEntity> {
        return this.partlistDetailRepository.build( data ).save();
    }

    async delete( partlist: any, part: any ) {
        return this.partlistDetailRepository.destroy( { where: { partlist_id: partlist.partlistID, part_id: part.partID } } ).then();
    }

    async deleteAll( partlist: any ) {
        return this.partlistDetailRepository.destroy( { where: { partlist_id: partlist.id } } ).then();
    }
}
