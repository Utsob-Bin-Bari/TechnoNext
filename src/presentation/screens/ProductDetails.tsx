import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
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
import Header from '../components/Header';
import GlobalStyles from '../styles/GlobalStyle';

type ProductDetailsRouteProp = RouteProp<TabParamList, 'ProductDetails'>;


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
          style={GlobalStyles.mainImage} 
          resizeMode="cover"
        />
      );
    }

    return (
      <View style={GlobalStyles.productDetailsImageContainer}>
        <Image 
          source={{ uri: product.images[selectedImageIndex] || product.thumbnail }} 
          style={GlobalStyles.mainImage} 
          resizeMode="cover"
        />
        {product.images.length > 1 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={GlobalStyles.thumbnailContainer}
            contentContainerStyle={GlobalStyles.thumbnailContent}
          >
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  GlobalStyles.thumbnailWrapper,
                  selectedImageIndex === index && GlobalStyles.selectedThumbnail
                ]}
              >
                <Image source={{ uri: image }} style={GlobalStyles.thumbnail} />
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
      <View style={GlobalStyles.reviewsSection}>
        <Text style={GlobalStyles.sectionTitle}>Customer Reviews</Text>
        {product.reviews.slice(0, 3).map((review, index) => (
          <View key={index} style={GlobalStyles.reviewCard}>
            <View style={GlobalStyles.reviewHeader}>
              <Text style={GlobalStyles.reviewerName}>{review.reviewerName}</Text>
              <Text style={GlobalStyles.reviewRating}>{'⭐'.repeat(review.rating)}</Text>
            </View>
            <Text style={GlobalStyles.reviewComment}>{review.comment}</Text>
            <Text style={GlobalStyles.reviewDate}>
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
      <SafeAreaView style={GlobalStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
        <View style={GlobalStyles.errorContainer}>
          <Text style={GlobalStyles.errorDetailsText}>Error loading product details</Text>
          <TouchableOpacity style={GlobalStyles.retryButton} onPress={handleBack}>
            <Text style={GlobalStyles.retryText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading || !product) {
    return (
      <SafeAreaView style={GlobalStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
        <View style={GlobalStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.Orange} />
          <Text style={GlobalStyles.loadingDetailsText}>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      
      {/* Header */}
      <Header 
        type="productDetails"
        onBack={handleBack}
        productTitle={product.title}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />

      <ScrollView style={GlobalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        {renderImageGallery()}

        {/* Product Info */}
        <View style={GlobalStyles.productDetailsInfo}>
          <Text style={GlobalStyles.productDetailsTitle}>{product.title}</Text>
          <Text style={GlobalStyles.productDetailsBrand}>{product.brand}</Text>
          
          {/* Pricing */}
          <View style={GlobalStyles.pricingContainer}>
            <Text style={GlobalStyles.productDetailsPrice}>${product.price}</Text>
            <Text style={GlobalStyles.productDetailsDiscount}>{product.discountPercentage}% off</Text>
          </View>

          {/* Rating and Stock */}
          <View style={GlobalStyles.metaContainer}>
            <Text style={GlobalStyles.productDetailsRating}>⭐ {product.rating} rating</Text>
            <Text style={GlobalStyles.productDetailsStock}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Text>
          </View>

          {/* Description */}
          <View style={GlobalStyles.descriptionSection}>
            <Text style={GlobalStyles.sectionTitle}>Description</Text>
            <Text style={GlobalStyles.description}>{product.description}</Text>
          </View>

          {/* Product Details */}
          <View style={GlobalStyles.detailsSection}>
            <Text style={GlobalStyles.sectionTitle}>Product Details</Text>
            
            {product.category && (
              <View style={GlobalStyles.detailRow}>
                <Text style={GlobalStyles.detailLabel}>Category:</Text>
                <Text style={GlobalStyles.detailValue}>{product.category}</Text>
              </View>
            )}
            
            {product.sku && (
              <View style={GlobalStyles.detailRow}>
                <Text style={GlobalStyles.detailLabel}>SKU:</Text>
                <Text style={GlobalStyles.detailValue}>{product.sku}</Text>
              </View>
            )}
            
            {product.weight && (
              <View style={GlobalStyles.detailRow}>
                <Text style={GlobalStyles.detailLabel}>Weight:</Text>
                <Text style={GlobalStyles.detailValue}>{product.weight} kg</Text>
              </View>
            )}
            
            {product.availabilityStatus && (
              <View style={GlobalStyles.detailRow}>
                <Text style={GlobalStyles.detailLabel}>Availability:</Text>
                <Text style={GlobalStyles.detailValue}>{product.availabilityStatus}</Text>
              </View>
            )}
            
            {product.warrantyInformation && (
              <View style={GlobalStyles.detailRow}>
                <Text style={GlobalStyles.detailLabel}>Warranty:</Text>
                <Text style={GlobalStyles.detailValue}>{product.warrantyInformation}</Text>
              </View>
            )}
            
            {product.returnPolicy && (
              <View style={GlobalStyles.detailRow}>
                <Text style={GlobalStyles.detailLabel}>Return Policy:</Text>
                <Text style={GlobalStyles.detailValue}>{product.returnPolicy}</Text>
              </View>
            )}
          </View>

          {/* Reviews */}
          {renderReviews()}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={GlobalStyles.bottomActions}>
        <TouchableOpacity 
          style={[GlobalStyles.actionButton, GlobalStyles.addToCartButton]} 
          onPress={handleAddToCart}
        >
          <Text style={GlobalStyles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[GlobalStyles.actionButton, GlobalStyles.buyNowButton]} 
          onPress={handleBuyNow}
        >
          <Text style={GlobalStyles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default ProductDetails;