import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AgentAuthController } from './agent-auth.controller';
import { AgentAuthService } from './agent-auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [AgentAuthController],
  providers: [AgentAuthService],
  exports: [AgentAuthService],
})
export class AgentAuthModule {}