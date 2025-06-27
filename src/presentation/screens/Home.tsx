import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TabParamList } from '../../domain/types/navigation';

const Home = () => {
    const navigation = useNavigation<NavigationProp<TabParamList>>();
    return(
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={()=>
                navigation.navigate('Favourite')
            }>
                <Text>Go To Favourite</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>
                navigation.navigate('Map')
            }><Text>Go To Map</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Login');
            }}>
                <Text>Back</Text>
            </TouchableOpacity>
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
export default Home;