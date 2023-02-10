import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';

interface ImageItemProp {
  uri: string;
  size?: number;
  onPress: () => void;
}

const ImageItem: FC<ImageItemProp> = ({uri, onPress, size}) => {
  const styles = makeStyle(size);
  return (
    <TouchableOpacity onPress={onPress} style={styles.TouchableStyle}>
      <Image style={styles.imageStyle} source={{uri}} />
    </TouchableOpacity>
  );
};

export default ImageItem;

const makeStyle = (size?: number) =>
  StyleSheet.create({
    TouchableStyle: {
      flex: 1,
      margin: 1,
      height: size ?? 100,
      minWidth: size ?? 100,
    },
    imageStyle: {
      height: size ?? 100,
    },
  });
