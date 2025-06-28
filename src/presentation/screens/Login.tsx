import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import DynamicButton from '../components/DynamicButton';
import DynamicTextInput from '../components/DynamicTextInput';
import Logo from '../../../assets/svgs/Logo';
import { Colors } from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyle';
import { TabParamList } from '../../domain/types/navigation';


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation<NavigationProp<TabParamList>>();

    const handleLogin = async () => {
    };

    const handleForgotPassword = () => {
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    }

    return (
        <SafeAreaView style={GlobalStyles.safeAreaStyles}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={0}
            >
            <View style={GlobalStyles.mainContainer}>
                <View style={[GlobalStyles.container,{marginTop:40}]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{marginBottom:40,alignItems:'center'}}>
                            <Logo height={45} width={237.5}/>
                        </View>
                        <Text style={GlobalStyles.headerText}>Welcome To EvoCart</Text>
                        <Text style={[GlobalStyles.subHeaderText, { opacity: 0.9, marginTop: 10 }]}>Enter your email and password to log in</Text>
                        <View style={GlobalStyles.containerInput}>
                            <Text style={[GlobalStyles.subHeaderText, { opacity: 0.8 }]}>Email</Text>
                            <DynamicTextInput
                                value={email}
                                onChangeText={handleEmailChange}
                                placeholder='Enter your email'
                                autoCapitalize='none'
                            />
                        </View>
                        <View>
                            <Text style={[GlobalStyles.subHeaderText, { opacity: 0.8 }]}>Password</Text>
                            <DynamicTextInput
                                value={password}
                                onChangeText={handlePasswordChange}
                                placeholder='Enter your password'
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={GlobalStyles.rememberForgotContainer}>
                            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={handleForgotPassword}>
                                    <Text style={[GlobalStyles.forgotText, { marginTop: 10 }]}>Forgot password?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <DynamicButton
                            onPress={ handleLogin }
                            text={"Log In"}
                        />
                    </ScrollView>
                </View>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginPage;