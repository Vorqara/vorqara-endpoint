import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../database/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists.');
    }

    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      12,
    );

    const user = await this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        phone: createUserDto.phone,
        passwordHash,
      },
    });

    this.logger.log(`User created: ${user.email}`);

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user || user.deletedAt) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {
    await this.findOne(id);

    if (updateUserDto.email) {
      const existing = await this.prisma.user.findFirst({
        where: {
          email: updateUserDto.email,
          NOT: {
            id,
          },
        },
      });

      if (existing) {
        throw new ConflictException(
          'Email already exists.',
        );
      }
    }

    let passwordHash: string | undefined;

    if (updateUserDto.password) {
      passwordHash = await bcrypt.hash(
        updateUserDto.password,
        12,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        email: updateUserDto.email,
        phone: updateUserDto.phone,
        ...(passwordHash && { passwordHash }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}