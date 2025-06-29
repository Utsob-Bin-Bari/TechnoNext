import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../domain/types/redux';

const AUTH_STORAGE_KEY = '@auth_data';

export interface StorageAuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const AuthStorage = {
  async saveAuthData(data: StorageAuthData): Promise<void> {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  },

  async getAuthData(): Promise<StorageAuthData | null> {
    try {
      const data = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting auth data:', error);
      return null;
    }
  },

  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },
};


