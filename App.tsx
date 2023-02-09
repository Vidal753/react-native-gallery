/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import GalleryScreen from './screens/GalleryScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{backgroundColor: '#ffff'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GalleryScreen />
    </SafeAreaView>
  );
}

export default App;
