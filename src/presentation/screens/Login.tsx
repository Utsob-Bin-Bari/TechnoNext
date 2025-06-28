import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DynamicButton from '../components/DynamicButton';
import DynamicTextInput from '../components/DynamicTextInput';
import Logo from '../../../assets/svgs/Logo';
import { Colors } from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyle';
import { TabParamList } from '../../domain/types/navigation';
import { useLoginMutation } from '../../infrastructure /adapters/authApi';
import { logIn, setLoading } from '../../application/store/action';
import { AuthStorage } from '../../application/services/login';
import { AppDispatch, RootState } from '../../application/store/store';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('emilys');
    const [password, setPassword] = useState<string>('emilyspass');
    const navigation = useNavigation<NavigationProp<TabParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    const [login, { isLoading }] = useLoginMutation();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth.authentication || {});

    // Auto-navigate to Home if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('Home');
        }
    }, [isAuthenticated, navigation]);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        try {
            dispatch(setLoading({ isLoading: true }));
            const result = await login({
                username: email.trim(),
                password: password.trim(),
                expiresInMins: 60,
            }).unwrap();

            const authData = {
                user: {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    gender: result.gender,
                    image: result.image,
                },
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            };

            // Save to local storage
            await AuthStorage.saveAuthData(authData);
            
            // Update Redux state
            dispatch(logIn(authData));
            
            // Navigation will happen automatically via useEffect
        } catch (error: any) {
            dispatch(setLoading({ isLoading: false }));
            Alert.alert(
                'Login Failed', 
                error?.data?.message || 'Invalid credentials. Please try again.'
            );
        }
    };

    const handleForgotPassword = () => {
        Alert.alert('Info', 'Use demo credentials:\nUsername: emilys\nPassword: emilyspass');
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

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
                        <Text style={[GlobalStyles.subHeaderText, { opacity: 0.9, marginTop: 10 }]}>Enter your username and password to log in</Text>
                        <View style={GlobalStyles.containerInput}>
                            <Text style={[GlobalStyles.subHeaderText, { opacity: 0.8 }]}>Username</Text>
                            <DynamicTextInput
                                value={email}
                                onChangeText={handleEmailChange}
                                placeholder='Enter username (demo: emilys)'
                                autoCapitalize='none'
                            />
                        </View>
                        <View>
                            <Text style={[GlobalStyles.subHeaderText, { opacity: 0.8 }]}>Password</Text>
                            <DynamicTextInput
                                value={password}
                                onChangeText={handlePasswordChange}
                                placeholder='Enter password (demo: emilyspass)'
                                autoCapitalize='none'
                                secureTextEntry={false}
                            />
                        </View>
                        <View style={GlobalStyles.rememberForgotContainer}>
                            <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={handleForgotPassword}>
                                    <Text style={[GlobalStyles.forgotText, { marginTop: 10 }]}>Demo credentials?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <DynamicButton
                            onPress={isLoading ? undefined : handleLogin}
                            text={isLoading ? "Logging in..." : "Log In"}
                            opacity={isLoading ? 0.6 : 1}
                        />
                    </ScrollView>
                </View>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginPage;