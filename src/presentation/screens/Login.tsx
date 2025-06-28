import React, { useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TabParamList } from '../../domain/types/navigation';
import Logo from '../../../assets/svgs/Logo';
import DynamicButton from '../components/DynamicButton';
import DynamicTextInput from '../components/DynamicTextInput';

const Login = () => {
    const navigation = useNavigation<NavigationProp<TabParamList>>();
    const [email,setEmail] = useState<string>();
    return(
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Logo/>
            <DynamicButton text="Login"/>
            <DynamicTextInput
                value={email}
                onChangeText={setEmail}
                placeholder='Enter your email'
                autoCapitalize='none'
                />
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