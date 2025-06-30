import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyle';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  buttonText,
  onButtonPress,
}) => {
  return (
    <View style={GlobalStyles.emptyState}>
      {icon && (
        <View style={GlobalStyles.emptyStateIconContainer}>
          {icon}
        </View>
      )}
      <Text style={GlobalStyles.emptyStateTitle}>{title}</Text>
      <Text style={GlobalStyles.emptyStateText}>{message}</Text>
      {buttonText && onButtonPress && (
        <TouchableOpacity style={GlobalStyles.browseButton} onPress={onButtonPress}>
          <Text style={GlobalStyles.browseButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState; 