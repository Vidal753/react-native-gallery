import {StyleSheet, Text, View} from 'react-native';
// import type {PropsWithChildren} from 'react';
import React from 'react';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

const GalleryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>GalleryScreen</Text>
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});
