import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationEntity } from './entity/location.entity';
import { PartdataLifetimeService } from '../partdata/partdata-lifetime.service';
import { PartdataLifetimeEntity } from '../partdata/entity/partdata-lifetime.entity';
import { PartdataService } from '../partdata/partdata.service';
import { PartdataEntity } from '../partdata/entity/partdata.entity';
import { PartdataModule } from '../partdata/partdata.module';
import { ConvertService } from '../conversion/convert.service';
import { ConvertEntity } from '../conversion/entity/convert.entity';
import { ConvertModule } from '../conversion/convert.module';
import { ConvertDetailService } from '../conversion/convert-detail.service';
import { ConvertDetailEntity } from '../conversion/entity/convert-detail.entity';
// import { LocationMappingController } from './location-mapping.controller';
// import { LocationMappingService } from './location-mapping.service';
// import { LocationMappingEntity } from './entity/location-mapping.entity';

@Module( {
    imports: [
        DatabaseModule,
        PartdataModule,
        ConvertModule,
    ],
    controllers: [
        LocationController,
        // LocationMappingController,
    ],
    providers: [
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

export class LocationModule {
}
