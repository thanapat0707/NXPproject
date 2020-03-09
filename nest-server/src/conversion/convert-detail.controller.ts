import { Controller, Get, Response, HttpStatus, Post, Res, Body, Param, Delete, Put } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { ConvertDetailService } from './convert-detail.service';

@Controller( '/api/convert-detail' )

export class ConvertDetailController {

    constructor( private readonly convertDetailService: ConvertDetailService ) {
    }

    @Get()
    public async getConvertDetail( @Response() res ) {
        const convert = await this.convertDetailService.findAll();
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Get('/:id')
    public async getConvertDetailByID( @Response() res , @Param() ConvertDetailID) {
        const convert = await this.convertDetailService.findByID(ConvertDetailID);
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Post()
    async createConvertDetail( @Res() res, @Body() Convert ) { // ไม่ได้ใช้ DTO
        // tslint:disable-next-line:no-console
        console.log('body: ', Convert);
        const convert = await this.convertDetailService.createConvert( Convert );
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Put('/change')
    async updateUserConvert( @Res() res, @Body() Convert ) { // ไม่ได้ใช้ DTO
        // console.log('change: ', Convert);
        const convert = await this.convertDetailService.updatePartConvert( Convert );
        return res.status( HttpStatus.OK ).json( convert );
    }

    @Delete( '/convert/:id/partdata/:partdata' )
    async deleteConvertDetail( @Res() res, @Param('id') Convert, @Param('partdata') Partdata ) { // ไม่ได้ใช้ DTO
        const convert = await this.convertDetailService.deleteDetail( Convert, Partdata );
        return res.status( HttpStatus.OK ).json( convert );
    }
}
