import { Controller, Get, Response, HttpStatus, Delete, Res, Param, Post, Body } from '@nestjs/common';
import { PartlistDetailService } from './partlist-detail.service';

@Controller( '/api/partlist-detail' )

export class PartlistDetailController {

    constructor( private readonly partlistDetailService: PartlistDetailService ) {
    }

    @Get()
    public async getPart( @Response() res ) {
        const partlistDetail = await this.partlistDetailService.findAll();
        return res.status( HttpStatus.OK ).json( partlistDetail );
    }

    @Post()
    async createPartlist( @Res() res, @Body() PartlistDetail ) { // ไม่ได้ใช้ DTO
        const partlistDetail = await this.partlistDetailService.create( PartlistDetail );
        return res.status( HttpStatus.OK ).json( partlistDetail );
    }

    @Delete( '/:partlistID/:partID' )
    async deletePartlist( @Res() res, @Param() partlistID, @Param() partID ) { // ไม่ได้ใช้ DTO
        const partlist = await this.partlistDetailService.delete( partlistID, partID );
        return res.status( HttpStatus.OK ).json( partlist );
    }
}
