import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../../../auth/authenticated.guard';
import { CreatePostDto } from '../../dto/userPost.dto';
import { CreateUserProfileDto } from '../../dto/userProfile.dto';
import { CreateUserDto } from '../../dto/users.dto';
import { UsersService } from '../../services/users/users.service';

@UseGuards(AuthenticatedGuard)
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
