import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Favourite from '../screens/Favourite';
import ProductDetails from '../screens/ProductDetails';
import Map from '../screens/Map';
import { TabParamList } from '../../domain/types/navigation';
import { RootState } from '../../application/store/store';
import HomeIcon from '../../../assets/svgs/Home';
import MapIcon from '../../../assets/svgs/Map';
import FavouriteIcon from '../../../assets/svgs/Favourite';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator<TabParamList>();

const hideTabBarOptions: BottomTabNavigationOptions = {
  tabBarStyle: { display: 'none' },
  tabBarShowLabel: false,
  tabBarItemStyle: { display: 'none' }
};

const TabNavigator = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth.authentication || {});

  return (
    <Tab.Navigator 
      initialRouteName={isAuthenticated ? "Home" : "Login"}
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
          backgroundColor: "white",
          display: isAuthenticated ? 'flex' : 'none',
        },
        tabBarActiveTintColor: Colors.Orange,
        tabBarInactiveTintColor: Colors.TabIcons,
      }}
    >
      {/* Authenticated screens with tab bar */}
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <HomeIcon color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen 
        name="Favourite" 
        component={Favourite}
                options={{
          tabBarLabel:'Favorite',
          tabBarIcon: ({color, size}) => (
            <FavouriteIcon color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={Map}
        options={{
          tabBarLabel:'Map',
          tabBarIcon: ({color, size}) => (
            <MapIcon color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen 
        name="ProductDetails" 
        component={ProductDetails}
        options={hideTabBarOptions}
      />
      
      {/* Auth screen */}
      <Tab.Screen 
        name="Login" 
        component={Login}
        options={hideTabBarOptions}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
