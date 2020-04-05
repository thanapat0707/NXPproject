import { ExceptionFilter, ArgumentsHost, HttpException, NotFoundException, Catch } from '@nestjs/common';
import * as path from 'path';

@Catch( NotFoundException )

export class AngularRoute implements ExceptionFilter {
    catch( exception: HttpException, host: ArgumentsHost ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const angularPath = path.join( __dirname, '../..', `/dist/ckm/index.html`);
        // tslint:disable-next-line:no-console
        // console.log('angular path: ', angularPath);
        response.sendFile( path.join( angularPath ));
    }
}
