import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from '../user/entity/user.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()

export class ImageService {
    private date = require( 'date-and-time' );
    private imagePath = '../upload-image';
    private imageUrl = 'upload';

    // constructor() { }

    async create( image ) {
        // console.log('dirname: ', path.join(__dirname, '../'));
        let extension = '.png';
        if ( image.originalname.indexOf( '.' ) !== -1 ) {
            extension = image.originalname.substring( image.originalname.lastIndexOf( '.' ), image.originalname.length );
        }

        // const changedFileName = this.hash.generateMd5ByBuffer( imageBuf.buffer ) + extension;
        const now = new Date();
        const fileName = this.date.format( now, 'YYYYMMDD-HHmmss' ).toString() + extension;

        const fullPath = path.join( this.imagePath, fileName );

        fs.writeFileSync( fullPath, image.buffer );

        const data = {
            filename: fileName,
            url: `${this.imageUrl}/${fileName}`,
        };
        // console.log( 'data: ', data );
        return data;
    }
}
