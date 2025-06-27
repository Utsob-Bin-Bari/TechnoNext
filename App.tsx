import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/presentation/navigation/TabNavigator'; 
import { enableScreens } from 'react-native-screens';

enableScreens();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor='white'/>
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </>
  );
}


export default App;
