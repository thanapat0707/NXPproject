import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { PackerEntity } from '../../packer/entity/packer.entity';
import { PartEntity } from '../../part/entity/part.entity';
import { SOTEntity } from '../../sot/entity/sot.entity';
import { PartlistDetailEntity } from './partlist-detail.entity';

@Table( { tableName: 'partlist', timestamps: false } )

export class PartlistEntity extends Model<PartlistEntity> {
    @Column( {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    } )
        // tslint:disable-next-line:variable-name
    partlist_id: number;

    @ForeignKey( () => PackerEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    packer_id: string;

    @BelongsTo( () => PackerEntity )
    Packer: PackerEntity;

    @ForeignKey( () => SOTEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    sot_id: string;

    @BelongsTo( () => SOTEntity )
    SOT: SOTEntity;

    // @Column( {
    //     type: DataType.ARRAY(DataType.NUMBER),
    // })
    // allpart: number;

    @HasMany( () => PartlistDetailEntity)
    PartlistDetail: PartlistDetailEntity[];
}
