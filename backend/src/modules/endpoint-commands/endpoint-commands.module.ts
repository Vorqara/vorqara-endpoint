import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';

import { EndpointCommandsController } from './endpoint-commands.controller';
import { EndpointCommandsService } from './endpoint-commands.service';

@Module({
  imports: [PrismaModule],
  controllers: [EndpointCommandsController],
  providers: [EndpointCommandsService],
  exports: [EndpointCommandsService],
})
export class EndpointCommandsModule {}