import { Sequelize } from 'sequelize-typescript';
import { PackerEntity } from '../packer/entity/packer.entity';
import { PartdataEntity } from '../partdata/entity/partdata.entity';
import { PartEntity } from '../part/entity/part.entity';
import { ConvertEntity } from '../conversion/entity/convert.entity';
import { PartlistEntity } from '../partlist/entity/partlist.entity';
import { SOTEntity } from '../sot/entity/sot.entity';
import { UserEntity } from '../user/entity/user.entity';
import { PartlistDetailEntity } from '../partlist/entity/partlist-detail.entity';
import { ConvertDetailEntity } from '../conversion/entity/convert-detail.entity';
import { PartdataLifetimeEntity } from '../partdata/entity/partdata-lifetime.entity';
import { LocationEntity } from '../location/entity/location.entity';
// import { LocationMappingEntity } from '../location/entity/location-mapping.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize( {
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '12345',
                database: 'ckm',
            } );
            sequelize.addModels( [
                PackerEntity,
                PartdataEntity,
                PartdataLifetimeEntity,
                PartEntity,
                ConvertEntity,
                ConvertDetailEntity,
                PartlistEntity,
                PartlistDetailEntity,
                SOTEntity,
                UserEntity,
                LocationEntity,
                // LocationMappingEntity,
            ] );
            await sequelize.sync();
            return sequelize;
        },
    },
];
