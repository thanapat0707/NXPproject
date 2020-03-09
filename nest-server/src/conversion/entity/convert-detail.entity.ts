import { PrimaryKey, ForeignKey, Column, Model, Table, BelongsTo, DataType } from 'sequelize-typescript';
import { ConvertEntity } from './convert.entity';
import { PartdataEntity } from '../../partdata/entity/partdata.entity';

@Table( { tableName: 'conversion_detail', timestamps: false } )

export class ConvertDetailEntity extends Model<ConvertDetailEntity> {
    @PrimaryKey
    @ForeignKey( () => ConvertEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    convert_id: string;

    @BelongsTo( () => ConvertEntity )
    Convert: ConvertEntity;

    @PrimaryKey
    @ForeignKey( () => PartdataEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    partdata_id: string;

    @BelongsTo( () => PartdataEntity )
    Partdata: PartdataEntity;
}
