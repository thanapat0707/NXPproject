import { Controller, Get, Response, HttpStatus, Param, Post, Res, Body, Put, Delete } from '@nestjs/common';
import { PartlistService } from './partlist.service';

@Controller( '/api/partlist' )

export class PartlistController {

    constructor( private readonly partlistService: PartlistService ) {
    }

    @Get()
    public async getPartlist( @Response() res ) {
        const partlist = await this.partlistService.findAll();
        return res.status( HttpStatus.OK ).json( partlist );
    }

    @Get( '/:id' )
    public async getPartlistByID( @Response() res, @Param() ID ) {
        const partlist = await this.partlistService.findOne( ID );
        return res.status( HttpStatus.OK ).json( partlist );
    }

    @Get( '/packer/:id' )
    public async getPartlistFromPacker( @Response() res, @Param('id') packerID ) {
        console.log('id: ', packerID);
        const partlistDetail = await this.partlistService.findPartlistWithPacker( packerID );
        return res.status( HttpStatus.OK ).json( partlistDetail );
    }

    @Post()
    async createPartlist( @Res() res, @Body() Partlist ) { // ไม่ได้ใช้ DTO
        const partlist = await this.partlistService.create( Partlist );
        return res.status( HttpStatus.OK ).json( partlist );
    }

    @Delete( '/:id' )
    async deletePartlist( @Res() res, @Param() ID ) { // ไม่ได้ใช้ DTO
        const partlist = await this.partlistService.delete( ID );
        return res.status( HttpStatus.OK ).json( partlist );
    }
}
