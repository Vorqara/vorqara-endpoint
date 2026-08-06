import { Module } from '@nestjs/common';

import { HealthIntelligenceController } from './health-intelligence.controller';
import { HealthIntelligenceService } from './health-intelligence.service';

@Module({
  controllers: [HealthIntelligenceController],
  providers: [HealthIntelligenceService],
  exports: [HealthIntelligenceService],
})
export class HealthIntelligenceModule {}