import { ConversionService } from './conversion.service';
import { PackerService } from './packer.service';
import { PartService } from './part.service';
import { PartdataService } from './partdata.service';
import { PartlistService } from './partlist.service';
import { SotService } from './sot.service';
import { UserService } from './user.service';
import { LocationService } from './location.service';

export const SERVICES = [
    ConversionService,
    PackerService,
    PartService,
    PartdataService,
    PartlistService,
    SotService,
    UserService,
    LocationService,
];
