import React from 'react';
import Svg, { Path } from 'react-native-svg';

type PlusIconProps = {
  color?: string;
  strokeWidth?: number;
};

export const PlusIcon = (props: PlusIconProps) => {
  const { color = '#000', strokeWidth = 2 } = props;

  return (
    <Svg
      style={{ width: '100%', height: '100%' }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M6 12H18M12 6V18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
