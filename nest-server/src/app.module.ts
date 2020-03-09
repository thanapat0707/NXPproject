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
        // {
        //     provide: APP_FILTER,
        //     useClass: HttpExceptionFilter,
        // },
    ],
} )
export class AppModule {
}

// // tslint:disable-next-line:no-var-requires
// const { Module } = require('@nestjs/common');
// // tslint:disable-next-line:no-var-requires
// const { PackerModule } = require( './packer/packer.module.ts');
// // tslint:disable-next-line:no-var-requires
// const { DatabaseModule } = require( './database/database.module.ts');
// // tslint:disable-next-line:no-var-requires
// const { PartdataModule } = require( './partdata/partdata.module.ts');
// // tslint:disable-next-line:no-var-requires
// const { PartModule } = require( './part/part.module.ts');
// // tslint:disable-next-line:no-var-requires
// const { ConvertModule } = require( './conversion/convert.module.ts');
// // tslint:disable-next-line:no-var-requires
// const { SOTModule } = require( './sot/sot.module.ts');
// // tslint:disable-next-line:no-var-requires
// const { PartlistModule } = require( './partlist/partlist.module.ts');
// // tslint:disable-next-line:no-var-requires
// const { UserModule } = require( './user/user.module.ts');
// // tslint:disable-next-line:no-var-requires
// const { LocationModule } = require( './location/location.module.ts');
// // tslint:disable-next-line:no-var-requires
// const { AppController } = require( './app.controller.ts');
// // tslint:disable-next-line:no-var-requires
// const { AppService } = require( './app.service.ts');
// // tslint:disable-next-line:no-var-requires
// const { PartdataLifetimeService } = require( './partdata/partdata-lifetime.service.ts');
// // tslint:disable-next-line:no-var-requires
// const { PartdataLifetimeEntity } = require( './partdata/entity/partdata-lifetime.entity.ts');
// // import { APP_FILTER } from '@nestjs/core';
// // import { HttpExceptionFilter } from './error/error.filter';
//
// module.exports( {
//     imports: [
//         // TypeOrmModule.forRoot(),
//         DatabaseModule,
//         PackerModule,
//         PartdataModule,
//         PartModule,
//         ConvertModule,
//         SOTModule,
//         PartlistModule,
//         UserModule,
//         LocationModule,
//     ],
//     controllers: [ AppController ],
//     providers: [
//         AppService,
//         PartdataLifetimeService,
//         {
//             provide: 'PartdataLifetimeRepository',
//             useValue: PartdataLifetimeEntity,
//         },
//         // {
//         //     provide: APP_FILTER,
//         //     useClass: HttpExceptionFilter,
//         // },
//     ],
// } );
// // export class AppModule {
// // }
