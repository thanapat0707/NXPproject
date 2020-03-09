import { Table, Model, Column, DataType, Default } from 'sequelize-typescript';

@Table({tableName: 'users', timestamps: false})

export class UserEntity extends Model<UserEntity> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        unique: true,
    })
        // tslint:disable-next-line:variable-name
    user_id: string;

    @Default('No Name')
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    user_name: string;

    @Default('assets/images/avatar.png')
    @Column({ type: DataType.STRING })
        // tslint:disable-next-line:variable-name
    user_image: string;
}
