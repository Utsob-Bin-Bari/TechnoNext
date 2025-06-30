import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/Colors';
import GlobalStyles from '../styles/GlobalStyle';

interface LoadingFooterProps {
  isVisible: boolean;
  color?: string;
  size?: 'small' | 'large';
}

const LoadingFooter: React.FC<LoadingFooterProps> = ({
  isVisible,
  color = Colors.Orange,
  size = 'small',
}) => {
  if (!isVisible) return null;

  return (
    <View style={GlobalStyles.loadingFooter}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingFooter; 