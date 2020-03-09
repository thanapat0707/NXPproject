import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PartlistEntity } from './entity/partlist.entity';
import { PartlistController } from './partlist.controller';
import { PartlistService } from './partlist.service';
import { PartlistDetailEntity } from './entity/partlist-detail.entity';
import { PartlistDetailService } from './partlist-detail.service';
import { PartlistDetailController } from './partlist-detail.controller';

@Module( {
    imports: [
        DatabaseModule,
    ],
    controllers: [
        PartlistController,
        PartlistDetailController,
    ],
    providers: [
        PartlistService,
        PartlistDetailService,
        {
            provide: 'PartlistRepository',
            useValue: PartlistEntity,
        },
        {
            provide: 'PartlistDetailRepository',
            useValue: PartlistDetailEntity,
        },
    ],
} )

export class PartlistModule {
}
