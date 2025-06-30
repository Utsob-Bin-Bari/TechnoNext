import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Product } from '../../domain/types/redux';
import { Colors } from '../constants/Colors';
import GlobalStyles from '../styles/GlobalStyle';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';
import LoadingFooter from './LoadingFooter';

interface ProductListProps {
  products: Product[];
  favoriteIds: number[];
  isLoading: boolean;
  onRefresh: () => void;
  onProductPress: (product: Product) => void;
  onFavoriteToggle: (productId: number) => void;
  emptyStateConfig: {
    icon?: React.ReactNode;
    title: string;
    message: string;
    buttonText?: string;
    onButtonPress?: () => void;
  };
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  favoriteIds,
  isLoading,
  onRefresh,
  onProductPress,
  onFavoriteToggle,
  emptyStateConfig,
}) => {
  const renderProductItem = ({ item }: { item: Product }) => {
    const isFavorite = favoriteIds.includes(item.id);
    
    return (
      <ProductCard
        item={item}
        isFavorite={isFavorite}
        onProductPress={onProductPress}
        onFavoriteToggle={onFavoriteToggle}
      />
    );
  };

  const renderEmptyComponent = () => {
    if (isLoading) return null;
    
    return (
      <EmptyState
        icon={emptyStateConfig.icon}
        title={emptyStateConfig.title}
        message={emptyStateConfig.message}
        buttonText={emptyStateConfig.buttonText}
        onButtonPress={emptyStateConfig.onButtonPress}
      />
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={GlobalStyles.row}
      contentContainerStyle={GlobalStyles.productsList}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          colors={[Colors.Orange]}
          tintColor={Colors.Orange}
        />
      }
      ListEmptyComponent={renderEmptyComponent}
      ListFooterComponent={<LoadingFooter isVisible={isLoading} />}
    />
  );
};

export default ProductList; 