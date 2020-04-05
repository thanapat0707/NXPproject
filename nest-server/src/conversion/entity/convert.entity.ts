import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany, Default } from 'sequelize-typescript';
import { PackerEntity } from '../../packer/entity/packer.entity';
import { SOTEntity } from '../../sot/entity/sot.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { ConvertDetailEntity } from './convert-detail.entity';

@Table( { tableName: 'conversion', timestamps: false } )

export class ConvertEntity extends Model<ConvertEntity> {
    @Column( {
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
    } )
        // tslint:disable-next-line:variable-name
    convert_id: string;

    @ForeignKey( () => PackerEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    packer_id: string;

    @BelongsTo( () => PackerEntity )
        // tslint:disable-next-line:variable-name
    Packer: PackerEntity;

    @ForeignKey( () => SOTEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    sot_id: string;

    @BelongsTo( () => SOTEntity )
        // tslint:disable-next-line:variable-name
    SOT: PackerEntity;

    @ForeignKey( () => UserEntity )
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    user_id: string;

    @BelongsTo( () => UserEntity )
        // tslint:disable-next-line:variable-name
    User: UserEntity;

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    working: boolean;

    @Default('alright')
    @Column({ type: DataType.STRING })
    status: string;

    @HasMany( () => ConvertDetailEntity )
    ConvertDetail: ConvertDetailEntity[];
}
