import { Controller, Get, Response, HttpStatus, Post, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller( '/api/counter' )

export class AppController {

    constructor( private readonly appService: AppService ) {
    }
}
