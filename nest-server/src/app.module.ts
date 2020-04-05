import { Module } from '@nestjs/common';
import { PackerModule } from './packer/packer.module';
import { DatabaseModule } from './database/database.module';
import { PartdataModule } from './partdata/partdata.module';
import { PartModule } from './part/part.module';
import { ConvertModule } from './conversion/convert.module';
import { SOTModule } from './sot/sot.module';
import { PartlistModule } from './partlist/partlist.module';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartdataLifetimeService } from './partdata/partdata-lifetime.service';
import { PartdataLifetimeEntity } from './partdata/entity/partdata-lifetime.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './error/error.filter';
import { ImageModule } from './image/image.module';
import { ConvertService } from './conversion/convert.service';
import { ConvertEntity } from './conversion/entity/convert.entity';
import { ConvertDetailService } from './conversion/convert-detail.service';
import { ConvertDetailEntity } from './conversion/entity/convert-detail.entity';

@Module( {
    imports: [
        // TypeOrmModule.forRoot(),
        DatabaseModule,
        PackerModule,
        PartdataModule,
        PartModule,
        ConvertModule,
        SOTModule,
        PartlistModule,
        UserModule,
        LocationModule,
        ImageModule,
    ],
    controllers: [ AppController ],
    providers: [
        AppService,
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
        // {
        //     provide: APP_FILTER,
        //     useClass: HttpExceptionFilter,
        // },
    ],
} )
export class AppModule {
}
