import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Product } from '../../domain/types/redux';
import GlobalStyles from '../styles/GlobalStyle';
import FavouriteIcon from '../../../assets/svgs/Favourite';

interface ProductCardProps {
  item: Product;
  isFavorite: boolean;
  onProductPress: (product: Product) => void;
  onFavoriteToggle: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  isFavorite,
  onProductPress,
  onFavoriteToggle,
}) => {
  return (
    <TouchableOpacity style={GlobalStyles.productCard} onPress={() => onProductPress(item)}>
      <View style={GlobalStyles.imageContainer}>
        <Image source={{ uri: item.thumbnail }} style={GlobalStyles.productImage} />
        <TouchableOpacity 
          style={GlobalStyles.favoriteButton}
          onPress={() => onFavoriteToggle(item.id)}
        >
          <FavouriteIcon 
            size={16} 
            color={isFavorite ? '#ef4444' : '#d1d5db'} 
            opacity={1}
          />
        </TouchableOpacity>
      </View>
      <View style={GlobalStyles.productInfo}>
        <Text style={GlobalStyles.productTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={GlobalStyles.productBrand}>{item.brand}</Text>
        <Text style={GlobalStyles.productDescription} numberOfLines={2}>{item.description}</Text>
        <View style={GlobalStyles.productPricing}>
          <Text style={GlobalStyles.productPrice}>${item.price}</Text>
          <Text style={GlobalStyles.productDiscount}>{item.discountPercentage}% off</Text>
        </View>
        <View style={GlobalStyles.productMeta}>
          <Text style={GlobalStyles.productRating}>⭐ {item.rating}</Text>
          <Text style={GlobalStyles.productStock}>Stock: {item.stock}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard; 