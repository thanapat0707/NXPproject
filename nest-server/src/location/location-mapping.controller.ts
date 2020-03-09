import { Controller, Get, Response, HttpStatus, Post, Res, Body, Param, Delete } from '@nestjs/common';
import { LocationMappingService } from './location-mapping.service';

@Controller( '/api/location-mapping' )

export class LocationMappingController {

    constructor( private readonly locationMappingService: LocationMappingService ) {
    }

    @Get()
    public async getLocationMapping( @Response() res ) {
        const mapping = await this.locationMappingService.findAll();
        return res.status( HttpStatus.OK ).json( mapping );
    }

    @Post()
    async createLocationMapping( @Res() res, @Body() Convert ) { // ไม่ได้ใช้ DTO
        // tslint:disable-next-line:no-console
        console.log('body: ', Convert);
        const mapping = await this.locationMappingService.createMapping( Convert );
        return res.status( HttpStatus.OK ).json( mapping );
    }

    @Delete( '/location/:id/packer/:packer' )
    async deleteLocationMapping( @Res() res, @Param('id') Location, @Param('packer') Part ) { // ไม่ได้ใช้ DTO
        const mapping = await this.locationMappingService.deleteMapping( Location, Part );
        return res.status( HttpStatus.OK ).json( mapping );
    }
}
