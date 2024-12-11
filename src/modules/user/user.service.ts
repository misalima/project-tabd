import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (user) {
      throw new ConflictException('User already exists');
    }
    return this.prisma.user.create({ 
        data: {
            username: data.username,
            email: data.email,
        } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findReadBooks(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
        include: { readBooks: {
          select: {
            title: true,
          }
        }
      }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
