import { Table, Model, Column, DataType, BelongsTo, ForeignKey, HasOne, PrimaryKey, HasMany, Default } from 'sequelize-typescript';
import { PartdataEntity } from '../../partdata/entity/partdata.entity';

@Table( { tableName: 'part', timestamps: false } )

export class PartEntity extends Model<PartEntity> {
    @PrimaryKey
    @Column( {
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    } )
        // tslint:disable-next-line:variable-name
    part_id: number;

    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    part_name: string;

    @Default('assets/images/no-image.png')
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    part_image: string;

    @HasMany( () => PartdataEntity)
    PartData: PartdataEntity[];
}
