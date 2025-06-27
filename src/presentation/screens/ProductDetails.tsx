import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductDetails = () => {
    return(
        <View style={styles.container}>
            <Text>ProductDetails Screen</Text>
            <TouchableOpacity><Text>Back</Text></TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:15,
    }
})
export default ProductDetails;