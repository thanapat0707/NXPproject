import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PartdataModule } from '../partdata/partdata.module';
import { PartdataLifetimeService } from '../partdata/partdata-lifetime.service';
import { PartdataLifetimeEntity } from '../partdata/entity/partdata-lifetime.entity';
import { ConvertService } from '../conversion/convert.service';
import { ConvertEntity } from '../conversion/entity/convert.entity';
import { ConvertModule } from '../conversion/convert.module';
import { ConvertDetailService } from '../conversion/convert-detail.service';
import { ConvertDetailEntity } from '../conversion/entity/convert-detail.entity';

@Module( {
    imports: [
        DatabaseModule,
        PartdataModule,
        ConvertModule,
    ],
    controllers: [ UserController ],
    providers: [
        UserService,
        {
            provide: 'UserRepository',
            useValue: UserEntity,
        },
        PartdataLifetimeService,
        {
            provide: 'PartdataLifetimeRepository',
            useValue: PartdataLifetimeEntity,
        },
        ConvertService,
        {
            provide: 'ConvertRepository',
            useValue: ConvertEntity,
        },
        ConvertDetailService,
        {
            provide: 'ConvertDetailRepository',
            useValue: ConvertDetailEntity,
        },
    ],
} )

export class UserModule {
}
