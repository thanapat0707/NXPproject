import { Table, Model, Column, PrimaryKey, DataType, Default } from 'sequelize-typescript';

@Table({tableName: 'packer', timestamps: false})

export class PackerEntity extends Model<PackerEntity> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
    })
        // tslint:disable-next-line:variable-name
    packer_id: string;

    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    packer_type: string;

    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    packer_group: string;

        @Default(0)
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    packer_uph: number;
}
