import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PartdataController } from './partdata.controller';
import { PartdataService } from './partdata.service';
import { PartdataEntity } from './entity/partdata.entity';
import { PartdataLifetimeController } from './partdata-lifetime.controller';
import { PartdataLifetimeService } from './partdata-lifetime.service';
import { PartdataLifetimeEntity } from './entity/partdata-lifetime.entity';
import { ConvertModule } from '../conversion/convert.module';
import { ConvertService } from '../conversion/convert.service';
import { ConvertEntity } from '../conversion/entity/convert.entity';
import { ConvertDetailService } from '../conversion/convert-detail.service';
import { ConvertDetailEntity } from '../conversion/entity/convert-detail.entity';

@Module( {
    imports: [
        DatabaseModule,
        ConvertModule,
    ],
    controllers: [ PartdataController, PartdataLifetimeController ],
    providers: [
        PartdataService,
        PartdataLifetimeService,
        {
            provide: 'PartdataRepository',
            useValue: PartdataEntity,
        },
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

export class PartdataModule {
}
