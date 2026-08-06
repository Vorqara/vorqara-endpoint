import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { HealthIntelligenceService } from './health-intelligence.service';

import { CalculateHealthDto } from './dto/calculate-health.dto';

@Controller('health-intelligence')
export class HealthIntelligenceController {
  constructor(
    private readonly healthService: HealthIntelligenceService,
  ) {}

  @Post('calculate')
  calculate(
    @Body()
    body: CalculateHealthDto,
  ) {
    return this.healthService.calculateHealth(body);
  }
}