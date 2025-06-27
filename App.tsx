import React from 'react';
import {View ,Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { enableScreens } from 'react-native-screens';
enableScreens();

function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{}}>
        <Text>Let's go!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
});

export default App;
