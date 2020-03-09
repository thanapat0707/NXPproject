import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import httpStatus = require('http-status');

@Catch( HttpException )
export class HttpExceptionFilter implements ExceptionFilter {
    catch( exception: HttpException, host: ArgumentsHost ) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        if ( status === httpStatus.BAD_REQUEST ) {
            response.status( status ).json( {
                statusCode: status,
                path: request.url,
            } );
        }
        // response.status
        // response.message อะไรปะมานเนี๊ย ลองดู
    }
}
