import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';

interface ImageFocusedProp {
  onClose: () => void;
  uri: string;
}

const ImageFocused: FC<ImageFocusedProp> = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onClose} style={styles.TouchableStyle}>
        <Text>Close</Text>
      </TouchableOpacity>
      <Image
        resizeMode="contain"
        style={styles.imageStyle}
        source={{uri: props.uri}}
      />
    </View>
  );
};

export default ImageFocused;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    flex: 1,
  },
  TouchableStyle: {
    position: 'absolute',
    zIndex: 10,
    top: 10,
    left: 10,
    padding: 2,
  },
});
