import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  // Req,
  // Res,
} from '@nestjs/common';
// import { Request, Response } from 'express';
import { CreatePostDto } from 'src/users/dto/userPost.dto';
import { CreateUserProfileDto } from 'src/users/dto/userProfile.dto';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findUser();
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: CreateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.userService.createUserPost(id, createPostDto);
  }
}
