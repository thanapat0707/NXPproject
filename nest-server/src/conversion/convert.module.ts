import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConvertService } from './convert.service';
import { ConvertEntity } from './entity/convert.entity';
import { ConvertController } from './convert.controller';
import { ConvertDetailService } from './convert-detail.service';
import { ConvertDetailEntity } from './entity/convert-detail.entity';
import { ConvertDetailController } from './convert-detail.controller';

@Module( {
    imports: [
        DatabaseModule,
    ],
    controllers: [ ConvertController, ConvertDetailController ],
    providers: [
        ConvertService,
        ConvertDetailService,
        {
            provide: 'ConvertRepository',
            useValue: ConvertEntity,
        },
        {
            provide: 'ConvertDetailRepository',
            useValue: ConvertDetailEntity,
        },
    ],
} )

export class ConvertModule {
}
