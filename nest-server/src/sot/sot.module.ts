import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SOTController } from './sot.controller';
import { SOTService } from './sot.service';
import { SOTEntity } from './entity/sot.entity';
import { PartdataLifetimeService } from '../partdata/partdata-lifetime.service';
import { PartdataLifetimeEntity } from '../partdata/entity/partdata-lifetime.entity';
import { ConvertService } from '../conversion/convert.service';
import { ConvertEntity } from '../conversion/entity/convert.entity';
import { PartlistService } from '../partlist/partlist.service';
import { PartlistEntity } from '../partlist/entity/partlist.entity';
import { PartlistModule } from '../partlist/partlist.module';
import { ConvertModule } from '../conversion/convert.module';
import { PartlistDetailService } from '../partlist/partlist-detail.service';
import { PartlistDetailEntity } from '../partlist/entity/partlist-detail.entity';
import { ConvertDetailService } from '../conversion/convert-detail.service';
import { ConvertDetailEntity } from '../conversion/entity/convert-detail.entity';

@Module( {
    imports: [
        DatabaseModule,
        PartlistModule,
        ConvertModule,
    ],
    controllers: [ SOTController ],
    providers: [
        SOTService,
        {
            provide: 'SOTRepository',
            useValue: SOTEntity,
        },
        PartlistService,
        {
            provide: 'PartlistRepository',
            useValue: PartlistEntity,
        },
        PartlistDetailService,
        {
            provide: 'PartlistDetailRepository',
            useValue: PartlistDetailEntity,
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

export class SOTModule {
}
