import { Table, Model, Column, DataType, ForeignKey, BelongsTo, PrimaryKey, HasMany, HasOne } from 'sequelize-typescript';
import { PartlistEntity } from './partlist.entity';
import { PartEntity } from '../../part/entity/part.entity';
import { PartdataEntity } from '../../partdata/entity/partdata.entity';

@Table( { tableName: 'partlist_detail', timestamps: false } )

export class PartlistDetailEntity extends Model<PartlistDetailEntity> {
    @PrimaryKey
    @ForeignKey( () => PartlistEntity )
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    partlist_id: number;

    @BelongsTo( () => PartlistEntity )
    Partlist: PartlistEntity;

    @PrimaryKey
    @ForeignKey( () => PartEntity )
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    part_id: number;

    @BelongsTo( () => PartEntity )
    Part: PartEntity;
}
