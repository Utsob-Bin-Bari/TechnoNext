export interface TimeEntity {
  timestamp: number;
  localTime: string;
  formattedTime: string;
  lastUpdated: Date;
}

export interface TimeConfig {
  updateInterval: number; 
  timezone?: string;
  format?: string;
} 