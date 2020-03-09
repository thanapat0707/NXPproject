import { Controller, Get, Response, HttpStatus, Param, Post, Res, Body, Put, Delete } from '@nestjs/common';
import { PartService } from './part.service';

@Controller( '/api/part' )

export class PartController {

    constructor( private readonly partService: PartService ) {
    }

    @Get()
    public async getPart( @Response() res ) {
        const part = await this.partService.findAll();
        return res.status( HttpStatus.OK ).json( part );
    }

    @Get('/id')
    public async getPartName( @Response() res ) {
        const part = await this.partService.findAllName();
        return res.status( HttpStatus.OK ).json( part );
    }

    @Get( '/:id' )
    public async getPartByID( @Response() res, @Param() ID ) {
        const part = await this.partService.findOne( ID );
        return res.status( HttpStatus.OK ).json( part );
    }

    @Post()
    async createPart( @Res() res, @Body() Part ) { // ไม่ได้ใช้ DTO
        const part = await this.partService.create( Part );
        return res.status( HttpStatus.OK ).json( part );
    }

    @Put()
    async updatePart( @Res() res, @Body() Part ) { // ไม่ได้ใช้ DTO
        const part = await this.partService.update( Part );
        return res.status( HttpStatus.OK ).json( part );
    }

    @Delete( '/:id' )
    async deletePart( @Res() res, @Param() ID ) { // ไม่ได้ใช้ DTO
        const part = await this.partService.delete( ID );
        return res.status( HttpStatus.OK ).json( part );
    }
}
