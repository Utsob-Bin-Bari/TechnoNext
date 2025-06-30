import React, { useCallback, useEffect } from 'react';
import { Alert, SafeAreaView, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { logOut, addToFavorites, removeFromFavorites } from '../../application/store/action';
import { AuthStorage } from '../../application/services/login';
import { FavoriteStorage } from '../../application/services/product';
import { RootState, AppDispatch } from '../../application/store/store';
import { TabParamList } from '../../domain/types/navigation';
import { Colors } from '../constants/Colors';
import { useGetAllProductsQuery, useLazyGetAllProductsQuery } from '../../infrastructure/adapters/productApi';
import { Product } from '../../domain/types/redux';
import TimerWidget from '../components/TimerWidget';
import Header from '../components/Header';
import ErrorState from '../components/ErrorState';
import ProductList from '../components/ProductList';
import GlobalStyles from '../styles/GlobalStyle';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<TabParamList>>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth.authentication || {});
  const favoriteIds = useSelector((state: RootState) => state.favorites.favorites?.favoriteIds || []);
  const { data: productsData, error, isLoading, refetch } = useGetAllProductsQuery({ limit: 20 });
  const [triggerRefetch] = useLazyGetAllProductsQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    return () => {
    };
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AuthStorage.clearAuthData();
            await FavoriteStorage.clearFavorites();
            dispatch(logOut());
          },
        },
      ]
    );
  };

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', { productId: product.id, sourceScreen: 'Home' });
  };

  const handleFavoriteToggle = async (productId: number) => {
    const isFavorite = favoriteIds.includes(productId);
    
    if (isFavorite) {
      dispatch(removeFromFavorites({ productId }));
      const updatedFavorites = favoriteIds.filter((id: number) => id !== productId);
      await FavoriteStorage.saveFavorites(updatedFavorites);
    } else {
      dispatch(addToFavorites({ productId }));
      const updatedFavorites = [...favoriteIds, productId];
      await FavoriteStorage.saveFavorites(updatedFavorites);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      <TimerWidget position="bottom-right" showSeconds={true} />
      <Header 
        type="home"
        userName={`${user?.firstName} ${user?.lastName}`}
        onLogout={handleLogout}
      />
      
      {error ? (
        <ErrorState
          message="Error loading products"
          onRetry={handleRefresh}
        />
      ) : (
        <ProductList
          products={productsData?.products || []}
          favoriteIds={favoriteIds}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          onProductPress={handleProductPress}
          onFavoriteToggle={handleFavoriteToggle}
          emptyStateConfig={{
            title: "No products available",
            message: "No products available"
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;