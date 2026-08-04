import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';

import { PermissionsService } from './permissions.service';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
  ) {}

  @Post()
  @Permissions('permissions:create')
  @ApiOperation({
    summary: 'Create a permission',
  })
  create(
    @Body()
    dto: CreatePermissionDto,
  ) {
    return this.permissionsService.create(dto);
  }

  @Get()
  @Permissions('permissions:read')
  @ApiOperation({
    summary: 'Get all permissions',
  })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @Permissions('permissions:read')
  @ApiOperation({
    summary: 'Get permission by ID',
  })
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @Permissions('permissions:update')
  @ApiOperation({
    summary: 'Update permission',
  })
  update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  @Permissions('permissions:delete')
  @ApiOperation({
    summary: 'Delete permission',
  })
  remove(
    @Param('id')
    id: string,
  ) {
    return this.permissionsService.remove(id);
  }
}