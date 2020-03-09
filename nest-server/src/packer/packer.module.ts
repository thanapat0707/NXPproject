import { Module } from '@nestjs/common';
import { PackerController } from './packer.controller';
import { PackerService } from './packer.service';
import { PackerEntity } from './entity/packer.entity';
import { DatabaseModule } from '../database/database.module';
import { PartlistService } from '../partlist/partlist.service';
import { PartlistEntity } from '../partlist/entity/partlist.entity';
import { ConvertService } from '../conversion/convert.service';
import { ConvertEntity } from '../conversion/entity/convert.entity';
import { PartlistModule } from '../partlist/partlist.module';
import { ConvertModule } from '../conversion/convert.module';
import { PartlistDetailService } from '../partlist/partlist-detail.service';
import { PartlistDetailEntity } from '../partlist/entity/partlist-detail.entity';
import { ConvertDetailService } from '../conversion/convert-detail.service';
import { ConvertDetailEntity } from '../conversion/entity/convert-detail.entity';

@Module( {
    imports: [
        // TypeOrmModule.forFeature( [ PackerEntity ] )
        DatabaseModule,
        PartlistModule,
        ConvertModule,
    ],
    controllers: [ PackerController ],
    providers: [
        PackerService,
        {
            provide: 'PackerRepository',
            useValue: PackerEntity,
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

export class PackerModule {
}
