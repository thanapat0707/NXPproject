import { Module } from '@nestjs/common';
import { PartEntity } from './entity/part.entity';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { DatabaseModule } from '../database/database.module';
import { PartdataLifetimeService } from '../partdata/partdata-lifetime.service';
import { PartdataLifetimeEntity } from '../partdata/entity/partdata-lifetime.entity';
import { PartdataService } from '../partdata/partdata.service';
import { PartdataEntity } from '../partdata/entity/partdata.entity';
import { PartlistService } from '../partlist/partlist.service';
import { PartlistEntity } from '../partlist/entity/partlist.entity';
import { PartlistDetailService } from '../partlist/partlist-detail.service';
import { PartlistDetailEntity } from '../partlist/entity/partlist-detail.entity';
import { PartdataModule } from '../partdata/partdata.module';
import { PartlistModule } from '../partlist/partlist.module';
// import { LocationMappingService } from '../location/location-mapping.service';
// import { LocationMappingEntity } from '../location/entity/location-mapping.entity';
import { LocationModule } from '../location/location.module';
import { LocationService } from '../location/location.service';
import { LocationEntity } from '../location/entity/location.entity';
import { ConvertService } from '../conversion/convert.service';
import { ConvertEntity } from '../conversion/entity/convert.entity';
import { ConvertDetailService } from '../conversion/convert-detail.service';
import { ConvertDetailEntity } from '../conversion/entity/convert-detail.entity';
import { ConvertModule } from '../conversion/convert.module';

@Module( {
    imports: [
        DatabaseModule,
        PartdataModule,
        PartlistModule,
        LocationModule,
        ConvertModule,
    ],
    controllers: [ PartController ],
    providers: [
        PartService,
        {
            provide: 'PartRepository',
            useValue: PartEntity,
        },
        PartdataService,
        {
            provide: 'PartdataRepository',
            useValue: PartdataEntity,
        },
        PartdataLifetimeService,
        {
            provide: 'PartdataLifetimeRepository',
            useValue: PartdataLifetimeEntity,
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
        LocationService,
        {
            provide: 'LocationRepository',
            useValue: LocationEntity,
        },
        // LocationMappingService,
        // {
        //     provide: 'LocationMappingRepository',
        //     useValue: LocationMappingEntity,
        // },
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

export class PartModule {
}
