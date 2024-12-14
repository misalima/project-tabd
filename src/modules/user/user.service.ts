import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Model } from 'mongoose';
import { UserDocument } from 'mongodb/schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}
  
  async createUser(data: CreateUserDto) {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec(); 
  }
  
}
