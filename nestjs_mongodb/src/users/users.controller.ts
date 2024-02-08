import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('getall')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) throw new HttpException('User not found', 404);

    const userFound = await this.userService.getUserById(id);
    if (!userFound) throw new HttpException('User not found', 404);

    return userFound;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) throw new HttpException('Invalid Id', 400);
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User not found', 404);
    return updatedUser;
  }

  @Delete(':id')
  async deleteRemove(@Param('id') id: string) {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) throw new HttpException('Invalid Id', 400);
    const deletedUser = await this.userService.DeleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return;
  }
}
