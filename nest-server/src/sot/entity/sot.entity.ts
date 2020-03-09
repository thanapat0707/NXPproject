import { Table, Model, Column, PrimaryKey, DataType, Default } from 'sequelize-typescript';

@Table({tableName: 'sot', timestamps: false})

export class SOTEntity extends Model<SOTEntity> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
    })
        // tslint:disable-next-line:variable-name
    sot_id: string;

    @Default('No Name')
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    package_name: string;

    @Default(1)
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    package_width: number;

    @Default(1)
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    package_length: number;

    @Default(1)
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    package_thickness: number;

    @Default(1)
    @Column({ type: DataType.INTEGER })
        // tslint:disable-next-line:variable-name
    package_cwidth: number;
}
