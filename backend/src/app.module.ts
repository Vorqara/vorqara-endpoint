import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './database/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { EndpointsModule } from './modules/endpoints/endpoints.module';
import { AgentAuthModule } from './modules/agent-auth/agent-auth.module';
import { EndpointCommandsModule } from './modules/endpoint-commands/endpoint-commands.module';
import { HealthIntelligenceModule } from './modules/health-intelligence/health-intelligence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,

    AuthModule,

    UsersModule,

    OrganizationsModule,

    PermissionsModule,

    EndpointsModule,

    AgentAuthModule,

    EndpointCommandsModule,

    HealthIntelligenceModule,
  ],

  controllers: [],

  providers: [],
})
export class AppModule {}