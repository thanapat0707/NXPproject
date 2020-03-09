import { Injectable } from '@nestjs/common';
import { ConvertDetailService } from './conversion/convert-detail.service';
import { PartdataLifetimeService } from './partdata/partdata-lifetime.service';

@Injectable()

export class AppService {

    constructor(
        private readonly partdataLifetimeService: PartdataLifetimeService,
    ) {}
}
