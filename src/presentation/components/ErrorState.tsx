import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyle';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  retryText?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  retryText = 'Try Again',
}) => {
  return (
    <View style={GlobalStyles.errorState}>
      <Text style={GlobalStyles.errorText}>{message}</Text>
      <TouchableOpacity style={GlobalStyles.retryButton} onPress={onRetry}>
        <Text style={GlobalStyles.retryText}>{retryText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorState; 