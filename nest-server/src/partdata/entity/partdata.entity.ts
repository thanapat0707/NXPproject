import { Table, Model, Column, PrimaryKey, DataType, HasOne, ForeignKey, BelongsTo, Default, AutoIncrement } from 'sequelize-typescript';
import { PartEntity } from '../../part/entity/part.entity';
import { PartdataLifetimeEntity } from './partdata-lifetime.entity';
import { LocationEntity } from '../../location/entity/location.entity';
import { ConvertDetailEntity } from '../../conversion/entity/convert-detail.entity';

@Table( { tableName: 'partdata', timestamps: false } )

export class PartdataEntity extends Model<PartdataEntity> {
    @PrimaryKey
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    partdata_id: string;

    @Column( { type: DataType.STRING } )
        // tslint:disable-next-line:variable-name
    partdata_name: string;

    @ForeignKey( () => PartEntity )
    @Column( { type: DataType.INTEGER } )
        // tslint:disable-next-line:variable-name
    part_id: number;

    @BelongsTo( () => PartEntity )
        // tslint:disable-next-line:variable-name
    Part: PartEntity;

    @Default( 'store' )
    @Column( { type: DataType.STRING } )
    status: string;

    @ForeignKey( () => LocationEntity )
    @Column( { type: DataType.STRING } )
        // tslint:disable-next-line:variable-name
    location_id: string;

    @BelongsTo( () => LocationEntity )
        // tslint:disable-next-line:variable-name
    Location: LocationEntity;

    @Column( { type: DataType.DATEONLY } )
        // tslint:disable-next-line:variable-name
    create_date: Date;

    @Column( { type: DataType.DATEONLY } )
        // tslint:disable-next-line:variable-name
    update_date: Date;

    @HasOne( () => PartdataLifetimeEntity )
    LifeTime: PartdataLifetimeEntity;

    @HasOne( () => ConvertDetailEntity )
    ConvertDetail: ConvertDetailEntity;

    // @HasOne( () => LocationEntity )
    // Location: LocationEntity;

}
