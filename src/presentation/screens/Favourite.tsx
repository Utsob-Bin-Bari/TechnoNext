import React, { useCallback } from 'react';
import { SafeAreaView, StatusBar} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { removeFromFavorites, addToFavorites } from '../../application/store/action';
import { FavoriteStorage } from '../../application/services/product';
import { RootState, AppDispatch } from '../../application/store/store';
import { TabParamList } from '../../domain/types/navigation';
import { Colors } from '../constants/Colors';
import { useGetAllProductsQuery } from '../../infrastructure/adapters/productApi';
import { Product } from '../../domain/types/redux';
import FavouriteIcon from '../../../assets/svgs/Favourite';
import Header from '../components/Header';
import ErrorState from '../components/ErrorState';
import ProductList from '../components/ProductList';
import GlobalStyles from '../styles/GlobalStyle';

const Favourite: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<TabParamList>>();
  const favoriteIds = useSelector((state: RootState) => state.favorites.favorites?.favoriteIds || []);
  
  const { data: productsData, error, isLoading, refetch } = useGetAllProductsQuery({ limit: 50 });

  const favoriteProducts = productsData?.products?.filter(product => favoriteIds.includes(product.id)) || [];

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', { productId: product.id, sourceScreen: 'Favourite' });
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

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      
      <Header 
        type="favourite"
        title="My Favorites"
        subtitle={`${favoriteProducts.length} ${favoriteProducts.length === 1 ? 'item' : 'items'}`}
      />
      
      {error ? (
        <ErrorState
          message="Error loading favorites"
          onRetry={handleRefresh}
        />
      ) : (
        <ProductList
          products={favoriteProducts}
          favoriteIds={favoriteIds}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          onProductPress={handleProductPress}
          onFavoriteToggle={handleFavoriteToggle}
          emptyStateConfig={{
            icon: <FavouriteIcon size={64} color="#d1d5db" opacity={1} />,
            title: "No favorites yet",
            message: "Start adding products to your favorites to see them here",
            buttonText: "Browse Products",
            onButtonPress: () => navigation.navigate('Home')
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Favourite;