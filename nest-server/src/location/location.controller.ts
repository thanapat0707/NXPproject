import { Controller, Get, Response, HttpStatus, Post, Res, Body, Put, Delete, Param } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller( '/api/location' )

export class LocationController {

    constructor( private readonly locationService: LocationService ) {
    }

    @Get()
    public async getLocation( @Response() res ) {
        const location = await this.locationService.findAll();
        return res.status( HttpStatus.OK ).json( location );
    }

    @Get('/locationAll')
    public async getLocationAllID( @Response() res ) {
        const location = await this.locationService.findAllLocationID();
        return res.status( HttpStatus.OK ).json( location );
    }

    @Get('/locationID')
    public async getLocationID( @Response() res ) {
        const location = await this.locationService.findLocationID();
        return res.status( HttpStatus.OK ).json( location );
    }

    @Get('/rackID')
    public async getRackID( @Response() res ) {
        const rack = await this.locationService.findAllRackID();
        return res.status( HttpStatus.OK ).json( rack );
    }

    @Get( '/empty' )
    public async getEmptyLocation( @Response() res ) {
        const location = await this.locationService.findEmpty();
        return res.status( HttpStatus.OK ).json( location );
    }

    @Get( '/rack' )
    public async getRackLocation( @Response() res ) {
        const location = await this.locationService.findRack();
        return res.status( HttpStatus.OK ).json( location );
    }

    @Get( '/cell' )
    public async getCellLocation( @Response() res ) {
        const location = await this.locationService.findCell();
        return res.status( HttpStatus.OK ).json( location );
    }

    @Post()
    async createLocation( @Res() res, @Body() Location ) { // ไม่ได้ใช้ DTO
        // tslint:disable-next-line:no-console
        console.log( 'body: ', Location );
        const location = await this.locationService.createLocation( Location );
        return res.status( HttpStatus.OK ).json( location );
    }

    @Post( '/rack' )
    async createRack( @Res() res, @Body() Rack ) { // ไม่ได้ใช้ DTO
        // tslint:disable-next-line:no-console
        console.log( 'body: ', Rack );
        const rack = await this.locationService.createRack( Rack );
        return res.status( HttpStatus.OK ).json( rack );
    }

    @Put( )
    async update( @Res() res, @Body() Location ) {
        const location = await this.locationService.update( Location );
        return res.status( HttpStatus.OK ).json( location );
    }

    @Put( '/cell' )
    async updateCell( @Res() res, @Body() Location ) {
        const location = await this.locationService.updateCell( Location );
        return res.status( HttpStatus.OK ).json( location );
    }

    @Delete( '/:id' )
    async deleteSOT( @Res() res, @Param() ID ) { // ไม่ได้ใช้ DTO
        const location = await this.locationService.delete( ID );
        return res.status( HttpStatus.OK ).json( location );
    }
}
