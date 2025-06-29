import { TimeEntity, TimeConfig } from '../../domain/entities/time';
import { TimeAdapter } from '../../infrastructure/adapters/timeAdapter';

export class TimeService {
  private static instance: TimeService;
  private timer: NodeJS.Timeout | null = null;
  private callbacks: ((timeEntity: TimeEntity) => void)[] = [];
  private config: TimeConfig;

  private constructor() {
    this.config = {
      updateInterval: 20000,
      format: 'PPpp',
    };
  }


  static getInstance(): TimeService {
    if (!TimeService.instance) {
      TimeService.instance = new TimeService();
    }
    return TimeService.instance;
  }

  startTimer(): void {
    if (this.timer) {
      this.stopTimer();
    }

    this.executeCallback();

    this.timer = setInterval(() => {
      this.executeCallback();
    }, this.config.updateInterval);
  }

  stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  subscribe(callback: (timeEntity: TimeEntity) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  updateConfig(newConfig: Partial<TimeConfig>): void {
    this.config = { ...this.config, ...newConfig };
    if (this.timer) {
      this.stopTimer();
      this.startTimer();
    }
  }

  getCurrentTime(): TimeEntity {
    return TimeAdapter.createTimeEntity(this.config.format);
  }

  private executeCallback(): void {
    const timeEntity = this.getCurrentTime();
    this.callbacks.forEach(callback => {
      try {
        callback(timeEntity);
      } catch (error) {
        console.error('Error in time callback:', error);
      }
    });
  }

  isRunning(): boolean {
    return this.timer !== null;
  }

  getUpdateInterval(): number {
    return this.config.updateInterval;
  }
}
