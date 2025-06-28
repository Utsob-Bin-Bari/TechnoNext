import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '../constants/Colors';

interface MyTextInputProps extends TextInputProps {
}

const DynamicTextInput: React.FC<MyTextInputProps> = ({ value, onChangeText, placeholder, style, autoCorrect = false, spellCheck = false, ...props }) => {
    const placeholderColor = 'rgba(17, 24, 39, 0.6)'; 
    
    return (
        <TextInput
            style={[styles.input, style]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            autoCorrect={autoCorrect}
            spellCheck={spellCheck}
            {...props} 
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 56,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.Orange,
        paddingLeft: 16,
        lineHeight: 20,
        fontSize: 14,
        fontWeight: '500',
        color: Colors.Black,
        marginBottom: 10,
    },
});

export default DynamicTextInput;