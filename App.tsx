import React from 'react';
import {StatusBar, View, useColorScheme} from 'react-native';
import GalleryScreen from './screens/GalleryScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={{backgroundColor: '#ffff'}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'#fff'}
      />
      <GalleryScreen />
    </View>
  );
}

export default App;
