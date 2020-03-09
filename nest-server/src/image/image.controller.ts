import { Controller, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller( '/api/image' )

export class ImageController {

    constructor( private readonly imageService: ImageService ) {
    }
    @UseInterceptors( FileInterceptor( 'file' ) )
    @Post('/create')
    async createUser( @UploadedFile() Image, @Res() res) { // ไม่ได้ใช้ DTO
        // console.log('data controller: ', Image, ' --- ', category);
        const image = await this.imageService.create( Image );
        return res.status( HttpStatus.OK ).json( image );
    }
}
