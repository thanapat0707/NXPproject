import { Controller, Get, Response, HttpStatus, Param, Post, Res, Body, Put, Delete } from '@nestjs/common';
import { SOTService } from './sot.service';

@Controller( '/api/sot' )

export class SOTController {

    constructor( private readonly sotService: SOTService ) {
    }

    @Get()
    public async getSOT( @Response() res ) {
        const sot = await this.sotService.findAll();
        return res.status( HttpStatus.OK ).json( sot );
    }

    @Get('/id')
    public async getSOTID( @Response() res ) {
        const sot = await this.sotService.findAllID();
        return res.status( HttpStatus.OK ).json( sot );
    }

    @Get( '/:id' )
    public async getSOTByID( @Response() res, @Param() ID ) {
        const sot = await this.sotService.findOne( ID );
        return res.status( HttpStatus.OK ).json( sot );
    }

    @Post()
    async createSOT( @Res() res, @Body() SOT ) { // ไม่ได้ใช้ DTO
        const sot = await this.sotService.create( SOT );
        return res.status( HttpStatus.OK ).json( sot );
    }

    @Put()
    async updateSOT( @Res() res, @Body() SOT ) { // ไม่ได้ใช้ DTO
        const sot = await this.sotService.update( SOT );
        return res.status( HttpStatus.OK ).json( sot );
    }

    @Delete( '/:id' )
    async deleteSOT( @Res() res, @Param() ID ) { // ไม่ได้ใช้ DTO
        const sot = await this.sotService.delete( ID );
        return res.status( HttpStatus.OK ).json( sot );
    }
}
