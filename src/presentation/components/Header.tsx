import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import GlobalStyles from '../styles/GlobalStyle';
import DynamicButton from './DynamicButton';
import FavouriteIcon from '../../../assets/svgs/Favourite';

interface HeaderProps {
  type: 'favourite' | 'home' | 'map' | 'productDetails';
  title?: string;
  subtitle?: string;
  userName?: string;
  onLogout?: () => void;
  onBack?: () => void;
  productTitle?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  type,
  title,
  subtitle,
  userName,
  onLogout,
  onBack,
  productTitle,
  isFavorite,
  onFavoriteToggle,
}) => {
  const renderFavouriteHeader = () => (
    <View style={GlobalStyles.header}>
      <Text style={GlobalStyles.headerTitle}>{title}</Text>
      <Text style={GlobalStyles.headerSubtitle}>{subtitle}</Text>
    </View>
  );

  const renderHomeHeader = () => (
    <View style={GlobalStyles.header}>
      <View>
        <Text style={GlobalStyles.headerTitle}>{userName}</Text>
      </View>
      <View style={{width: '30%'}}>
        <DynamicButton 
          text="Logout" 
          onPress={onLogout} 
          backgroundColor={Colors.RedDelete} 
          borderColor={Colors.RedDelete} 
          height={31} 
        />
      </View>
    </View>
  );

  const renderMapHeader = () => (
    <View style={GlobalStyles.header}>
      <Text style={GlobalStyles.headerTitle}>{title}</Text>
      <Text style={GlobalStyles.headerSubtitle}>{subtitle}</Text>
    </View>
  );

  const renderProductDetailsHeader = () => (
    <View style={GlobalStyles.headerProductDetails}>
      <TouchableOpacity onPress={onBack} style={GlobalStyles.backButton}>
        <Text style={GlobalStyles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={GlobalStyles.headerTitleProduct} numberOfLines={1}>{productTitle}</Text>
      <TouchableOpacity style={GlobalStyles.favoriteHeaderButton} onPress={onFavoriteToggle}>
        <FavouriteIcon 
          size={18} 
          color={isFavorite ? '#ef4444' : '#d1d5db'} 
          opacity={1}
        />
      </TouchableOpacity>
    </View>
  );

  switch (type) {
    case 'favourite':
      return renderFavouriteHeader();
    case 'home':
      return renderHomeHeader();
    case 'map':
      return renderMapHeader();
    case 'productDetails':
      return renderProductDetailsHeader();
    default:
      return null;
  }
};

export default Header; 