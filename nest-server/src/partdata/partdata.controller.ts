import { Controller, Get, Response, HttpStatus, Put, Body, Param, Post, Res, Delete } from '@nestjs/common';
import { PartdataService } from './partdata.service';

@Controller( '/api/partdata' )

export class PartdataController {

    constructor( private readonly partdataService: PartdataService ) {
    }

    @Get()
    public async getPartdata( @Response() res ) {
        const partdata = await this.partdataService.findAll();
        return res.status( HttpStatus.OK ).json( partdata );
    }

    // @Get('/date')
    // public async date( @Response() res ) {
    //     const partdata = await this.partdataService.date();
    //     return res.status( HttpStatus.OK ).json( partdata );
    // }

    @Get( '/id' )
    public async getPartdataID( @Response() res ) {
        const id = await this.partdataService.findAllID();
        return res.status( HttpStatus.OK ).json( id );
    }

    @Get( '/:id' )
    public async getPartdataByID( @Response() res, @Param() ID ) {
        const partdata = await this.partdataService.findOne( ID );
        return res.status( HttpStatus.OK ).json( partdata );
    }

    @Get( '/partID/:id' )
    public async getPartdataByPartID( @Response() res, @Param('id') ID ) {
        const partdata = await this.partdataService.findWithPartID( ID );
        return res.status( HttpStatus.OK ).json( partdata );
    }

    @Put( '/packer' )
    async updateToPacker( @Res() res, @Body() part ) {
        // tslint:disable-next-line:no-console
        // console.log( 'body: ', part );
        const partdata = await this.partdataService.updateToPacker( part );
        return res.status( HttpStatus.OK ).json( partdata );
    }

    @Put( '/store' )
    async updateToStore( @Res() res, @Body() part ) {
        // tslint:disable-next-line:no-console
        // console.log( 'body: ', part );
        const partdata = await this.partdataService.updateToStore( part );
        return res.status( HttpStatus.OK ).json( partdata );
    }

    @Put('/switch')
    switchPartLocation( @Res() res, @Body() data ) {
        const partdata = this.partdataService.switchPartLocation( data );
        // const partdata = await this.partdataService.update( data );
        return res.status( HttpStatus.OK ).json( partdata );
    }

    @Put()
    async update( @Res() res, @Body() data ) {
        // const partdata = this.partdataService.update( data );
        const partdata = await this.partdataService.update( data );
        return res.status( HttpStatus.OK ).json( partdata );
    }

    @Post()
    async createPartdata( @Res() res, @Body() Partdata ) { // ไม่ได้ใช้ DTO
        // const partdata = this.partdataService.create( Partdata );
        const partdata = await this.partdataService.create( Partdata );
        return res.status( HttpStatus.OK ).json( partdata );
    }

    @Delete( '/:id' )
    async deletePartdata( @Res() res, @Param() ID ) { // ไม่ได้ใช้ DTO
        const partdata = await this.partdataService.delete( ID );
        return res.status( HttpStatus.OK ).json( partdata );
    }
}
