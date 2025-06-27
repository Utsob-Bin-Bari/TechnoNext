import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Favourite from '../screens/Favourite';
import ProductDetails from '../screens/ProductDetails';
import Map from '../screens/Map';
import { TabParamList } from '../../domain/types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const hideTabBarOptions: BottomTabNavigationOptions = {
  tabBarStyle: { display: 'none' },
  tabBarShowLabel: false,
  tabBarItemStyle: { display: 'none' }
};

const TabNavigator = () => {
  return (
    <Tab.Navigator 
      initialRouteName="Login" 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
          backgroundColor: "white",
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'orange',
      }}
    >
      {/* Screens with tab bar */}
      <Tab.Screen 
        name="Home" 
        component={Home}
      />
      <Tab.Screen 
        name="Map" 
        component={Map}
      />
      <Tab.Screen 
        name="Favourite" 
        component={Favourite}
      />
      
      {/* Screens without tab bar */}
      <Tab.Screen 
        name="Login" 
        component={Login}
        options={hideTabBarOptions}
      />
      <Tab.Screen 
        name="ProductDetails" 
        component={ProductDetails}
        options={hideTabBarOptions}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
