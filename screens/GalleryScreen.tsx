import {StyleSheet, View, PermissionsAndroid, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ImageItem from '../components/ImageItem';
import ImageFocused from '../components/ImageFocused';
import Header from '../components/Header';
import {ScrollView} from 'react-native-gesture-handler';

type node = {
  type: string;
  group_name: string;
  image: {
    filename: string | null;
    filepath: string | null;
    extension: string | null;
    uri: string;
    height: number;
    width: number;
    fileSize: number | null;
    playableDuration: number;
    orientation: number | null;
  };
  timestamp: number;
  location: {} | null;
};

const GalleryScreen = () => {
  const [nodes, setNodes] = useState<node[]>([]);
  const [nodeSelected, setNodeSelected] = useState('');

  useEffect(() => {
    checkPermission().then(() => getPhotos());
  }, []);

  const checkPermission = async () => {
    const permission =
      Number(Platform.Version) >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission, {
      title: 'Image gallery app permissions',
      message: 'Image gallery needs your permission to access your photos',
      buttonPositive: 'OK',
    });

    return status === 'granted';
  };

  const getPhotos = async () => {
    const photos = await CameraRoll.getPhotos({
      first: 100,
    });

    setNodes(photos.edges.map(edge => edge.node));
  };

  return (
    <View style={styles.container}>
      {nodeSelected ? (
        <ImageFocused onClose={() => setNodeSelected('')} uri={nodeSelected} />
      ) : (
        <View style={{width: '100%', height: '100%'}}>
          <Header title="All Photos" />
          <ScrollView style={styles.scrollStyle}>
            <View style={styles.imageItemContainer}>
              {nodes.map((node, index) => (
                <ImageItem
                  key={index}
                  uri={node.image.uri}
                  size={120}
                  onPress={() => setNodeSelected(node.image.uri)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  scrollStyle: {
    width: '100%',
    height: '100%',
  },
  imageItemContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
