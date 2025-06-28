import React, { useCallback, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  FlatList, 
  RefreshControl, 
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { logOut } from '../../application/store/action';
import { AuthStorage } from '../../application/services/login';
import { RootState, AppDispatch } from '../../application/store/store';
import { TabParamList } from '../../domain/types/navigation';
import { Colors } from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyle';
import { useGetAllProductsQuery, useLazyGetAllProductsQuery } from '../../infrastructure /adapters/productApi';
import { Product } from '../../domain/types/redux';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<TabParamList>>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth.authentication || {});
  
  // RTK Query hooks
  const { data: productsData, error, isLoading, refetch } = useGetAllProductsQuery({ limit: 20 });
  const [triggerRefetch] = useLazyGetAllProductsQuery();

  // Refresh products when screen gains focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

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
            dispatch(logOut());
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
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

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No products available</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorState}>
      <Text style={styles.errorText}>Error loading products</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );

  if (!isAuthenticated) {
    navigation.navigate('Login');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      
      {renderHeader()}
      
      {error ? (
        renderError()
      ) : (
        <FlatList
          data={productsData?.products || []}
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
          ListEmptyComponent={!isLoading ? renderEmptyState : null}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: Colors.Orange,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: Colors.White,
    fontWeight: '600',
    fontSize: 14,
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
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    backgroundColor: '#f5f5f5',
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
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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

export default Home;