import { Injectable, Inject, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { PartdataLifetimeService } from '../partdata/partdata-lifetime.service';
import { ConvertService } from '../conversion/convert.service';

@Injectable()
// @UseFilters( HttpExceptionFilter )
export class UserService {

    constructor(
        @Inject( 'UserRepository' ) private readonly userRepository: typeof UserEntity,
        private readonly partdataLifetimeService: PartdataLifetimeService,
        private readonly convertService: ConvertService,
    ) {
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.findAll<UserEntity>( {
            order: [ 'user_id' ],
        } );
    }

    async findAllID(): Promise<UserEntity[]> {
        return this.userRepository.findAll<UserEntity>( { attributes: [ 'user_id' ] } );
    }

    async findOne( data: any ): Promise<UserEntity> {
        return this.userRepository.findOne<UserEntity>( { where: { user_id: data.id } } ); // return await
    }

    async create( data: any ): Promise<UserEntity> {
        return this.userRepository.build( data ).save();
    }

    async update( data: any ): Promise<UserEntity> {

        return this.userRepository.update( data, { where: { user_id: data.user_id } } ).then();
    }

    async delete( data: any ) {
        return this.partdataLifetimeService.findWithUserID( data.id ).then( inPartdataLifetime => {
            if ( inPartdataLifetime ) {
                throw new HttpException( { message: 'CANNOT delete User in Partdata-Lifetime'}, HttpStatus.BAD_REQUEST );
                // tslint:disable-next-line:no-console
                // console.log( 'ERROR!!!' );
            } else {
                return this.convertService.findWithUserID( data.id ).then( inConvert => {
                    if ( inConvert ) {
                        throw new HttpException( { message: 'CANNOT delete User in Convert' }, HttpStatus.BAD_REQUEST );
                    } else {
                        this.userRepository.destroy( { where: { user_id: data.id } } ).then();
                    }
                } );
            }
        } );
    }
}
