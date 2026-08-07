import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AgentAuthController } from './agent-auth.controller';
import { AgentAuthService } from './agent-auth.service';
import { AgentJwtStrategy } from './strategies/agent-jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],

  controllers: [
    AgentAuthController,
  ],

  providers: [
    AgentAuthService,
    AgentJwtStrategy,
  ],

  exports: [
    AgentAuthService,
  ],
})
export class AgentAuthModule {}