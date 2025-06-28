import React, { useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  RefreshControl, 
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { removeFromFavorites, addToFavorites } from '../../application/store/action';
import { FavoriteStorage } from '../../application/services/login';
import { RootState, AppDispatch } from '../../application/store/store';
import { TabParamList } from '../../domain/types/navigation';
import { Colors } from '../constants/Colors';
import { useGetAllProductsQuery } from '../../infrastructure /adapters/productApi';
import { Product } from '../../domain/types/redux';

const Favourite: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<TabParamList>>();
  const favoriteIds = useSelector((state: RootState) => state.favorites.favorites?.favoriteIds || []);
  
  // RTK Query hook to get all products
  const { data: productsData, error, isLoading, refetch } = useGetAllProductsQuery({ limit: 50 });

  // Filter products to only show favorites
  const favoriteProducts = productsData?.products?.filter(product => favoriteIds.includes(product.id)) || [];

  // Refresh favorites when screen gains focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', { productId: product.id });
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

  const renderProductItem = ({ item }: { item: Product }) => {
    const isFavorite = favoriteIds.includes(item.id);
    
    return (
      <TouchableOpacity style={styles.productCard} onPress={() => handleProductPress(item)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => handleFavoriteToggle(item.id)}
          >
            <Text style={[styles.favoriteIcon, { color: isFavorite ? '#ef4444' : '#d1d5db' }]}>
              ♥
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.productBrand}>{item.brand}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
          <View style={styles.productPricing}>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Text style={styles.productDiscount}>{item.discountPercentage}% off</Text>
          </View>
          <View style={styles.productMeta}>
            <Text style={styles.productRating}>⭐ {item.rating}</Text>
            <Text style={styles.productStock}>Stock: {item.stock}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Favorites</Text>
      <Text style={styles.headerSubtitle}>
        {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>♥</Text>
      <Text style={styles.emptyStateTitle}>No favorites yet</Text>
      <Text style={styles.emptyStateText}>
        Start adding products to your favorites to see them here
      </Text>
      <TouchableOpacity 
        style={styles.browseButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.browseButtonText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorState}>
      <Text style={styles.errorText}>Error loading favorites</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      
      {renderHeader()}
      
      {error ? (
        renderError()
      ) : favoriteProducts.length === 0 && !isLoading ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favoriteProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              colors={[Colors.Orange]}
              tintColor={Colors.Orange}
            />
          }
          ListFooterComponent={
            isLoading ? (
              <View style={styles.loadingFooter}>
                <ActivityIndicator size="small" color={Colors.Orange} />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  productsList: {
    padding: 15,
    paddingBottom: 100, // Extra padding for tab bar
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  productCard: {
    flex: 1,
    backgroundColor: Colors.White,
    borderRadius: 12,
    marginHorizontal: 5,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    backgroundColor: '#f5f5f5',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  productBrand: {
    fontSize: 12,
    color: Colors.Orange,
    fontWeight: '500',
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 8,
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  productDiscount: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '500',
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productRating: {
    fontSize: 12,
    color: '#666',
  },
  productStock: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 50,
  },
  emptyStateIcon: {
    fontSize: 64,
    color: '#d1d5db',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  browseButton: {
    backgroundColor: Colors.Orange,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: Colors.White,
    fontWeight: '600',
    fontSize: 16,
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.Orange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryText: {
    color: Colors.White,
    fontWeight: '600',
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default Favourite;