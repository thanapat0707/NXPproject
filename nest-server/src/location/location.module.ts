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
import { LocationMappingController } from './location-mapping.controller';
import { LocationMappingService } from './location-mapping.service';
import { LocationMappingEntity } from './entity/location-mapping.entity';

@Module( {
    imports: [
        DatabaseModule,
        PartdataModule,
    ],
    controllers: [
        LocationController,
        LocationMappingController,
    ],
    providers: [
        LocationService,
        {
            provide: 'LocationRepository',
            useValue: LocationEntity,
        },
        LocationMappingService,
        {
            provide: 'LocationMappingRepository',
            useValue: LocationMappingEntity,
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
    ],
} )

export class LocationModule {
}
