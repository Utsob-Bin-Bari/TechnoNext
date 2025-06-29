// Time adapter for handling time-related operations
export const TimeAdapter = {
  getCurrentTime: (): Date => new Date(),
  formatTime: (date: Date): string => date.toISOString(),
  addMinutes: (date: Date, minutes: number): Date => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
  },
}; 