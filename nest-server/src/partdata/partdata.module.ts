import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PartdataController } from './partdata.controller';
import { PartdataService } from './partdata.service';
import { PartdataEntity } from './entity/partdata.entity';
import { PartdataLifetimeController } from './partdata-lifetime.controller';
import { PartdataLifetimeService } from './partdata-lifetime.service';
import { PartdataLifetimeEntity } from './entity/partdata-lifetime.entity';
import { LocationService } from '../location/location.service';

@Module( {
    imports: [
        DatabaseModule,
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
        } ],
} )

export class PartdataModule {
}
