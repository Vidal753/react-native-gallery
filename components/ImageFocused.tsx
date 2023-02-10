import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {
  TapGestureHandler,
  PinchGestureHandler,
  HandlerStateChangeEvent,
  PinchGestureHandlerGestureEvent,
  TapGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ImageFocusedProp {
  onClose: () => void;
  uri: string;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

const {width, height} = Dimensions.get('window');

const ImageFocused: FC<ImageFocusedProp> = props => {
  const doubleTapRef = useRef<React.ComponentType<TapGestureHandlerProps>>();
  const [editMode, setEditMode] = useState(0);
  const styles = makeStyle();
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const onDoubleTap = (
    event: HandlerStateChangeEvent<Record<string, unknown>>,
  ) => {
    if (scale.value === 1) {
      focalX.value = Number(event.nativeEvent.x);
      focalY.value = Number(event.nativeEvent.y);
      scale.value = withTiming(5, {duration: 400});
    } else {
      scale.value = withTiming(1, {duration: 400});
    }
  };

  const onTap = () => {
    setEditMode(prev => (prev === 0 ? 1 : 0));
  };

  const mode = useDerivedValue(() => {
    return withTiming(editMode);
  }, [editMode]);

  const editModeStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      mode.value,
      [0, 1],
      ['#ffff', '#000'],
    );
    return {backgroundColor};
  });

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        if (event.scale > 0.8 && event.scale < 6.5) {
          scale.value = event.scale;
          focalX.value = event.focalX;
          focalY.value = event.focalY;
        }
      },
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: focalX.value},
      {translateY: focalY.value},
      {translateX: -width / 2},
      {translateY: -height / 2},
      {scale: scale.value},
      {translateX: -focalX.value},
      {translateY: -focalY.value},
      {translateX: width / 2},
      {translateY: height / 2},
    ],
  }));

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={[styles.container, editModeStyle]}>
        <TouchableOpacity onPress={props.onClose} style={styles.touchableStyle}>
          <Text>Close</Text>
        </TouchableOpacity>
        <TapGestureHandler waitFor={doubleTapRef} onActivated={onTap}>
          <TapGestureHandler
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={onDoubleTap}>
            <AnimatedImage
              resizeMode="contain"
              style={[styles.imageStyle, rStyle]}
              source={{uri: props.uri}}
            />
          </TapGestureHandler>
        </TapGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default ImageFocused;

const makeStyle = () =>
  StyleSheet.create({
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
    touchableStyle: {
      position: 'absolute',
      zIndex: 10,
      top: 10,
      left: 10,
      padding: 2,
    },
    focalPoint: {
      ...StyleSheet.absoluteFillObject,
      width: 20,
      height: 20,
      backgroundColor: 'blue',
      borderRadius: 10,
    },
  });
