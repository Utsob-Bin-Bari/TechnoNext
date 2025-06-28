import React from 'react';
import { View } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';
import {Colors} from '../../src/presentation/constants/Colors';

interface HomeIconProps extends SvgProps {
  size?: number;
  style?: object;
  color?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({
  size = 26,
  style = {},
  color = Colors.TabIcons,
  ...props
}) => {
  return (
    <View style={style}>
      <Svg 
        width={size} 
        height={size} 
        viewBox="0 0 25 26" 
        fill="none"
        accessibilityLabel="Home Icon"
        {...props}
      >
        <Path 
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.50465 1.47678C10.8386 0.564055 12.5962 0.564055 13.9302 1.47678L21.2075 6.45602C22.2751 7.18644 22.9133 8.39658 22.9133 9.69008V19.1144C22.9133 21.2785 21.1589 23.0329 18.9948 23.0329H4.44006C2.27589 23.0329 0.521484 21.2785 0.521484 19.1144V9.69008C0.521484 8.39658 1.15979 7.18644 2.22731 6.45602L9.50465 1.47678ZM8.91843 17.9948C8.60927 17.9948 8.35863 18.2454 8.35863 18.5546C8.35863 18.8637 8.60927 19.1144 8.91843 19.1144H14.5164C14.8255 19.1144 15.0762 18.8637 15.0762 18.5546C15.0762 18.2454 14.8255 17.9948 14.5164 17.9948H8.91843Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default HomeIcon;