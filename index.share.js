import { AppRegistry } from 'react-native';
import { Canvas, RoundedRect } from '@shopify/react-native-skia';

const ShareExtension = () => {
  return (
    <Canvas style={{ flex: 1, width: '100%' }}>
      <RoundedRect x={20} y={20} width={100} height={100} r={8} color="lightblue" />
    </Canvas>
  );
};

AppRegistry.registerComponent('shareExtension', () => ShareExtension);
