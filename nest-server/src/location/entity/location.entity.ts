import { Table, Model, Column, PrimaryKey, HasMany, ForeignKey, BelongsTo, HasOne, Default, DataType } from 'sequelize-typescript';
import { PartdataEntity } from '../../partdata/entity/partdata.entity';
import { PartlistDetailEntity } from '../../partlist/entity/partlist-detail.entity';
import { LocationMappingEntity } from './location-mapping.entity';

@Table( { tableName: 'location', timestamps: false } )

export class LocationEntity extends Model<LocationEntity> {
    @PrimaryKey
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    location_id: string;

    @Default('cell')
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    location_type: string;

    @ForeignKey( () => LocationEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    rack_id: string;
    // @BelongsTo( () => LocationEntity, 'rack_id' )
    // Shelf: LocationEntity;

    @Column({ type: DataType.INTEGER })
    row: number;

    @Column({ type: DataType.INTEGER })
    column: number;

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    empty: boolean;

    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    location_description: string;

    // @ForeignKey( () => PartdataEntity )
    // @Column
    //     // tslint:disable-next-line:variable-name
    // partdata_id: string;
    //
    // @BelongsTo( () => PartdataEntity )
    //     // tslint:disable-next-line:variable-name
    // Partdata: PartdataEntity;

    @HasMany( () => LocationEntity )
    Rack: LocationEntity;

    // @HasOne( () => PartdataEntity )
    @HasMany( () => PartdataEntity )
    Partdata: PartdataEntity;

    @HasMany( () => LocationMappingEntity)
    LocationMapping: LocationMappingEntity[];
}
