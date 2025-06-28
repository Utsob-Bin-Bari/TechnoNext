import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MapProps {
  size?: number;
  color?: string;
}

const Map: React.FC<MapProps> = ({ 
  size = 24,
  color = "#111827"
}) => {
  const width = size;
  const height = size;
  return (
    <Svg width={width} height={height} viewBox="0 0 576 512" fill="none">
      <Path 
        d="M288 0C191.6 0 112 80.3 112 176c0 116.7 176 336 176 336s176-219.3 176-336C464 80.3 384.4 0 288 0zm0 256a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" 
        fill={color}
      />
    </Svg>
  );
};

export default Map;
