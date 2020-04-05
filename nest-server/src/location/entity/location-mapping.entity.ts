// import { Table, Model, Column, DataType, ForeignKey, BelongsTo, PrimaryKey} from 'sequelize-typescript';
// import { LocationEntity } from './location.entity';
// import { PartEntity } from '../../part/entity/part.entity';
// import { PackerEntity } from '../../packer/entity/packer.entity';
//
// @Table( { tableName: 'location_mapping', timestamps: false } )
//
// export class LocationMappingEntity extends Model<LocationMappingEntity> {
//     @PrimaryKey
//     @ForeignKey( () => LocationEntity )
//     @Column({ type: DataType.STRING })
//         // tslint:disable-next-line:variable-name
//     location_id: number;
//
//     @BelongsTo( () => LocationEntity )
//     Location: LocationEntity;
//
//     @PrimaryKey
//     @ForeignKey( () => PackerEntity )
//     @Column({ type: DataType.STRING })
//         // tslint:disable-next-line:variable-name
//     packer_id: string;
//
//     @BelongsTo( () => PackerEntity )
//     Packer: PackerEntity;
// }
