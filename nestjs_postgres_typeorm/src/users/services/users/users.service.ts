import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreatePostDto } from 'src/users/dto/userPost.dto';
import { CreateUserProfileDto } from 'src/users/dto/userProfile.dto';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRespository: Repository<User>,
    @InjectRepository(Profile) private profileRespository: Repository<Profile>,
    @InjectRepository(Post) private postRespository: Repository<Post>,
  ) {}

  findUser() {
    return this.userRespository.find({ relations: ['profile', 'posts'] });
  }

  async getUser(username: string, password: string) {
    const user = await this.userRespository.findOneBy({ username, password });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) throw new HttpException('Password not match', 401);
    return user;
  }

  async createUser(userDetails: CreateUserDto) {
    const createdUser = this.userRespository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRespository.save(createdUser);
  }

  updateUser(id: number, updateUserDetails: CreateUserDto) {
    return this.userRespository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRespository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileDto,
  ) {
    const user = await this.userRespository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    }
    const profileCreated = this.profileRespository.create(
      createUserProfileDetails,
    );
    const savedProfile = await this.profileRespository.save(profileCreated);
    user.profile = savedProfile;
    return this.userRespository.save(user);
  }

  async createUserPost(id: number, createPostDetails: CreatePostDto) {
    const user = await this.userRespository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPost = this.postRespository.create({ ...createPostDetails, user });
    return this.postRespository.save(newPost);
  }
}
