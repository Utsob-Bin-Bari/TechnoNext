import React, { useEffect } from 'react';
import { StatusBar, View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import store, { RootState } from './src/application/store/store';
import { AuthStorage } from './src/application/services/login';
import { FavoriteStorage } from './src/application/services/product';
import { restoreAuth, initializeComplete, restoreFavorites } from './src/application/store/action';
import TabNavigator from './src/presentation/navigation/TabNavigator';
import { Colors } from './src/presentation/constants/Colors';
import { TimeService } from './src/application/services/time';

enableScreens();

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth.authentication || {});

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize both auth and favorites
        const [authData, favoriteIds] = await Promise.all([
          AuthStorage.getAuthData(),
          FavoriteStorage.getFavorites()
        ]);

        if (authData) {
          dispatch(restoreAuth(authData));
        } else {
          dispatch(initializeComplete());
        }

        dispatch(restoreFavorites({ favoriteIds }));

        // Initialize timer service
        const timeService = TimeService.getInstance();
        timeService.startTimer();
      } catch (error) {
        console.error('Error initializing app:', error);
        dispatch(initializeComplete());
        dispatch(restoreFavorites({ favoriteIds: [] }));
      }
    };
    initializeApp();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.White }}>
        <ActivityIndicator size="large" color={Colors.Orange} />
        <Text style={{ marginTop: 10, color: Colors.Orange }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor='white' />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
