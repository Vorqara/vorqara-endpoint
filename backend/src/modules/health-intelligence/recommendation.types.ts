export interface Finding {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

  title: string;

  description: string;
}

export interface Recommendation {
  priority: number;

  title: string;

  description: string;

  estimatedTime: string;

  businessImpact: string;
}