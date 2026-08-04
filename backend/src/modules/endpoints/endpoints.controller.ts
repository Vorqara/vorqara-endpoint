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

import { EndpointsService } from './endpoints.service';

import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { HeartbeatDto } from './dto/heartbeat.dto';

@ApiTags('Endpoints')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('endpoints')
export class EndpointsController {
  constructor(
    private readonly endpointsService: EndpointsService,
  ) {}

  @Post()
  @Permissions('devices:create')
  @ApiOperation({
    summary: 'Register endpoint',
  })
  register(
    @Body()
    dto: CreateEndpointDto,
  ) {
    return this.endpointsService.register(dto);
  }

  @Get()
  @Permissions('devices:read')
  @ApiOperation({
    summary: 'Get all endpoints',
  })
  findAll() {
    return this.endpointsService.findAll();
  }

  @Get(':id')
  @Permissions('devices:read')
  @ApiOperation({
    summary: 'Get endpoint by ID',
  })
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.endpointsService.findOne(id);
  }

  @Patch(':id')
  @Permissions('devices:update')
  @ApiOperation({
    summary: 'Update endpoint',
  })
  update(
    @Param('id')
    id: string,
    @Body()
    dto: UpdateEndpointDto,
  ) {
    return this.endpointsService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('devices:delete')
  @ApiOperation({
    summary: 'Delete endpoint',
  })
  remove(
    @Param('id')
    id: string,
  ) {
    return this.endpointsService.remove(id);
  }

  @Post(':id/heartbeat')
  @Permissions('devices:update')
  @ApiOperation({
    summary: 'Endpoint heartbeat',
  })
  heartbeat(
    @Param('id')
    id: string,
    @Body()
    dto: HeartbeatDto,
  ) {
    return this.endpointsService.heartbeat(id, dto);
  }

  @Post(':id/isolate')
  @Permissions('endpoint:isolate')
  @ApiOperation({
    summary: 'Isolate endpoint',
  })
  isolate(
    @Param('id')
    id: string,
  ) {
    return this.endpointsService.isolate(id);
  }

  @Post(':id/restore')
  @Permissions('endpoint:restore')
  @ApiOperation({
    summary: 'Restore endpoint',
  })
  restore(
    @Param('id')
    id: string,
  ) {
    return this.endpointsService.restore(id);
  }
}