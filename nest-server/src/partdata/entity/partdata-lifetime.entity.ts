import { Table, Model, Column, PrimaryKey, ForeignKey, BelongsTo, Default, DataType } from 'sequelize-typescript';
import { UserEntity } from '../../user/entity/user.entity';
import { PartdataEntity } from './partdata.entity';

@Table( { tableName: 'partdata_lifetime', timestamps: false } )

export class PartdataLifetimeEntity extends Model<PartdataLifetimeEntity> {
    @PrimaryKey
    @ForeignKey( () => PartdataEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    partdata_id: string;

    @BelongsTo( () => PartdataEntity )
    Partdata: PartdataEntity;

    @Default( 720 )
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    time_base: number;

    @Default( 0 )
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    time_use: number;

    @Default( 720 )
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    counter_base: number;

    @Default( 0 )
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    counter_use: number;

    @Default( 'alright' )
    @Column({ type: DataType.STRING })
    status: string;

    @ForeignKey( () => UserEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    user_id: string;

    @BelongsTo( () => UserEntity )
        // tslint:disable-next-line:variable-name
    WhoPM: UserEntity;

    @Column({ type: DataType.DATEONLY })
        // tslint:disable-next-line:variable-name
    pm_date: Date;
}
