import { Controller, Get, Response, HttpStatus, Put, Param, Body, Post, Res } from '@nestjs/common';
import { PartdataService } from './partdata.service';
import { PartdataLifetimeService } from './partdata-lifetime.service';

@Controller( '/api/partdata-lifetime' )

export class PartdataLifetimeController {

    constructor( private readonly partdataLifetimeService: PartdataLifetimeService ) {
    }

    @Get()
    public async getPartdataLifetime( @Response() res ) {
        const partdataLifetime = await this.partdataLifetimeService.findAll();
        return res.status( HttpStatus.OK ).json( partdataLifetime );
    }

    // @Get('/count-time')
    // public async Lifetime( @Response() res ) {
    //     const Lifetime = await this.partdataLifetimeService.count_time();
    //     return res.status( HttpStatus.OK ).json( Lifetime );
    // }

    @Get('/PM')
    public async findAlertPart( @Response() res ) {
        const partdataLifetime = await this.partdataLifetimeService.findAlertPart();
        return res.status( HttpStatus.OK ).json( partdataLifetime );
    }

    @Get('/start-counter')
    public async StartCounter( @Response() res ) {
        const Counter = await this.partdataLifetimeService.start_counter();
        return res.status( HttpStatus.OK ).json( Counter );
    }

    @Get('/stop-counter')
    public async StopCounter( @Response() res ) {
        const Counter = await this.partdataLifetimeService.stop_counter();
        return res.status( HttpStatus.OK ).json( Counter );
    }

    @Post()
    createPartdataLifetime( @Res() res, @Body() Partdata ) {
        const partdata = this.partdataLifetimeService.create( Partdata );
        return res.status( HttpStatus.OK ).json( partdata );
    }

    @Put('/PM')
    public async PM( @Response() res , @Body() pm) {
        // tslint:disable-next-line:no-console
        // console.log('body: ', pm);
        const partdata = await this.partdataLifetimeService.PM(pm);
        return res.status( HttpStatus.OK ).json( partdata );
    }
}
