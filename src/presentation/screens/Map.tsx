import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Map = () => {
    return(
        <View style={styles.container}>
            <Text>Map Screen</Text>
            <TouchableOpacity><Text>Go To Favourite</Text></TouchableOpacity>
            <TouchableOpacity><Text>Go To Home</Text></TouchableOpacity>
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
export default Map;