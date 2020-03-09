import { Controller, Get, Response, HttpStatus, Post, Res, Body, Put, Delete, Param, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller( '/api/user' )

export class UserController {

    constructor( private readonly userService: UserService ) {
    }

    @Get()
    public async getPart( @Response() res ) {
        const user = await this.userService.findAll();
        return res.status( HttpStatus.OK ).json( user );
    }

    @Get( '/id' ) // ต้องเอาขึ้นก่อน
    public async getUserID( @Response() res ) {
        const id = await this.userService.findAllID();
        return res.status( HttpStatus.OK ).json( id );
    }

    @Get( '/:id' ) // ต้องเขาไว้ข้างหลังเสมอ
    public async getUserByID( @Response() res, @Param() ID ) {
        const user = await this.userService.findOne( ID );
        return res.status( HttpStatus.OK ).json( user );
    }

    @Post()
    async createUser( @Res() res, @Body() User ) { // ไม่ได้ใช้ DTO
        const user = await this.userService.create( User );
        return res.status( HttpStatus.OK ).json( user );
    }

    @Put()
    async updateUser( @Res() res, @Body() User ) { // ไม่ได้ใช้ DTO
        const user = await this.userService.update( User );
        return res.status( HttpStatus.OK ).json( user );
    }

    @Delete( '/:id' )
    async deleteUser( @Res() res, @Param() ID ) { // ไม่ได้ใช้ DTO
        const user = await this.userService.delete( ID );
        return res.status( HttpStatus.OK ).json( user );
    }
}
