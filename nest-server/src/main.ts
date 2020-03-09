import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser'; // Add เพิ่มจากของเดิม
import * as cors from 'cors'; // Add เพิ่มจากของเดิม

import * as express from 'express';
import * as path from 'path';
import { AngularRoute } from './angular.route';
// import { sendEmail } from './send.email';

export async function bootstrap() {
    const app = await NestFactory.create( AppModule );
    app.use( '/upload', express.static( path.join( __dirname, '../../upload-image' ) ) );

    app.useGlobalFilters( new AngularRoute() );
    const indexPath = path.join( __dirname, '../..', `/dist/ckm` );
    app.use( express.static( indexPath ) );

    app.use( cors() ); // Add เพิ่มจากของเดิม
    app.use( bodyParser.json() ); // Add เพิ่มจากของเดิม

    // await sendEmail();

    return await app.listen( 3000 );
}

bootstrap();
