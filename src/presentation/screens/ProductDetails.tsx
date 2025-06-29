import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar, 
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { TabParamList } from '../../domain/types/navigation';
import { Colors } from '../constants/Colors';
import { useGetProductByIdQuery } from '../../infrastructure/adapters/productApi';
import { RootState, AppDispatch } from '../../application/store/store';
import { addToFavorites, removeFromFavorites } from '../../application/store/action';
import { FavoriteStorage } from '../../application/services/product';
import FavouriteIcon from '../../../assets/svgs/Favourite';

type ProductDetailsRouteProp = RouteProp<TabParamList, 'ProductDetails'>;

const { width } = Dimensions.get('window');

const ProductDetails: React.FC = () => {
  const navigation = useNavigation<NavigationProp<TabParamList>>();
  const route = useRoute<ProductDetailsRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { productId, sourceScreen } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth.authentication || {});
  const favoriteIds = useSelector((state: RootState) => state.favorites.favorites?.favoriteIds || []);
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);
  
  const isFavorite = favoriteIds.includes(productId);

  // Handle navigation when authentication state changes
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  const handleBack = () => {
    // Navigate back to the source screen if provided
    if (sourceScreen) {
      navigation.navigate(sourceScreen);
    } else {
      // Fallback to goBack or Home if no source screen is specified
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Home');
      }
    }
  };

  const handleAddToCart = () => {
    Alert.alert('Add to Cart', `${product?.title} added to cart!`);
  };

  const handleBuyNow = () => {
    Alert.alert('Buy Now', `Proceeding to checkout for ${product?.title}`);
  };

  const handleFavoriteToggle = async () => {
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

  const renderImageGallery = () => {
    if (!product?.images || product.images.length === 0) {
      return (
        <Image 
          source={{ uri: product?.thumbnail }} 
          style={styles.mainImage} 
          resizeMode="cover"
        />
      );
    }

    return (
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.images[selectedImageIndex] || product.thumbnail }} 
          style={styles.mainImage} 
          resizeMode="cover"
        />
        {product.images.length > 1 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailContainer}
            contentContainerStyle={styles.thumbnailContent}
          >
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  styles.thumbnailWrapper,
                  selectedImageIndex === index && styles.selectedThumbnail
                ]}
              >
                <Image source={{ uri: image }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  };

  const renderReviews = () => {
    if (!product?.reviews || product.reviews.length === 0) {
      return null;
    }

    return (
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {product.reviews.slice(0, 3).map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{review.reviewerName}</Text>
              <Text style={styles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            <Text style={styles.reviewDate}>
              {new Date(review.date).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading product details</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleBack}>
            <Text style={styles.retryText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.Orange} />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{product.title}</Text>
        <TouchableOpacity style={styles.favoriteHeaderButton} onPress={handleFavoriteToggle}>
          <FavouriteIcon 
            size={18} 
            color={isFavorite ? '#ef4444' : '#d1d5db'} 
            opacity={1}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        {renderImageGallery()}

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productBrand}>{product.brand}</Text>
          
          {/* Pricing */}
          <View style={styles.pricingContainer}>
            <Text style={styles.productPrice}>${product.price}</Text>
            <Text style={styles.productDiscount}>{product.discountPercentage}% off</Text>
          </View>

          {/* Rating and Stock */}
          <View style={styles.metaContainer}>
            <Text style={styles.productRating}>⭐ {product.rating} rating</Text>
            <Text style={styles.productStock}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Product Details */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            
            {product.category && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Category:</Text>
                <Text style={styles.detailValue}>{product.category}</Text>
              </View>
            )}
            
            {product.sku && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>SKU:</Text>
                <Text style={styles.detailValue}>{product.sku}</Text>
              </View>
            )}
            
            {product.weight && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Weight:</Text>
                <Text style={styles.detailValue}>{product.weight} kg</Text>
              </View>
            )}
            
            {product.availabilityStatus && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Availability:</Text>
                <Text style={styles.detailValue}>{product.availabilityStatus}</Text>
              </View>
            )}
            
            {product.warrantyInformation && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Warranty:</Text>
                <Text style={styles.detailValue}>{product.warrantyInformation}</Text>
              </View>
            )}
            
            {product.returnPolicy && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Return Policy:</Text>
                <Text style={styles.detailValue}>{product.returnPolicy}</Text>
              </View>
            )}
          </View>

          {/* Reviews */}
          {renderReviews()}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.addToCartButton]} 
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.buyNowButton]} 
          onPress={handleBuyNow}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:Platform.OS === 'ios' ? 15 : 38,
    paddingBottom:Platform.OS === 'ios' ? 7:7,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    paddingVertical: 5,
  },
  backText: {
    fontSize: 16,
    color: Colors.Orange,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  favoriteHeaderButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#f8f9fa',
  },
  mainImage: {
    width: width,
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  thumbnailContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  thumbnailContent: {
    alignItems: 'center',
  },
  thumbnailWrapper: {
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedThumbnail: {
    borderColor: Colors.Orange,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  productInfo: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    lineHeight: 30,
  },
  productBrand: {
    fontSize: 16,
    color: Colors.Orange,
    fontWeight: '600',
    marginBottom: 15,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 15,
  },
  productDiscount: {
    fontSize: 16,
    color: '#22c55e',
    fontWeight: '600',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  productRating: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  productStock: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  descriptionSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailsSection: {
    marginBottom: 25,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },
  reviewsSection: {
    marginBottom: 100,
  },
  reviewCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    fontSize: 14,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 15 : 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: Colors.White,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: Colors.Orange,
    marginRight: 10,
  },
  buyNowButton: {
    backgroundColor: Colors.Orange,
    marginLeft: 10,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Orange,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.White,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.Orange,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: Colors.White,
    fontWeight: '600',
    fontSize: 16,
  },
  favoriteContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: Colors.White,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  favoriteActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  favoriteActionIconContainer: {
    marginRight: 8,
  },
  favoriteActionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProductDetails;