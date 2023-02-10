import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import GalleryScreen from './screens/GalleryScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{backgroundColor: '#ffff'}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#fff'}
      />
      <GalleryScreen />
    </GestureHandlerRootView>
  );
}

export default App;
