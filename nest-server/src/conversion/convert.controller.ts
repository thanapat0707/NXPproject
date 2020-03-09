import { Controller, Get, Response, HttpStatus, Post, Res, Body, Delete, Param, Put } from '@nestjs/common';
import { ConvertService } from './convert.service';

@Controller( '/api/convert' )

export class ConvertController {

    constructor( private readonly convertService: ConvertService ) {
    }

    @Get()
    public async get( @Response() res ) {
        const convert = await this.convertService.findAll( 'true');
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Get('/convert/:working')
    public async getConvert( @Response() res, @Param('working') Working ) {
        const convert = await this.convertService.findAll( Working);
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Get( '/id' )
    public async getConvertID( @Response() res ) {
        const convert = await this.convertService.findAllID();
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Get( '/packer/:packerID/status/:status' )
    public async getConvertFromPacker( @Response() res, @Param('packerID') Packer, @Param('status') Status ) {
        // console.log('packer: ', Packer);
        const convert = await this.convertService.findConvert( Packer, Status );
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Post()
    async createConvert( @Res() res, @Body() Convert ) { // ไม่ได้ใช้ DTO
        const convert = await this.convertService.create( Convert );
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Put('/working/:id')
    async updateConvert( @Res() res, @Param() ID ) { // ไม่ได้ใช้ DTO
        const convert = await this.convertService.update( ID );
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Put('/user')
    async updateUserConvert( @Res() res, @Body() User ) { // ไม่ได้ใช้ DTO
        // console.log('updateUser Work!!!');
        console.log('user: ', User);
        const convert = await this.convertService.updateUserConvert( User );
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Delete( '/:id' )
    async deleteConvert( @Res() res, @Param() ID ) { // ไม่ได้ใช้ DTO
        const convert = await this.convertService.delete( ID );
        return res.status( HttpStatus.OK ).json( convert );
    }
}
