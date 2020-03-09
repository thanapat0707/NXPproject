import { Controller, Get, Response, HttpStatus, Put, Res, Body, Param, Post, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PackerService } from './packer.service';
import { PackerEntity } from './entity/packer.entity';

@Controller( '/api/packer' )

export class PackerController {

    constructor( private readonly packerService: PackerService ) {
    }

    @Get()
    public async getPacker( @Response() res ) {
        const packer = await this.packerService.findAll();
        return res.status( HttpStatus.OK ).json( packer );
    }

    @Get('/id')
    public async getPackerID( @Response() res ) {
        const packer = await this.packerService.findAllID();
        return res.status( HttpStatus.OK ).json( packer );
    }

    @Get( '/:id' )
    public async getSOTByID( @Response() res, @Param() ID ) {
        const packer = await this.packerService.findOne( ID );
        return res.status( HttpStatus.OK ).json( packer );
    }

    @Post()
    async createSOT( @Res() res, @Body() Packer ) { // ไม่ได้ใช้ DTO
        const packer = await this.packerService.create( Packer );
        return res.status( HttpStatus.OK ).json( packer );
    }

    @Put()
    async updatePacker( @Res() res, @Body() Packer ) {
        const packer = await this.packerService.update( Packer );
        return res.status( HttpStatus.OK ).json( packer );
    }

    @Delete( '/:id' )
    async deleteSOT( @Res() res, @Param() ID ) { // ไม่ได้ใช้ DTO
        const packer = await this.packerService.delete( ID );
        return res.status( HttpStatus.OK ).json( packer );
    }
}
