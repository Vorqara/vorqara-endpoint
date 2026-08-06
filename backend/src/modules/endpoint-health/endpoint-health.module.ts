import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';

import { EndpointHealthController } from './endpoint-health.controller';
import { EndpointHealthService } from './endpoint-health.service';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    EndpointHealthController,
  ],
  providers: [
    EndpointHealthService,
  ],
  exports: [
    EndpointHealthService,
  ],
})
export class EndpointHealthModule {}