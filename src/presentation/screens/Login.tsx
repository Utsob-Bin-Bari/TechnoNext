import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TabParamList } from '../../domain/types/navigation';

const Login = () => {
    const navigation = useNavigation<NavigationProp<TabParamList>>();
    return(
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Home');
            }}>
                <Text>Go To Home</Text>
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
export default Login;