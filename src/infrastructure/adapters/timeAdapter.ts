import { format, formatDistanceToNow } from 'date-fns';
import { TimeEntity } from '../../domain/entities/time';

export class TimeAdapter {
  static getCurrentTimestamp(): number {
    return Date.now();
  }

  static formatToLocalTime(timestamp: number, formatString: string = 'PPpp'): string {
    return format(new Date(timestamp), formatString);
  }

  static formatToReadableTime(timestamp: number): string {
    return format(new Date(timestamp), 'HH:mm:ss - dd/MM/yyyy');
  }

  static getTimeDistance(timestamp: number): string {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }

  static createTimeEntity(customFormat?: string): TimeEntity {
    const timestamp = this.getCurrentTimestamp();
    const now = new Date(timestamp);
    
    return {
      timestamp,
      localTime: this.formatToLocalTime(timestamp, customFormat),
      formattedTime: this.formatToReadableTime(timestamp),
      lastUpdated: now,
    };
  }

  static formatDisplayTime(timestamp: number): string {
    return format(new Date(timestamp), 'hh:mm:ss a');
  }

  static formatDisplayDate(timestamp: number): string {
    return format(new Date(timestamp), 'MMM dd, yyyy');
  }
} 