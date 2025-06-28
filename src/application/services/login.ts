import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../domain/types/redux';

const AUTH_STORAGE_KEY = '@auth_data';
const FAVORITES_STORAGE_KEY = '@favorites_data';

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

export const FavoriteStorage = {
  async saveFavorites(favoriteIds: number[]): Promise<void> {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },

  async getFavorites(): Promise<number[]> {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async clearFavorites(): Promise<void> {
    try {
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  },
};
