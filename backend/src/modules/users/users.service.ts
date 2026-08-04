import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../database/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser =
      await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

    if (existingUser) {
      throw new ConflictException(
        'Email already exists.',
      );
    }

    const passwordHash =
      await bcrypt.hash(
        createUserDto.password,
        12,
      );

    return this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        phone: createUserDto.phone,
        passwordHash,
      },
    });
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
    const user =
      await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

    if (!user || user.deletedAt) {
      throw new NotFoundException(
        'User not found.',
      );
    }

    return user;
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  /**
   * Loads every permission belonging to
   * the user's current role.
   *
   * Beta Architecture:
   *
   * User.role
   *      ↓
   * Role
   *      ↓
   * RolePermission
   *      ↓
   * Permission
   */
  async getUserPermissions(
    userId: string,
  ): Promise<string[]> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      return [];
    }

    // SUPER_ADMIN bypass
    if (user.role === 'SUPER_ADMIN') {
      const permissions =
        await this.prisma.permission.findMany({
          orderBy: {
            name: 'asc',
          },
        });

      return permissions.map(
        (permission) => permission.name,
      );
    }

    const role =
      await this.prisma.role.findFirst({
        where: {
          name: user.role,
        },
      });

    if (!role) {
      return [];
    }

    const rolePermissions =
      await this.prisma.rolePermission.findMany({
        where: {
          roleId: role.id,
        },
        include: {
          permission: true,
        },
      });

    return rolePermissions.map(
      (rp) => rp.permission.name,
    );
  }
}